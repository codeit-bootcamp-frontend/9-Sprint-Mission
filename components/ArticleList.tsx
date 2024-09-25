/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import styles from "./ArticleList.module.css";
import Image from "next/image";

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

export default function ArticleList({ query }: { query: Query }) {
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
      {error && <p>{error.message}</p>}
      {articles.map((article) => (
        <li key={article.id} className={styles["article-box"]}>
          {/* 게시글 제목  + 이미지 = 꽉차게 한블럭 */}
          <div className={styles["article-title-image"]}>
            <div className={styles["article-title"]}>{article.title}</div>
            <img
              className={styles.imageBox}
              src={article.image}
              width={300}
              height={300}
              alt=""
            />
          </div>

          {/* [작성자 프로필 + 날짜] + [하트(before 처리) + 좋아요] */}
          <div className={styles["article-info"]}>
            {/* [작성자 + 날짜] */}
            <div className={styles["writer-info"]}>
              <div className={styles["writer-img"]}></div>
              <div className={styles["writer-nickname"]}>
                {article.writer.nickname}
              </div>
              <div className={styles["article-date"]}>
                {new Date(article.updatedAt).toLocaleString("ko-KR", options)}
              </div>
            </div>
            <div className={styles["article-like"]}>{article.likeCount}</div>
          </div>
        </li>
      ))}
    </>
  );
}
