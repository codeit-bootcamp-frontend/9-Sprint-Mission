import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/utils";
import Pagination from "./Pagination";
import "./AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [inputKeyword, setInputKeyword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  
  // select 태그를 이용한 정렬함수
  const onChangeSelect = (e) => {
    const userSelect = e.target.value;

    if (userSelect === "최신순") {
      setOrder("recent");
    } else {
      setOrder("favorite");
    }
  };

  // 검색 인풋 change 함수
  const onChangeInput = (e) => {
    const userInput = e.target.value;
    setInputKeyword(userInput);
  };

  // 검색 form의 submit 함수
  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(inputKeyword);
  };

  // 페이지 렌더링 시 표출할 제품 목록 가져오는 함수
  useEffect(() => {
    getAllProducts(page, pageSize, order, keyword, setProducts, setLoading, setError, setTotalPage);
  }, [page, pageSize, order, keyword]);

  // 사용환경 확인
  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 사용환경에 따른 pageSize 조절
  useEffect(() => {
    if (width > 375 && width < 767) {
      setMobile(true);
      setPageSize(4);
    } else if (width > 768 && width < 1199) {
      setMobile(false);
      setPageSize(6);
    } else {
      setPageSize(10);
      setMobile(false);
    }
  }, [width])

  return (
    <div className="allProductsContainer">
      <div className="allProductsHeader">
        <h1 className="title">전체 상품</h1>
        <div className="headerMenu">
          <Link to="/additem" className="addItem">
            상품 등록하기
          </Link>
          <div className="searchFormWrapper">
            <div className="searchBox">
              <img src="./search.png" alt="검색아이콘" />
              <form className="searchForm" onSubmit={onSearch}>
                <input
                  value={inputKeyword}
                  onChange={onChangeInput}
                  className="searchInput"
                  type="text"
                  placeholder="검색할 상품을 입력해주세요"
                />
                <button type="submit">검색</button>
              </form>
            </div>

            {isMobile ? (
              <select className="order" onChange={onChangeSelect}>
                <option value="선택" defaultChecked disabled></option>
                <option value="최신순">최신순</option>
                <option value="좋아요순">좋아요순</option>
              </select>
            ) : (
              <select className="order" onChange={onChangeSelect}>
                <option value="최신순" defaultChecked>
                  최신순
                </option>
                <option value="좋아요순">좋아요순</option>
              </select>
            )}
          </div>
        </div>
      </div>
      {!isLoading ? (
        !error ? (
          <div className="allProductsContents">
            {products.map((item) => (
              <div key={item.id} className="allProducts">
                <img src={item.images} alt={item.name} className="productImg" />
                <h2 className="productTitle">{item.name}</h2>
                <h2 className="productPrice">{item.price.toLocaleString("ko-KR")}원</h2>
                <span className="like">
                  <img src="./like.png" alt="좋아요" />
                  {item.favoriteCount}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="error">{error}</p>
        )
      ) : (
        <p className="loading">제품목록을 가져오고 있습니다.</p>
      )}
      <Pagination
        error={setError}
        isLoading={setLoading}
        setPage={setPage}
        page={page}
        totalPage={totalPage}
        isMobile={isMobile}
      />
    </div>
  );
};

export default AllProducts;
