import { useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

function Products({ initialProducts, total }) {
  const [products, setProducts] = useState(initialProducts);
  return (
    <div>
      <ul className={styles.products}>
        {products.map((item) => (
          <li key={item.id}>
            <ProductItem item={item} size="small" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
