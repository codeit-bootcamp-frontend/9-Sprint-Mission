import { useEffect, useState } from "react";
import { getProducts } from "../api.js";
import like from "../svg/like.svg";
import search from "../svg/search.svg";
import "../css/Products.css";
import { Link } from "react-router-dom";

function AllProducts({ currentPage, pageSize }) {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("최신순");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts(pageSize, currentPage);
        let sortedProducts = data.list;
        if (sortType === "최신순") {
          // 최신순 정렬
          sortedProducts = sortedProducts.sort((a, b) => b.id - a.id);
        } else if (sortType === "좋아요순") {
          // 좋아요순 정렬
          sortedProducts = sortedProducts.sort(
            (a, b) => b.favoriteCount - a.favoriteCount
          );
        }
        setProducts(sortedProducts);
        // console.log(products);
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };

    fetchAllProducts();
  }, [currentPage, pageSize, sortType]);

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  //금액 단위마다 콤마 찍기 위해 정규식 사용
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
            <span>
              <img className="product-img" src={product.images} />
            </span>
            <span className="product-name">{product.name}</span>
            <span className="product-price">
              {formatPrice(product.price)}원
            </span>
            <span className="product-favorite">
              <img src={like} />
              {product.favoriteCount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
