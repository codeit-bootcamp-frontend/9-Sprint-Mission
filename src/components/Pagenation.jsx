// import { getPandaItems } from "../api";
import styles from "./styles/Pagination.module.css";

export const PagenationBtn = ({ totalPage, currentPage, onPageChange }) => {
  const pageList = [];
  for (let i = 1; i < totalPage + 1; i++) {
    pageList.push(i);
  }

  return (
    <div className={styles.pagenation}>
      <button type="button">&lt;</button>
      {pageList.map((pageNum) => (
        <button key={pageNum} type="button">
          {pageNum}
        </button>
      ))}
      <button type="button">&gt;</button>
    </div>
  );
};

// pageList = [1 ... 13 ] -> 렌더링은 5까지만 되게 하고 > 버튼 눌렀을때 + 5 되도록 수정
