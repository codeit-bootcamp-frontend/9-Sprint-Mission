import { useCallback, useEffect, useMemo } from "react";
import ArrowRight from "../assets/image/arrow_right.svg";

export default function Pagination({
  page,
  setPage,
  isLoading,
  totalCount,
  dataNum,
}) {
  const totalPage = Math.ceil(totalCount / dataNum);
  const pageArray = Array.from({ length: totalPage }, (_, index) => index + 1);

  const currentGroup = Math.floor((page - 1) / 5);
  const displayedPages = useMemo(() => {
    return pageArray.slice(currentGroup * 5, (currentGroup + 1) * 5);
  }, [currentGroup, pageArray]);

  const handlePageClick = useCallback(
    (pageNum) => {
      setPage(pageNum);
    },
    [setPage]
  );

  const handlePrevPage = useCallback(() => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  }, [page, setPage]);

  const handleNextPage = useCallback(() => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  }, [page, setPage, totalPage]);

  useEffect(() => {
    if (totalPage !== 0 && page > totalPage) {
      setPage(totalPage);
    }
  }, [page, setPage, totalPage]);

  console.log(`page:${page}, totalPage:${totalPage}`);

  return (
    <div className="flex gap-1 text-gray-500 text-center justify-center mt-[40px] PC:mt-[43px] text-lg font-semibold">
      <button
        disabled={isLoading}
        onClick={handlePrevPage}
        className="w-10 h-10 bg-white flex items-center justify-center rounded-[40px] outline outline-1 outline-gray200"
      >
        <img src={ArrowRight} alt="페이지네이션 왼쪽버튼" />
      </button>

      {displayedPages.map((pageNum) => (
        <button
          disabled={isLoading}
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
          className={`w-10 h-10 rounded-[40px] ${
            pageNum === page
              ? "bg-[#2F80ED] text-white"
              : "bg-white outline outline-1 outline-gray200"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        disabled={isLoading}
        onClick={handleNextPage}
        className="w-10 h-10 bg-white flex items-center justify-center rounded-[40px] outline outline-1 outline-gray200"
      >
        <img
          src={ArrowRight}
          alt="페이지네이션 오른쪽버튼"
          className="rotate-180"
        />
      </button>
    </div>
  );
}
