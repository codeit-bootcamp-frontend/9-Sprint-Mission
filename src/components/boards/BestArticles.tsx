import { Article } from "@/types/articles";
import { BestArticle } from "@/components/boards/BestArticle";
import S from "./BestArticles.style";

interface BestArticlesProps {
  articles: Article[];
}

export function BestArticles({ articles }: BestArticlesProps) {
  return (
    <S.Container>
      <S.Title>베스트 게시글</S.Title>
      <S.ArticleWrap>
        {articles.map((article) => (
          <BestArticle key={article.id} article={article} />
        ))}
      </S.ArticleWrap>
    </S.Container>
  );
}
