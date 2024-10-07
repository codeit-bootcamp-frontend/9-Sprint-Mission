import { useEffect } from "react";
import styles from "./ArticleList.module.css";
import { ArticleItem } from "./ArticleItem";
import { Query, Article, ArticleResponse } from "@/types/types";
import useAxios from "@/hooks/useAxios";

export default function BestArticleList({
  query,
  initialArticles,
}: {
  query: Query;
  initialArticles: Article[];
}) {
  const { page, pageSize, orderBy } = query;
  const { data, setData, error, loading, setLoading } =
    useAxios<ArticleResponse>(
      `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
    );

  useEffect(() => {
    if (initialArticles.length > 0) {
      setData({ list: initialArticles });
    }
  }, [initialArticles]);

  useEffect(() => {
    if (data && data.list.length === 0 && !loading) setLoading(true);
  }, [query]);

  return (
    <>
      <h1 className={styles["section-title"]}>베스트 게시글</h1>
      {error && <p>{error.message}</p>}
      {data && <ArticleItem articles={data.list} option="best" />}
    </>
  );
}
