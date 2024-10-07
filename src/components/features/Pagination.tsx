import React from "react";
import styles from "./Pagination.module.scss"; // 필요한 스타일 import

interface PaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5;

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total);
  const pageGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = (pageGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  return (
    <div className={styles.pagination}>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          disabled={currentPage === startPage + index}
        >
          {startPage + index}
        </button>
      ))}
      {endPage < totalPages && (
        <button onClick={() => onPageChange(endPage + 1)}>...</button>
      )}
    </div>
  );
};

export default Pagination;
