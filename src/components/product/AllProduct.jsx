import Search from './Search';
import ItemCard from './ItemCard';

const AllProduct = ({ items, handleChangeSelect }) => {
  return (
    <div id="product-all">
      <div className="product-search-wrap">
        <h2 className="product-tit">전체 상품</h2>
        <Search items={items} handleChangeSelect={handleChangeSelect} />
      </div>
      <ul className="product-wrap">
        {items.map(item => (
          <ItemCard item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default AllProduct;
