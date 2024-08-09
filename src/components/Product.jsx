import { useEffect, useState } from 'react';
import { getPandaMarket } from '../api';
import BestProduct from './product/BestProduct';
import AllProduct from './product/AllProduct';

const Product = () => {
  const [order, setOrder] = useState('updatedAt');
  const [items, setItems] = useState([]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleChangeSelect = e => {
    const selectButton = e.target.value;
    selectButton === '최신순' ? setOrder('updatedAt') : setOrder('favoriteCount');
  };

  const fetchPandaMarket = async options => {
    const products = await getPandaMarket(options);
    setItems(products.list);
  };

  useEffect(() => {
    fetchPandaMarket({ order, limit: 0, page: 1 });
  }, [order]);

  return (
    <div className="container">
      {/* 베스트 상품 */}
      <BestProduct items={sortedItems} />

      {/* 전체 상품 */}
      <AllProduct items={items} handleChangeSelect={handleChangeSelect} />
    </div>
  );
};

export default Product;
