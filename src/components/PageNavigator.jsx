import styles from "../assets/styles/PageNavigator.module.css";

function PageNavigator({ setPage, currentPage, onPageClick }) {
  const pages = [1, 2, 3, 4, 5];

  const handleNextPage = () => {
    if (currentPage !== 5) setPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) setPage(currentPage - 1);
  };

  return (
    <div className={styles.pagesWrap}>
      <button className={styles.page} onClick={handlePreviousPage}>
        {"<"}
      </button>

      {pages.map((page) => {
        if (page === currentPage) {
          return (
            <button
              key={page}
              type="button"
              className={`${styles.page} ${styles.active}`}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          );
        } else
          return (
            <button
              key={page}
              type="button"
              className={styles.page}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          );
      })}

      <button className={styles.page} onClick={handleNextPage}>
        {">"}
      </button>
    </div>
  );
}

export default PageNavigator;
