import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Article, ArticleSortOption, ArticleResponse } from "@/types/article";
import { getArticles } from "@/api/article";
import styles from "./AllArticle.module.scss";
import usePageSize from "@/hooks/usePageSize";
import AllArticleCard from "./AllArticleCard";
import DropdownMenu from "@/components/UI/DropdownMenu";
import Search from "@/components/UI/Search";
import Button from "@/components/UI/Button";
import Link from "next/link";

const AllArticle = () => {
  const router = useRouter();
  const pageSize = usePageSize("recent");
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const data: ArticleResponse = await getArticles({
          orderBy,
          pageSize,
          keyword,
        });
        setArticles(data.list);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.status, error.message);
        } else {
          throw new Error("에러가 발생했습니다.");
        }
      }
    };

    fetchAllArticles();
  }, [orderBy, pageSize, keyword]);

  // 정렬 선택 핸들러
  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

  // 검색어 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 검색 폼 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keyword) {
      router.push("/boards");
      return;
    }

    router.push(`/boards?keyword=${keyword}`);
  };

  return (
    <section className={styles.allArticle}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>게시글</h2>
        <Button>
          <Link href="/addboard">글쓰기</Link>
        </Button>
      </div>

      <div className={styles.allArticleSectionHeader}>
        <Search
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          keyword={keyword}
        />
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>

      <ul className={styles.articleWrap}>
        {articles?.map((article) => (
          <AllArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </section>
  );
};

export default AllArticle;
