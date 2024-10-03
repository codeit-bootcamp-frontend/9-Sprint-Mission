import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "./ArticleList.module.css";
import { Dropdown } from "./Dropdown";
import { ArticleItem } from "./ArticleItem";
import { SearchForm } from "./SearchForm";
import Link from "next/link";
import { Query, Article, ArticleResponse } from "@/types/types";

export default function ArticleList({
  initialArticles,
  query,
  handleClickOrder,
  dropdownOpen,
  handleClickOrderOpen,
  handleChangeSearchQuery,
}: {
  initialArticles: Article[];
  query: Query;
  handleClickOrder: (value: string) => void;
  dropdownOpen: boolean;
  handleClickOrderOpen: () => void;
  handleChangeSearchQuery: (search: string) => void;
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //https://panda-market-api.vercel.app/articles?page=1&pageSize=10&orderBy=recent&keyword=keyword

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
        <Link href="/addboard" className={styles["create-btn"]}>
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
