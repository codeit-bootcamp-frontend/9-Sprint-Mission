import { useEffect } from "react";
import styles from "./ArticleList.module.css";
import { Dropdown } from "./Dropdown";
import { ArticleItem } from "./ArticleItem";
import { SearchForm } from "./SearchForm";
import Link from "next/link";
import { Query, ArticleResponse, Article } from "@/types/types";
import useAxios from "@/hooks/useAxios";

export default function ArticleList({
  initialArticles,
  query,
  dropdownOpen,
  handleClickOrder,
  handleClickOrderOpen,
  handleChangeSearchQuery,
}: {
  initialArticles: Article[];
  query: Query;
  dropdownOpen: boolean;
  handleClickOrder: (value: string) => void;
  handleClickOrderOpen: () => void;
  handleChangeSearchQuery: (search: string) => void;
}) {
  const { page, pageSize, orderBy, keyword } = query;
  const { data, setData, error, loading } = useAxios<ArticleResponse>(
    `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
  );

  useEffect(() => {
    if (initialArticles.length > 0) {
      setData({ list: initialArticles });
    }
  }, [initialArticles]);

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
        data && <ArticleItem articles={data.list} option="main" />
      )}
    </>
  );
}
