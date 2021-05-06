import Link from 'next/link';
import { useUser } from '../hooks/useUser';
import { useCart } from '../hooks/useCart';
import SignOut from './SignOut';
import CartCount from './CartCount';
import NavStyles from './styles/NavStyles';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <SignOut />
          <button type='button' onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href='/signin'>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};
export default Nav;
