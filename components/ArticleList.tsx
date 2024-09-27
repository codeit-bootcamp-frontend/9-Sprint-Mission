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
}: {
  query: Query;
  handleClickOrder: (value: string) => void;
  dropdownOpen: boolean;
  handleClickOrderOpen: () => void;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState<string>("");

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

  const handleChangeValue = (value: string): void => {
    setSearch(value);
  };

  useEffect(() => {
    getArticles(query);
  }, [query]);

  // search 값으로 articles 배열을 필터링하는 함수
  const getFilteredData = (search: string): Article[] => {
    const searchTerm = typeof search === "string" ? search : "";

    if (searchTerm === "") {
      return articles;
    }
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  //검색어 필터 함수 호출
  const filteredArticles = getFilteredData(search);

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
        <SearchForm search={search} handleChangeValue={handleChangeValue} />
        <Dropdown
          args={["최신순", "인기순"]}
          handleClickOrder={handleClickOrder}
          dropdownOpen={dropdownOpen}
          handleClickOrderOpen={handleClickOrderOpen}
        />
      </div>

      {filteredArticles && (
        <ArticleItem articles={filteredArticles} option="main" />
      )}
    </>
  );
}
