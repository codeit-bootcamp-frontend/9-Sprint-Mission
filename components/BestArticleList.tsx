import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "./ArticleList.module.css";
import { ArticleItem } from "./ArticleItem";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

interface ArticleResponse {
  list: Article[];
}

interface Query {
  page: number;
  pageSize: number;
  orderBy: string;
}

export default function BestArticleList({ query }: { query: Query }) {
  const [articles, setArticles] = useState<Article[]>([]);
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
    } catch (err) {
      if (err instanceof Error) setError(err);
      console.log("에러가 발생했습니다.");
    }
  }
  useEffect(() => {
    getArticles(query);
  }, [query]);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: undefined, // 시간 정보 제거
    minute: undefined,
    second: undefined,
    hour12: false, // 12시간 형식 사용 여부
  };

  return (
    <>
      <h1 className={styles["section-title"]}>베스트 게시글</h1>
      {error && <p>{error.message}</p>}
      {articles && (
        <ArticleItem articles={articles} option="best"></ArticleItem>
      )}
    </>
  );
}
