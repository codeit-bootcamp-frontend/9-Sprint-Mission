import { useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import { Product } from "@/types/types";

interface ProductsProps {
  initialProducts: Product[] | null;
  total?: number;
}

function Products({ initialProducts, total }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);

  return (
    <div>
      <ul className={styles.products}>
        {products.length > 0 ? (
          products.map((item) => (
            <li key={item.id}>
              <ProductItem item={item} size="small" />
            </li>
          ))
        ) : (
          <li>상품이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default Products;
