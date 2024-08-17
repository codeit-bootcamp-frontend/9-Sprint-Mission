import "./BestProductList.css";
import heartImg from "../assets/ic_heart.png";
import { useEffect, useState } from "react";
import { getProducts } from "../Api";

function BestProductListItem({ product }) {
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

export function BestProductList({ title }) {
  const [products, setProducts] = useState([]);

  async function handleLoad(query) {
    const { list } = await getProducts(query);
    setProducts(list);
  }
  useEffect(() => {
    handleLoad({
      order: "favorite",
      pageSize: 4,
      page: 1
    });
  }, []);

  return (
    <ul className='product-list best'>
      {products.map((product) => (
        <li key={product.id}>
          <BestProductListItem product={product} />
        </li>
      ))}
    </ul>
  );
}
