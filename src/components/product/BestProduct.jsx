import ItemCard from './ItemCard';

const BestProduct = ({ items }) => {
  return (
    <div id="product-best">
      <h2 className="product-tit">베스트 상품</h2>

      <ul className="product-wrap">
        {items.map(item => (
          <ItemCard item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default BestProduct;
