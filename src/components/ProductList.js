import "./ProductList.css";
import heartImg from "../assets/ic_heart.png";
import { useEffect } from "react";

function ProductListItem({ product }) {
  const { images, name, description, price, favoriteCount } = product;

  return (
    <>
      <div className="product-item-container">
        <img className="product-img" src={images} alt={name} />
      </div>
      <div className="product-info">
        <div className="description">{description}</div>
        <div className="price">{price}</div>
        <div className="like">
          <img className="like-img" src={heartImg} alt="좋아요" />
          <span className="favorite-count">{favoriteCount}</span>
        </div>
      </div>
    </>
  );
}

export function ProductList({ products, title }) {
  return (
    <ul className={`product-list ${title}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductListItem product={product} />
        </li>
      ))}
    </ul>
  );
}
