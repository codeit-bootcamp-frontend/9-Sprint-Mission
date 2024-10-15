import { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import useDataNum from "../hooks/useDataNum";
import BestProducts from "./items/BestProducts";
import AllProducts from "./items/AllProducts";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagenation";
import searchIcon from "../assets/image/ic_search.svg";

const SecondhandMarket = () => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const dataNum = useDataNum();

  const fetchData = async (pagesize, option, setFunction) => {
    try {
      setIsLoading(true);
      let result;

      result = await getProducts({
        page,
        pageSize: pagesize,
        orderBy: option,
      });
      setFunction(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 에러가 Axios 요청에서 발생한 경우
        console.error("AxiosError 로딩 오류:", error);
      } else {
        // 그 외의 에러인 경우
        console.error("데이터 로딩 오류:", error);
      }
      setError(true); // 에러 상태 업데이트
    } finally {
      setIsLoading(false);
    }
  };

  const loadBestProducts = () => {
    fetchData(dataNum[0], "favorite", setBestProducts);
  };

  const loadProducts = () => {
    if (selectedOption === "최신순") {
      fetchData(dataNum[1], "recent", setProducts);
    } else {
      fetchData(dataNum[1], "favorite", setProducts);
    }
  };

  useEffect(() => {
    loadBestProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, page]);

  return (
    <div className="page-size p-4 pb-[35px] Tablet:p-6 Tablet:pb-[72px] PC:px-0 PC:pt-6 PC:pb-[58px]">
      <div className="flex flex-col">
        <BestProducts bestProducts={bestProducts} />
      </div>
      <div className="relative flex justify-between items-center mt-10 Mobile:mt-6">
        <span className="text-xl font-bold text-gray900">전체 상품</span>
        <div className="flex gap-3 justify-end items-center">
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            className="Mobile:absolute Mobile:left-0 Mobile:-bottom-[50px] w-[calc(100%-56px)] Tablet:w-[242px] PC:w-[325px] h-[42px] rounded-xl text-left bg-gray100"
          />
          <Link to="/additem">
            <button className="w-[133px] h-[42px] rounded-lg text-white bg-primary100">
              상품 등록하기
            </button>
          </Link>
          <div className="Mobile:absolute Mobile:right-0 Mobile:-bottom-[50px]">
            <Dropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <AllProducts products={products} />
      <Pagination page={page} setPage={setPage} isLoading={isLoading} />
    </div>
  );
};

export default SecondhandMarket;
