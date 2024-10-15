import "./Pagenation.css";
// import { useState } from "react";

interface Props {
  totalPage: number;
  currentPage: number;
  onChange:(pageNum:number) => void;
}
export function PageNation({ totalPage, currentPage, onChange } : Props) {
  // const [start, setStart] = useState(1);
  const maxPage = 5;
  let startPage:number;

  let calNum;
  if (currentPage <= maxPage) startPage = 1;
  else {
    calNum = Math.ceil(currentPage / maxPage);
    startPage = (calNum - 1) * maxPage + 1;
  }

  const pageArr = Array.from(
    { length: Math.min(maxPage, totalPage - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="pagenation-contatiner">
      <button
        className="pagenation-btn"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pageArr.map((page) => (
        <button
          key={page}
          className={`pagenation-btn ${
            currentPage === page ? "current-page" : ""
          }`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagenation-btn"
        disabled={currentPage === totalPage}
        onClick={() => onChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
