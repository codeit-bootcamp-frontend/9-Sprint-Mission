import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "./ArticleList.module.css";
import { ArticleItem } from "./ArticleItem";
import { Query, Article, ArticleResponse } from "@/types/types";

export default function BestArticleList({
  query,
  initialArticles,
}: {
  query: Query;
  initialArticles: Article[];
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [error, setError] = useState<Error | null>(null);
  //https://panda-market-api.vercel.app/articles?page=1&pageSize=10&orderBy=recent
  async function getArticles(query: Query) {
    const { page, pageSize, orderBy } = query;

    try {
      const res = await axios.get<ArticleResponse>(
        `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
      );
      const list = res.data.list;
      setArticles(list);
      setError(null);
    } catch (err) {
      if (err instanceof Error) setError(err);
      console.log("에러가 발생했습니다.");
    }
  }
  useEffect(() => {
    getArticles(query);
  }, [query]);

  return (
    <>
      <h1 className={styles["section-title"]}>베스트 게시글</h1>
      {error && <p>{error.message}</p>}
      {articles && <ArticleItem articles={articles} option="best" />}
    </>
  );
}
