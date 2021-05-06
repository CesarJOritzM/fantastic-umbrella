import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <div className='buttonList'>
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}>
          Edit ✏️
        </Link>
      </div>
      <AddToCart id={product.id}>Add To Cart 🛒</AddToCart>
      <DeleteProduct id={product.id}>Delete</DeleteProduct>
    </ItemStyles>
  );
};
export default Product;
