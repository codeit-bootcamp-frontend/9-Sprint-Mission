import { useState, useEffect } from "react";
import "./pagination.css";
import LeftArrow from "../../../shared/assets/images/icons/arrow_left.svg";
import RightArrow from "../../../shared/assets/images/icons/arrow_right.svg";

const Pagination = ({ totalCount, pageSize, currentPage, onPageChange }) => {
  const visiblePages = 5;
  const totalPages = Math.ceil(totalCount / pageSize);
  const [start, setStart] = useState(1);
  const isFirst = start === 1;
  const isLast = start + (visiblePages - 1) >= totalPages;

  useEffect(() => {
    if (currentPage === start + visiblePages)
      setStart((prev) => prev + visiblePages);
    if (currentPage < start) setStart((prev) => prev - visiblePages);
  }, [currentPage, visiblePages, start]);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(start - 1)}
        className={`paginationButton ${isFirst && "invisible"}`}
      >
        <LeftArrow />
      </button>
      {[...Array(visiblePages)].map((page, i) => (
        <>
          {start + i <= totalPages && (
            <button
              key={i}
              onClick={() => onPageChange(start + i)}
              className={`paginationButton ${
                currentPage === start + i && "active"
              }`}
            >
              {start + i}
            </button>
          )}
        </>
      ))}
      <button
        onClick={() => onPageChange(start + visiblePages)}
        className={`paginationButton ${isLast && "invisible"}`}
      >
        <RightArrow />
      </button>
    </div>
  );
};
export default Pagination;
