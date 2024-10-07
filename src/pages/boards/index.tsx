import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Article, BoardsPageProps } from "@/types/articles";
import { BestArticles } from "../../components/boards/BestArticles";
import { ArticleList } from "../../components/boards/ArticleList";
import getArticles from "@/api/getArticles";
import styled from "styled-components";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // context 객체를 이용하여 실시간으로 query값 가져오기
  const { orderBy = "recent", keyword = "" } = context.query;

  // Promise.all을 사용하여 두 개의 API 요청을 병렬로 수행하여 성능 개선.
  const [totalArticles, bestArticles] = await Promise.all([
    getArticles(1, 10, orderBy, keyword), // 전체 기사
    getArticles(1, 3, "like", ""), // 베스트 기사
  ]);

  return {
    props: {
      totalArticles,
      bestArticles,
    },
  };
}

export default function BoardsPage({
  totalArticles,
  bestArticles,
}: BoardsPageProps) {
  const [currentBestArticles, setCurrentBestArticles] = useState<Article[]>(
    bestArticles || []
  );
  const [pageSize, setPageSize] = useState(3); // 초기 pageSize 설정

  useEffect(() => {
    const reFetchBestArticles = async (newPageSize: number) => {
      const res = await getArticles(1, newPageSize, "like", "");
      setCurrentBestArticles(res);
      console.log(`현재 pageSize: ${newPageSize}`);
    };

    const handleResize = () => {
      // 화면 크기에 따라 pageSize 업데이트
      const newPageSize =
        window.innerWidth <= 1024 ? (window.innerWidth <= 744 ? 1 : 2) : 3;

      if (newPageSize !== pageSize) {
        setPageSize(newPageSize); // pageSize가 업데이트 될 때에만 pageSize 업데이트
        reFetchBestArticles(newPageSize); // 새로운 pageSize로 재패칭
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시 호출

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]); // pageSize 의존성 추가

  return (
    <Container>
      <BestArticles articles={currentBestArticles} />
      <ArticleList articles={totalArticles} />
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    max-width: 800px;
    padding: 0 24px;
    gap: 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    max-width: 566px;
    padding: 0 16px;
    gap: 24px;
  }
`;
