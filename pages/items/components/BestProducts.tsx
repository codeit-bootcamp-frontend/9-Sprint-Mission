import ProductItem from "./ProductItem";
import styles from "./BestProducts.module.css";

function BestProducts({ bestProducts }) {
  return (
    <div className={styles.bestProducts}>
      <h2 className={styles.bestTitle}>베스트 상품</h2>
      <ul className={styles.productList}>
        {bestProducts.map((item) => (
          <li key={item.id}>
            <ProductItem item={item} size="large" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BestProducts;
