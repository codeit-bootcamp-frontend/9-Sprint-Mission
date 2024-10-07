import ProductItem from "./ProductItem";
import styles from "./BestProducts.module.css";
import { Product } from "@/types/types";

interface BestProductsProps {
  bestProducts: Product[];
}

function BestProducts({ bestProducts }: BestProductsProps) {
  if (!bestProducts || bestProducts.length === 0) {
    return <div className={styles.bestProducts}>베스트 상품이 없습니다.</div>;
  }
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
