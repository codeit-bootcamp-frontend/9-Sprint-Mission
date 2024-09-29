import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "./ArticleList.module.css";
import { Dropdown } from "./Dropdown";
import { ArticleItem } from "./ArticleItem";
import { SearchForm } from "./SearchForm";
import Link from "next/link";
interface Query {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}
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

export default function ArticleList({
  query,
  handleClickOrder,
  dropdownOpen,
  handleClickOrderOpen,
  handleChangeSearchQuery,
}: {
  query: Query;
  handleClickOrder: (value: string) => void;
  dropdownOpen: boolean;
  handleClickOrderOpen: () => void;
  handleChangeSearchQuery: (search: string) => void;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //https://panda-market-api.vercel.app/articles?page=1&pageSize=10&orderBy=recent

  async function getArticles(query: Query) {
    const { page, pageSize, orderBy, keyword } = query;

    try {
      setLoading(true);
      const res = await axios.get<ArticleResponse>(
        `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
      );
      const list = res.data.list;
      setArticles(list);
    } catch (err) {
      if (err instanceof Error) setError(err);
      console.log("에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!loading) {
      getArticles(query);
    }
  }, [query]);

  return (
    <>
      {error && <p>{error.message}</p>}
      <div className={styles["title-wrap"]}>
        <h1 className={styles["section-title"]}>게시글</h1>
        <Link href="/addItems" className={styles["create-btn"]}>
          글쓰기
        </Link>
      </div>
      <div className={styles["search-order-wrap"]}>
        <SearchForm
          search={query.keyword ?? ""}
          handleChangeSearchQuery={handleChangeSearchQuery}
        />
        <Dropdown
          args={["최신순", "인기순"]}
          handleClickOrder={handleClickOrder}
          dropdownOpen={dropdownOpen}
          handleClickOrderOpen={handleClickOrderOpen}
        />
      </div>
      {loading ? (
        <div> 로딩중 ... </div>
      ) : (
        articles && <ArticleItem articles={articles} option="main" />
      )}
    </>
  );
}
