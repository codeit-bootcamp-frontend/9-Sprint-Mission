import "./ProductList.css";
import ProductListItems from "./ProductListItems";

function ProductList({ products }) {
  return (
    <div>
      <ul className="products-list">
        {products.map((product) => (
          <li key={product.id}>
            <ProductListItems product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
