import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { ArticleProps, ArticleSortOption } from "@/types/article";
import Link from "next/link";
import styles from "./AllArticle.module.scss";
import Search from "@/components/UI/Search";
import Button from "@/components/UI/Button";
import ArticleCard from "./ArticleCard";
import { Dropdown } from "../Dropdown/DropdownMenu";

const AllArticle = ({ articles }: ArticleProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const orderByParam = params.get("orderBy");
  const keywordParam = params.get("keyword");
  const [orderBy, setOrderBy] = useState(orderByParam);
  const [search, setSearch] = useState(keywordParam);

  // 정렬 선택 핸들러
  const handleSortClick = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
    setOrderBy(orderBy);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value === "" ? null : value);
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
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>게시글</h2>
        <Button>
          <Link href="/addboard">글쓰기</Link>
        </Button>
      </div>

      <div className={styles.allArticleSectionHeader}>
        <Search
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          search={search}
        />
        <Dropdown>
          <Dropdown.Button />
          <Dropdown.Container>
            <Dropdown.Item>최신순</Dropdown.Item>
            <Dropdown.Line />
            <Dropdown.Item>좋아요순</Dropdown.Item>
          </Dropdown.Container>
        </Dropdown>
      </div>
      <ul>
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            className={styles.allArticleCard}
            UserAvatar={true}
          />
        ))}
      </ul>
    </section>
  );
};

export default AllArticle;
