// boards 페이지 -> 인기 게시글 목록

import { BestArticle } from "@/components/boards/BestArticle";
import { Article, ArticleListProps } from "@/types/articles";
import { useRouter } from "next/router";
import styled from "styled-components";

export function BestArticles({ articles }: ArticleListProps) {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/boards/${id}`);
  };

  return (
    <Container>
      <Title>베스트 게시글</Title>
      <ArticleWrap>
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
      </ArticleWrap>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 94px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);
`;

const ArticleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  height: 169px;
`;
