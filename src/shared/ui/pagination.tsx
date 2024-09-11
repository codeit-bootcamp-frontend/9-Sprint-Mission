import "./pagination.css";
import LeftArrow from "../assets/images/icons/arrow_left.svg";
import RightArrow from "../assets/images/icons/arrow_right.svg";

const VISIBLE_PAGES = 5;

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: any) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const start =
    Math.floor((currentPage - 1) / VISIBLE_PAGES) * VISIBLE_PAGES + 1;
  const isFirst = start === 1;
  const isLast = start + (VISIBLE_PAGES - 1) >= totalPages;

  return (
    <div className="pagination">
      <div>
        <button
          onClick={() => onPageChange(start - 1)}
          className={`paginationButton ${isFirst && "invisible"}`}
        >
          <img src={LeftArrow} alt="left arrow" />
        </button>
      </div>
      {[...Array(VISIBLE_PAGES)].map((_, i) => (
        <div key={`pagination-${i}`}>
          {start + i <= totalPages && (
            <button
              onClick={() => onPageChange(start + i)}
              className={`paginationButton ${
                currentPage === start + i && "active"
              }`}
            >
              {start + i}
            </button>
          )}
        </div>
      ))}
      <div>
        <button
          onClick={() => onPageChange(start + VISIBLE_PAGES)}
          className={`paginationButton ${isLast && "invisible"}`}
        >
          <img src={RightArrow} alt="right arrow" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
