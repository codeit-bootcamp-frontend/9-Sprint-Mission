import { useState } from "react";
import Dropdown from "../components/Dropdown";
import useDataNum from "../hooks/useDataNum";
import BestProducts from "./items/BestProducts";
import AllProducts from "./items/AllProducts";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagenation";
import searchIcon from "../assets/image/ic_search.svg";
import useProducts from "../hooks/useProducts";

const SecondhandMarket = () => {
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const dataNum = useDataNum();

  const {
    products: bestProducts,
    isLoading: bestLoading,
    error: bestError,
  } = useProducts(dataNum[0], "favorite");

  const { products, isLoading, error, totalCount } = useProducts(
    dataNum[1],
    selectedOption === "최신순" ? "recent" : "favorite",
    page
  );

  return (
    <div className="page-size p-4 pb-[35px] Tablet:p-6 Tablet:pb-[72px] PC:px-0 PC:pt-6 PC:pb-[58px]">
      <div className="flex flex-col">
        <BestProducts bestProducts={bestProducts} />
      </div>
      <div className="relative flex justify-between items-center mt-10 Mobile:mt-6">
        <span className="text-xl font-bold text-gray900">전체 상품</span>
        <div className="flex gap-3 justify-end items-center">
          <div className="relative Mobile:absolute Mobile:left-0 Mobile:-bottom-[50px] w-[calc(100%-56px)] Tablet:w-[242px] PC:w-[325px]">
            <img
              src={searchIcon}
              className="absolute left-4 top-[9px]"
              alt="검색 아이콘"
            />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="pl-11 w-full h-[42px] rounded-xl text-left bg-gray100"
            />
          </div>
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
      <Pagination
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        totalCount={totalCount}
        dataNum={dataNum[1]}
      />
    </div>
  );
};

export default SecondhandMarket;
