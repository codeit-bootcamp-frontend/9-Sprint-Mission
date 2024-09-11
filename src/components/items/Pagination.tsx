import { memo } from "react";
import "./Pagination.css";

interface IProps {
  totalPage: number;
  page: number;
  isMobile: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IProps> = ({ totalPage, page, isMobile, setPage }) => {
  // 다음페이지 데이터 가져오는 함수
  const onPageToNext = () => {
    let nextPage = page + 1;

    if (nextPage > totalPage) {
      setPage(totalPage);
      alert("마지막 페이지입니다.");
    } else {
      setPage(nextPage);
    }
  };

  // 이전페이지 데이터 가져오는 함수
  const onPageToPrev = () => {
    let prevPage = page - 1;
    setPage(prevPage);

    if (prevPage < 1) {
      setPage(1);
      alert("첫번째 페이지입니다.");
    } else {
      setPage(prevPage);
    }
  };

  // 각 페이지로 이동할 수 있도록 page를 바꾸는 함수
  const onClickPage = (i: number) => {
    setPage(i);
  };

  return (
    <div className="paginationContainer">
      <div className="pageNumberBox">
        <button className="numberBoxBtn" onClick={onPageToPrev}>
          <img src="/icons/arrowLeft.png" alt="왼쪽" />
        </button>
        {!isMobile ? (
          Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i}
              className={`pageNumber ${page === i + 1 ? "current" : ""}`}
              onClick={() => onClickPage(i + 1)}
            >
              {i + 1}
            </button>
          ))
        ) : (
          <p className="pageNumber">{page}</p>
        )}
        <button className="numberBoxBtn" onClick={onPageToNext}>
          <img src="/icons/arrowRight.png" alt="오른쪽" />
        </button>
      </div>
      {isMobile && <span className="mobileMsg">화살표를 눌러 이동해주세요!</span>}
    </div>
  );
};

export default memo(Pagination);
