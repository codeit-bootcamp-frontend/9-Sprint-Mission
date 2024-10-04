// boards 페이지 -> 인기 게시글 목록

import { BestArticle } from "@/components/boards/BestArticle";
import { Article, ArticleListProps } from "@/types/articles";
import { useRouter } from "next/router";
import S from "./BestArticles.style";

export function BestArticles({ articles }: ArticleListProps) {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/boards/${id}`);
  };

  return (
    <S.Container>
      <S.Title>베스트 게시글</S.Title>
      <S.ArticleWrap>
        {articles.map((article: Article | null) => {
          if (!article) return null;
          return (
            <BestArticle
              key={article.id}
              article={article}
              onClick={() => handleNavigate(article.id)}
            />
          );
        })}
      </S.ArticleWrap>
    </S.Container>
  );
}
