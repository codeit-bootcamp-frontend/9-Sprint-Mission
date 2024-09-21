interface Props {
  totalPageNum: number;
  activePageNum: number;
  onClick: (pageNumber: number) => void;
}

const Pagination = ({ totalPageNum, activePageNum, onClick }: Props) => {
  const maxPages = 5;
  let startPage: number;

  // totalPageNum = 133(전체상품) / 6(보여지는 상품)
  if (totalPageNum <= maxPages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxPages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxPages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxPages, totalPageNum - startPage + 1) },
    (_, index) => startPage + index
  );

  return (
    <section className="Pagination">
      <div className="container">
        <div className="paging-wrap">
          <button
            type="button"
            className="left-arrow"
            disabled={activePageNum === 1}
            onClick={() => onClick(activePageNum - 1)}
          ></button>
          {pages.map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => onClick(page)}
              className={activePageNum === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="right-arrow"
            disabled={activePageNum === totalPageNum}
            onClick={() => onClick(activePageNum + 1)}
          ></button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
