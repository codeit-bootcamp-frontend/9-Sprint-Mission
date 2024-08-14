import "./TotalProductList.css";
import heartImg from "../assets/ic_heart.png";
import { useEffect, useState } from "react";
import { getProducts } from "../Api";
import { Link } from "react-router-dom";

function TotalProductListItem({ product }) {
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

export function TotalProductList() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");

  async function handleLoad(query) {
    const { list } = await getProducts(query);
    setProducts(list);
  }

  const handleRecentClick = () => {
    setOrder("recent");
    handleLoad({
      order: 'recent',
      pageSize: 10,
    })
  }
  const handleFavoriteClick = () => {
    setOrder("favorite");
    handleLoad({
      order: 'favorite',
      pageSize: 10,
    })
  }

  useEffect(() => {
    handleLoad({
      order: "recent",
      pageSize: 10,
    });
  }, []);

  return (
    <>
      <div className="search-bar">
        <h2>전체 상품</h2>
        <div className="search-form">
          <div className="search-container">
            <button type="button" className="search-icon"></button>
            <input
              className="search-input"
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </div>
          <Link to="/additem" className="item-add-btn">
            상품 등록하기
          </Link>
          <div className="select-container">
            <button className="select-btn order-btn" type="button">
              {order === "recent" ? "최신순" : "좋아요순"}
            </button>
            <div className="order">
              <button
                onClick={handleRecentClick}
                type="button"
                className="order-btn"
              >
                최신순
              </button>
              <button
                onClick={handleFavoriteClick}
                type="button"
                className="order-btn"
              >
                좋아요순
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="product-list total">
        {products.map((product) => (
          <li key={product.id}>
            <TotalProductListItem product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
