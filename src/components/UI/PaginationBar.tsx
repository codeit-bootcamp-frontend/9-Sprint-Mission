// src/components/UI/InputItem.tsx
import React from "react";
import LeftArrow from "@/images/icons/arrow_left.svg";
import RightArrow from "@/images/icons/arrow_right.svg";

interface PaginationBarProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationBar = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationBarProps) => {
  const maxVisiblePages = 5;
  let startPage: number;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 ${
          activePageNum === 1 ? "opacity-50 cursor-default" : "cursor-pointer"
        }`}
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <LeftArrow />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 font-semibold text-base ${
            activePageNum === page
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-500"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 ${
          activePageNum === totalPageNum
            ? "opacity-50 cursor-default"
            : "cursor-pointer"
        }`}
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default PaginationBar;
