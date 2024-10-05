import { Article, ArticleListProps } from "@/types/articles";
import Dropdown from "../UI/Dropdown/Dropdown";
import NewArticleButton from "../UI/Button/WriteButton";
import SearchInput from "../UI/Input/SearchInput";
import ArticleItem from "./ArticleItem";
import S from "./ArticleList.style";
import { useRouter } from "next/router";

export function ArticleList({ articles }: ArticleListProps) {
  const router = useRouter();

  const handleNavigate = (id) => {
    router.push(`/boards/${id}`);
  };

  return (
    <div>
      <S.TitleSection>
        <S.Title>게시글</S.Title>
        <NewArticleButton />
      </S.TitleSection>
      <S.SearchSection>
        <SearchInput />
        <Dropdown />
      </S.SearchSection>
      <S.ListSection>
        {articles.map((article: Article | null) => {
          if (!article) return null;
          return (
            <ArticleItem
              key={article.id}
              article={article}
              onClick={() => handleNavigate(article.id)}
            />
          );
        })}
      </S.ListSection>
    </div>
  );
}
