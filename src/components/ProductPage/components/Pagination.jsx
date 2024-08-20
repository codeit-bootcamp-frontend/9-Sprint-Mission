const Pagination = ({ totalPageNum, activePageNum, onPageChange }) => {
  const maxPages = 5;
  let startPage;

  // totalPageNum = 133(전체상품) / 6(보여지는 상품)
  if (totalPageNum <= maxPages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxPages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxPages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxPages, totalPageNum - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <section className="Pagination">
      <div className="container">
        <div className="paging-wrap">
          <button
            type="button"
            className="left-arrow"
            disabled={activePageNum === 1}
            onClick={() => onPageChange(activePageNum - 1)}
          ></button>
          {pages.map(page => (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              className={activePageNum === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="right-arrow"
            disabled={activePageNum === totalPageNum}
            onClick={() => onPageChange(activePageNum + 1)}
          ></button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
