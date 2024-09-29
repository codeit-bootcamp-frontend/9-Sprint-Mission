import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  total: number;
  pageLimit?: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  page,
  total,
  pageLimit = 5,
  onPageChange,
}: PaginationProps) {
  const pages: JSX.Element[] = [];
  const currentGroup = Math.floor((page - 1) / pageLimit);
  const startPage = currentGroup * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, total);

  pages.push(
    <button
      key="prev"
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
    >
      &lt;
    </button>
  );

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={i === page ? styles.active : ""}
      >
        {i}
      </button>
    );
  }

  pages.push(
    <button
      key="next"
      onClick={() => onPageChange(page + 1)}
      disabled={page === total}
    >
      &gt;
    </button>
  );

  return <div className={styles.pagination}>{pages}</div>;
}

export default Pagination;
