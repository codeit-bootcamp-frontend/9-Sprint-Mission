import Dropdown from "../UI/Dropdown/Dropdown";
import NewArticleButton from "../UI/Button/WriteButton";
import SearchInput from "../UI/Input/SearchInput";
import ArticleItem from "./ArticleItem";
import { Article, ArticleListProps } from "@/types/articles";
import S from "./ArticleList.style";

export function ArticleList({ articles }: ArticleListProps) {
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
          return <ArticleItem key={article.id} article={article} />;
        })}
      </S.ListSection>
    </div>
  );
}
