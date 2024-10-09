import ArrowRight from "../assets/image/arrow_right.svg";

export default function Pagination({ page, setPage, isLoading }) {
  const pageNumber = [1, 2, 3, 4, 5];

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  const handlePrevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === 5) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <div className="flex gap-1 text-gray-500 text-center justify-center mt-[40px] PC:mt-[43px] text-lg font-semibold">
      <button
        disabled={isLoading}
        onClick={handlePrevPage}
        className="w-10 h-10 bg-white flex items-center justify-center rounded-[40px] outline outline-1 outline-gray200"
      >
        <img src={ArrowRight} alt="페이지네이션 왼쪽버튼" />
      </button>

      {pageNumber.map((pageNum) => (
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
