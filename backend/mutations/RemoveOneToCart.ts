/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

const removeOneToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });

  const [existingCartItem] = allCartItems;
  // 3. See if the current item is in their cart
  if (existingCartItem) {
    if (existingCartItem.quantity > 1) {
      // 4. if itis, decrease by 1
      return await context.lists.CartItem.updateOne({
        id: existingCartItem.id,
        data: { quantity: existingCartItem.quantity - 1 },
        resolveFields: false,
      });
    }
    // 4. if quantity 0, delete a cart item!
    return await context.lists.CartItem.deleteOne({
      id: existingCartItem.id,
      resolveFields: false,
    });
  }
  throw new Error('This item has been deleted');
};

export default removeOneToCart;
