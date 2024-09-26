import ArticleList from "@/components/ArticleList";
import BestArticleList from "@/components/BestArticleList";
import styles from "./board.module.css";

export default function Boards() {
  const BestQuery = {
    page: 1,
    pageSize: 3,
    orderBy: "like",
  };
  const mainQuery = {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  };

  return (
    <div className="container">
      <section className={styles["section"]}>
        <h1 className={styles["section-title"]}>베스트 게시글</h1>
        <BestArticleList query={BestQuery} />
      </section>
      <section className={styles["section"]}>
        <div className={styles["title-wrap"]}>
          <h1 className={styles["section-title"]}> 게시글</h1>
          <button className={styles["create-btn"]}>글쓰기</button>
        </div>
        <ArticleList query={mainQuery} />
      </section>
    </div>
  );
}
