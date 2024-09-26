import ArticleList from "@/components/ArticleList";
import BestArticleList from "@/components/BestArticleList";
import styles from "./board.module.css";
import { useState } from "react";
interface Query {
  page: number;
  pageSize: number;
  orderBy: string;
}
export default function Boards() {
  const [mainQuery, setMainQuery] = useState<Query>({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  });
  const [bestQuery, setBestQuery] = useState<Query>({
    page: 1,
    pageSize: 3,
    orderBy: "like",
  });

  const handleClickOrder = (order: string): void => {
    setMainQuery({
      page: 1,
      pageSize: 10,
      orderBy: order,
    });
  };

  return (
    <div className="container">
      <section className={styles["section"]}>
        <h1 className={styles["section-title"]}>베스트 게시글</h1>
        <BestArticleList query={bestQuery} />
      </section>
      <section className={styles["section"]}>
        <div className={styles["title-wrap"]}>
          <h1 className={styles["section-title"]}> 게시글</h1>
          <button className={styles["create-btn"]}>글쓰기</button>
        </div>
        <ArticleList query={mainQuery} handleClickOrder={handleClickOrder} />
      </section>
    </div>
  );
}
