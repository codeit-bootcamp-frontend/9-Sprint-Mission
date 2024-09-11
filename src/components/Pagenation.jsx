// import { getPandaItems } from "../api";
import styles from "./styles/Pagination.module.css";

export const PagenationBtn = () => {
  // const loadNextPage = await getPandaItems({page, pageSize, orderBy, search})

  const pageList = [];
  for (let i = 1; i < 6; i++) {
    pageList.push(i);
  }

  return (
    <div className={styles.pagenation}>
      <button type="button">&lt;</button>
      {pageList.map((i) => (
        <button type="button">{i}</button>
      ))}
      <button type="button">&gt;</button>
    </div>
  );
};
