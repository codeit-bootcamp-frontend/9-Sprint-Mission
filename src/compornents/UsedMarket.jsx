import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import BestProducts from "./BestProducts";
import { getProducts } from "../api";
import "../css/UsedMarket.css";

function UsedMarket() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const pageSize = 10; // 페이지당 항목 수 설정
  const maxPageButtons = 5; // 한 번에 표시할 페이지 번호 버튼의 수

  useEffect(() => {
    // 예를 들어 AllProducts에서 가져오는 데이터를 기준으로 전체 페이지 수를 설정합니다.
    const fetchTotalPages = async () => {
      // 예시로 AllProducts에서 totalCount를 가져온다고 가정
      const data = await getProducts(pageSize, currentPage);
      setTotalPages(Math.ceil(data.totalCount / pageSize));
    };

    fetchTotalPages();
  }, [currentPage]);

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    //페이지가 정상적으로 넘어가지는지 확인하는 콘솔로그
    // console.log(`Changing to page ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* BestProducts에는 pageSize를 따로 내려 줄 필요는 없다. BestProducts 안에는 어차피 모든 페이지를 불러와 그 중에 최상단 4개를 보여주는 함수가 있어서. */}
      <div className="products-wrap">
        <BestProducts currentPage={currentPage} orderBy={"favorite"} />
        <AllProducts currentPage={currentPage} pageSize={pageSize} />
      </div>
      <div className="pagination">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </>
  );
}

export default UsedMarket;
