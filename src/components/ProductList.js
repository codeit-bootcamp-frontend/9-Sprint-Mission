import "./ProductList.css";
import ProductListItems from "./ProductListItems";

function ProductList({ products, order, className }) {
  const sortedProducts = products.sort((a, b) => b[order] - a[order]);
  return (
    <div>
      <ul className={className}>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <ProductListItems product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
