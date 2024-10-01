import { BestArticle } from "@/components/boards/BestArticle";
import { Article, ArticleListProps } from "@/types/articles";
import S from "./BestArticles.style";

export function BestArticles({ articles }: ArticleListProps) {
  return (
    <S.Container>
      <S.Title>베스트 게시글</S.Title>
      <S.ArticleWrap>
        {articles.map((article: Article | null) => {
          if (!article) return null;
          return <BestArticle key={article.id} article={article} />;
        })}
      </S.ArticleWrap>
    </S.Container>
  );
}
