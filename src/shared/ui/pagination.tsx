// pagination.tsx
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../assets/images/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../assets/images/icons/arrow_right.svg";
import { PaginationProps } from "../types/pagination";

const VISIBLE_PAGES = 5;

// Styled Components
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const PaginationButton = styled.button<{
  invisible?: boolean;
  active?: boolean;
}>`
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #6b7280;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.invisible && "visibility: hidden;"}

  ${(props) =>
    props.active &&
    `
      background-color: var(--blue-100);
      color: #fff;
    `}
`;

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const start =
    Math.floor((currentPage - 1) / VISIBLE_PAGES) * VISIBLE_PAGES + 1;
  const isFirst = start === 1;
  const isLast = start + (VISIBLE_PAGES - 1) >= totalPages;

  return (
    <PaginationWrapper>
      <div>
        <PaginationButton
          onClick={() => onPageChange(start - 1)}
          invisible={isFirst}
        >
          <LeftArrow />
        </PaginationButton>
      </div>
      {[...Array(VISIBLE_PAGES)].map((_, i) => (
        <div key={`pagination-${i}`}>
          {start + i <= totalPages && (
            <PaginationButton
              onClick={() => onPageChange(start + i)}
              active={currentPage === start + i}
            >
              {start + i}
            </PaginationButton>
          )}
        </div>
      ))}
      <div>
        <PaginationButton
          onClick={() => onPageChange(start + VISIBLE_PAGES)}
          invisible={isLast}
        >
          <RightArrow />
        </PaginationButton>
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
