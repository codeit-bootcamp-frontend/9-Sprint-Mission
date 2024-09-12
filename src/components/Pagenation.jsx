// import { getPandaItems } from "../api";
import { useEffect, useState } from "react";
import styles from "./styles/Pagination.module.css";

export const PagenationBtn = ({ totalPage, page, onPageChange }) => {
  // total page = 13, page = 1
  // page = pageNum이 같을때 버튼 활성화 스타일
  const [pageList, setPageList] = useState([]); // 페이지 버튼 범위를 값으로 갖는다
  const [pageCount, setPageCount] = useState(5); // 페이지 버튼 범위를 설정하기 위한 상태 관리

  useEffect(() => {
    const startPage = Math.max(1, pageCount - 4); // 페이지버튼 시작
    const endPage = Math.min(totalPage, pageCount); //페이지버튼 끝
    const newPageList = [];

    for (let i = startPage; i <= endPage; i++) {
      newPageList.push(i);
    }
    setPageList(newPageList);
  }, [pageCount, totalPage]);

  // 버튼 눌렀을때 페이지 범위 바뀜
  const onClickPrev = (e) => {
    e.preventDefault();
    if (pageCount > 1) {
      setPageCount(Math.max(pageCount - 5, 1));
    }
    console.log(pageCount);
  };

  const onClickNext = (e) => {
    e.preventDefault();
    if (pageCount < totalPage) {
      setPageCount(Math.min(pageCount + 5, totalPage));
    }
    console.log(pageCount);
  };

  const onClickBtn = (pageNum, e) => {
    e.preventDefault();
    onPageChange(pageNum); // 부모컴포넌트에서 page 상태 변경 -> GET 요청
    console.log(pageNum);
  };

  return (
    <div className={styles.pagenation}>
      <button type="button" onClick={onClickPrev}>
        &lt;
      </button>
      {pageList.map((pageNum) => (
        <button
          key={pageNum}
          type="button"
          onClick={(e) => onClickBtn(pageNum, e)}
        >
          {pageNum}
        </button>
      ))}
      <button type="button" onClick={onClickNext}>
        &gt;
      </button>
    </div>
  );
};

//페이지 눌렀을때 페이지네이션 재렌더링

// page = pageNum 이랑 같으면 버튼 활성화 클래스 추가하기

// 페이지 사이즈 바로바로 반영안됨 이슈 (아마 비동기적으로 되고있는거같다)
