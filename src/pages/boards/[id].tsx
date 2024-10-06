import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Article, ArticleComment } from "@/types/articles";
import styled from "styled-components";
import getArticle from "@/api/getArticle";
import getArticleComments from "@/api/getArticleComments";
import ArticleContent from "@/components/boards/[id]/ArticleContent";
import ArticleReplyInput from "@/components/boards/[id]/ArticleReplyInput";
import ArticleReplyList from "@/components/boards/[id]/ArticleReplyList";
import GoBackButton from "@/components/UI/Button/GoBackButton";

const BoardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 상태에 대한 명확한 타입 설정
  const [articleData, setArticleData] = useState<{
    info: Article | {};
    comments: ArticleComment[];
  }>({
    info: {},
    comments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Promise.all을 사용하여 article과 comments 데이터를 병렬로 가져옴
          const [articleInfo, articleComments] = await Promise.all([
            getArticle(id),
            getArticleComments(id),
          ]);
          // 가져온 데이터를 상태에 설정
          setArticleData({ info: articleInfo, comments: articleComments });
        }
      } catch (error) {
        console.error("Failed to fetch article data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <ArticleContent info={articleData.info} />
      <ArticleReplyInput />
      <ArticleReplyList list={articleData.comments} />
      <GoBackButton />
    </Container>
  );
};

export default BoardDetailPage;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  max-width: 1200px;
  margin: 90px auto;

  > :nth-child(2) {
    margin-top: 50vh;
  }

  > :nth-child(3) {
    margin-top: 40px;
  }

  > :last-child {
    margin: 0 auto;
    margin-top: 48px;
  }
`;
