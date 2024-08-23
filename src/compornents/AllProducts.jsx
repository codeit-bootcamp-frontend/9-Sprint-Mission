import { useEffect, useState } from "react";
import { getProducts } from "../api.js";
import like from "../svg/like.svg";
import search from "../svg/search.svg";
import "../css/Products.css";
import { Link } from "react-router-dom";

function AllProducts({ pageSize, page, orderBy }) {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("최신순");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let orderByField = orderBy;

        if (sortType === "최신순") {
          orderByField = "recent"; // 최신순에 맞는 필드로 설정
        } else if (sortType === "좋아요순") {
          orderByField = "favorite"; // 좋아요순에 맞는 필드로 설정
        }

        const data = await getProducts(pageSize, page, orderByField);
        setProducts(data.list);
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };

    fetchAllProducts();
  }, [page, pageSize, sortType, orderBy]);

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className="all-products-wrap">
      <div className="productType-wrap">
        <h1 className="productType">전체 상품</h1>
        <form className="search-product">
          <button type="submit">
            <img src={search} alt="Search" />
          </button>
          <input placeholder="검색할 상품을 입력해주세요" />
        </form>
        <Link to="/additem" className="additems">
          상품 등록하기
        </Link>
        <select
          className="select-type"
          value={sortType}
          onChange={handleSortChange}
        >
          <option>최신순</option>
          <option>좋아요순</option>
        </select>
      </div>
      <ul className="products-wrap">
        {products.map((product) => (
          <li key={product.id} className="product">
            <img
              className="product-img"
              src={product.images}
              alt={`${product.name}의 이미지 입니다.`}
            />
            <span className="product-name">{product.name}</span>
            <span className="product-price">
              {product.price.toLocaleString()}원
            </span>
            <span className="product-favorite">
              <img src={like} alt="좋아요 버튼" />
              {product.favoriteCount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
