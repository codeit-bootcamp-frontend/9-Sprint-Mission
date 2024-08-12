import BestProduct from './product/BestProduct';
import AllProduct from './product/AllProduct';

const Product = () => {
  return (
    <section className="Product">
      <div className="container">
        {/* 베스트 상품 */}
        <BestProduct />

        {/* 전체 상품 */}
        <AllProduct />
      </div>
    </section>
  );
};

export default Product;
