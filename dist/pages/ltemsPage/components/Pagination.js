import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
function Pagination({ page, totalPages, pageLimit = 5, onPageChange, }) {
    const pages = [];
    const currentGroup = Math.floor((page - 1) / pageLimit);
    const startPage = currentGroup * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
    pages.push(_jsx("button", { onClick: () => onPageChange(page - 1), disabled: page === 1, children: "<" }, "prev"));
    for (let i = startPage; i <= endPage; i++) {
        pages.push(_jsx("button", { onClick: () => onPageChange(i), className: i === page ? "active" : "", children: i }, i));
    }
    pages.push(_jsx("button", { onClick: () => onPageChange(page + 1), disabled: page === totalPages, children: ">" }, "next"));
    return _jsx(StyledPagination, { children: pages });
}
export default Pagination;
const StyledPagination = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 43px 0 58px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 4px;
    padding: 12.5px;
    border: 0;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: #6b7280;
  }

  button.active {
    background-color: #2f80ed;
    color: #f9fafb;
  }

  @media (max-width: 1200px) {
    padding: 40px 0 72px;
  }

  @media (max-width: 768px) {
    padding: 40px 0 35px;
  }
`;
