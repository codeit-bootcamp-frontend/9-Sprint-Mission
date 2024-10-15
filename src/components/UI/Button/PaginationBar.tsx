import React from "react";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/arrow_right.svg";
import S from "./PaginationBar.styles";

// PaginationBar 컴포넌트의 props 타입 정의
interface PaginationBarProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNum: number) => void; // 페이지 번호를 받아오는 함수
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}) => {
  const maxVisiblePages = 5;
  let startPage;

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
    <S.PaginationBar>
      <S.PaginationButton
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <LeftArrow />
      </S.PaginationButton>
      {pages.map((page) => (
        <S.PaginationButton
          key={page}
          className={activePageNum === page ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </S.PaginationButton>
      ))}
      <S.PaginationButton
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <RightArrow />
      </S.PaginationButton>
    </S.PaginationBar>
  );
};

export default PaginationBar;
