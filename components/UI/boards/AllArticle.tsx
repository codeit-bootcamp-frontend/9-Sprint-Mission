import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Article, ArticleSortOption } from "@/types/article";
import Link from "next/link";
import styles from "./AllArticle.module.scss";
import Search from "@/components/UI/Search";
import Button from "@/components/UI/Button/Button";
import ArticleCard from "./ArticleCard";
import { Dropdown } from "../Dropdown/DropdownMenu";
import { TitleSection, SectionTitle } from "../CommonStyles";
import { getArticles } from "@/api/article";

interface Props {
  articles: Article[];
  orderBy: ArticleSortOption;
  keyword: string | null;
}

const AllArticle = ({
  articles: initialArticles,
  orderBy: initialOrderBy,
  keyword: initialKeyword,
}: Props) => {
  const router = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [search, setSearch] = useState(initialKeyword || "");

  // 정렬 선택 핸들러
  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticles({ orderBy, keyword: search });
      setArticles(response.list);
    };

    fetchArticles();
  }, [orderBy, search]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  // 검색 폼 핸들러
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      router.push("/boards");
      return;
    }

    router.push(`/boards?keyword=${search}`);
  };

  return (
    <section className={styles.allArticle}>
      <TitleSection>
        <SectionTitle>게시글</SectionTitle>
        <Button>
          <Link href="/addboard">글쓰기</Link>
        </Button>
      </TitleSection>

      <div className={styles.allArticleSectionHeader}>
        <Search
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          search={search}
        />
        <Dropdown>
          <Dropdown.Button />
          <Dropdown.Container>
            <Dropdown.Item onClick={() => handleSortSelection("recent")}>
              최신순
            </Dropdown.Item>
            <Dropdown.Line />
            <Dropdown.Item onClick={() => handleSortSelection("like")}>
              좋아요순
            </Dropdown.Item>
          </Dropdown.Container>
        </Dropdown>
      </div>
      <ul>
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            className={styles.allArticleCard}
          />
        ))}
      </ul>
    </section>
  );
};

export default AllArticle;
