import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const REMOVE_ONE_TO_CART_MUTATION = gql`
  mutation REMOVE_ONE_TO_CART_MUTATION($id: ID!) {
    removeOneToCart(productId: $id) {
      id
      quantity
    }
  }
`;
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.removeOneToCart));
};

const RemoveOneToCart = ({ id, children }) => {
  const [removeOneToCart, { error, loading }] = useMutation(
    REMOVE_ONE_TO_CART_MUTATION,
    {
      variables: { id },
      update,
    }
  );

  return (
    <>
      <button
        onClick={removeOneToCart}
        disabled={loading}
        type='button'
        title='Remove One Item from Cart'>
        {children}
      </button>
      {error ? <p>{error.message} </p> : null}
    </>
  );
};

export default RemoveOneToCart;
