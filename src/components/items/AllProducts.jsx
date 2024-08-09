import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./AllProducts.css";
import Pagination from "./Pagination";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [order, setOrder] = useState("id");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const sortedProducts = products.sort((a, b) => b[order] - a[order]);
  const totalPages = Math.ceil(sortedProducts.length / 2); // 임의로 5개 페이지로 진행하는 것 같아 결과를 totalPages를 5로 나오도록 설정
  const width = window.innerWidth;

  // select 태그를 이용한 정렬함수
  const onChangeSelect = (e) => {
    const userSelect = e.target.value;

    // 데이터에 createdAt, updatedAt 값이 모두 동일하여 id로 정렬
    if (userSelect === "최신순") {
      setOrder("id");
    } else {
      setOrder("favoriteCount");
    }
  };

  // 검색 인풋 change 함수
  const onChangeInput = (e) => {
    const userInput = e.target.value;
    setSearch(userInput);

    if (userInput.trim() === "") {
      setProducts(initialProducts);
    }
  };

  // 검색 form의 submit 함수
  const onSearch = (e) => {
    e.preventDefault();

    const searchProducts = products.filter((product) => product.description.includes(search));
    setProducts(searchProducts);
  };

  // Pagination 컴포넌트로부터 새 배열 받아오는 함수
  const getNewProducts = useCallback((newProducts) => {
    setProducts(newProducts);
  }, []);

  // 페이지 렌더링 시 표출할 제품 목록 가져오는 함수
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://panda-market-api.vercel.app/products/");
        if (response.status === 200) {
          setProducts(response.data.list);
          setInitialProducts(response.data.list);
          setError(null);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("전체 상품정보를 가져오지 못했습니다.");
          console.error("AllProducts getProducts에서 오류 발생", error);
        }
      }
    };

    getProducts();
  }, []);

  // 사용환경에 따른 pageSize 값 변경과 모바일 스타일을 위한 mobile 값 변경
  useEffect(() => {
    if (width > 375 && width < 767) {
      setMobile(true);
      setPageSize(4);
    } else if (width > 767 && width < 1199) {
      setMobile(false);
      setPageSize(6);
    } else {
      setPageSize(10);
    }
  }, [width]);

  // 서버에 pageSize 값 전달
  useEffect(() => {
    const updatePageSize = async () => {
      try {
        const response = await axios.get(`https://panda-market-api.vercel.app/products/?pageSize=${pageSize}`);

        if (response.status === 200) {
          console.log("pageSize 조절됨", response.data);
        }
      } catch (error) {
        console.error("updatePageSize에서 오류 발생", error);
      }
    }

    updatePageSize();
  }, [pageSize]);

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
                  value={search}
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
            {sortedProducts.map((item) => (
              <div key={item.id} className="allProducts">
                <img src={item.images} alt={item.name} className="productImg" />
                <h2 className="productTitle">{item.description}</h2>
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
        newPageProducts={getNewProducts}
        error={setError}
        isLoading={setLoading}
        totalPage={totalPages}
      />
    </div>
  );
};

export default AllProducts;
