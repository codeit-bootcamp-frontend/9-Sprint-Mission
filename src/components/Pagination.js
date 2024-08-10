import React from "react";
import "./Pagination.css";

function Pagination({ page, totalPages, pageLimit, onPageChange }) {
  const pages = [];
  const currentGroup = Math.floor((page - 1) / pageLimit);
  const startPage = currentGroup * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

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
        className={i === page ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  pages.push(
    <button
      key="next"
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
    >
      &gt;
    </button>
  );

  return <div className="pagination">{pages}</div>;
}

export default Pagination;
