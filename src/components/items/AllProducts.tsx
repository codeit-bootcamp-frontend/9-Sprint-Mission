import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/api";
import Pagination from "./Pagination";
import "./AllProducts.css";
import axios from "axios";

interface IProps {
  width: number;
}

interface IProduct {
  id: number;
  images: string;
  name: string;
  price: number;
  favoriteCount: number;
}

const AllProducts: React.FC<IProps> = ({ width }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [inputKeyword, setInputKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  // 사용환경에 따른 pageSize 조절 (심화사항에 적절하게 설정하라고 하여 화면을 넘지 않도록 태블릿부터 10개로 했습니다.)
  const calculatePageSize = (width: number) => {
    if (width > 375 && width < 767) {
      return 4;
    }  else {
      return 10;
    }
  };

  const pageSize = calculatePageSize(width);

  // 모바일 확인
  const isMobile = width > 375 && width < 767;  

  // select 태그를 이용한 정렬함수
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userSelect = e.target.value;

    if (userSelect === "최신순") {
      setOrder("recent");
    } else {
      setOrder("favorite");
    }
  };

  // 검색 인풋 change 함수
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInputKeyword(userInput);
  };

  // 검색 form의 submit 함수
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputKeyword);
  };

  // 페이지 렌더링 시 표출할 제품 목록 가져오는 함수
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProducts({ page, pageSize, orderBy: order, keyword });

        if (response) {
          setProducts(response.list);
          setTotalPage(Math.ceil(response.totalCount / pageSize));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("전체상품 getProducts에서 API 오류 발생", error);
        } else {
          console.error("전체상품 getProducts에서 알 수 없는 오류 발생", error);
        }
        setError("전체 상품정보를 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getAllProducts();
  }, [page, pageSize, order, keyword]);
  
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
              <img src="/icons/search.png" alt="검색아이콘" />
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
              <Link to={`/items/${item.id}`} key={item.id} className="allProducts">
                <img src={item.images} alt={item.name} className="productImg" />
                <h2 className="productTitle">{item.name}</h2>
                <h2 className="productPrice">{item.price.toLocaleString("ko-KR")}원</h2>
                <span className="like">
                  <img src="/icons/like.png" alt="좋아요" />
                  {item.favoriteCount}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="error">{error}</p>
        )
      ) : (
        <p className="loading">제품목록을 가져오고 있습니다.</p>
      )}
      <Pagination
        setPage={setPage}
        page={page}
        totalPage={totalPage}
        isMobile={isMobile}
      />
    </div>
  );
};

export default AllProducts;
