import "./ProductList.css";
import ProductListItems from "../ProductListItems";
import { useNavigate } from "react-router-dom";

function ProductList({ products }) {
  const nav = useNavigate();

  return (
    <div>
      <ul className="products-list">
        {products.map((product) => (
          <li key={product.id} onClick={() => nav(`items/${product.id}`)}>
            <ProductListItems product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
