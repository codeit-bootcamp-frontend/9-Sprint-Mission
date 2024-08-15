import { Outlet } from 'react-router-dom';
import BestProduct from './components/BestProduct';
import AllProduct from './components/AllProduct';

const Product = () => {
  return (
    <section className="Product">
      <div className="container">
        {/* 베스트 상품 */}
        <BestProduct />

        {/* 전체 상품 */}
        <AllProduct />
        <Outlet />
      </div>
    </section>
  );
};

export default Product;
