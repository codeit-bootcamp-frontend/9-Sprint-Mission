import { useState } from "react";
import { GetServerSideProps } from "next";
import { Article, ArticleComment } from "@/types/articles";
import styled from "styled-components";
import getArticle from "@/api/getArticle";
import getArticleComments from "@/api/getArticleComments";
import ArticleContent from "@/components/boards/ArticleContent";
import ArticleReplyInput from "@/components/boards/ArticleReplyInput";
import ArticleReplyList from "@/components/boards/ArticleReplyList";
import GoBackButton from "@/components/ui/button/GoBackButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id) {
    return { notFound: true };
  }

  try {
    const [articleInfo, articleComments] = await Promise.all([
      getArticle(id),
      getArticleComments(id),
    ]);

    return {
      props: {
        articleInfo: articleInfo,
        articleComments: articleComments,
      },
    };
  } catch (error) {
    console.error("Error fetching article or comments:", error);
    return {
      notFound: true,
    };
  }
};

const BoardDetailPage = ({
  articleInfo,
  articleComments: initialComments,
}: {
  articleInfo: Article;
  articleComments: ArticleComment[];
}) => {
  const [comments, setComments] = useState<ArticleComment[]>(initialComments); // 서버에서 가져온 초기 댓글 데이터로 프리렌더링하기 위해
  // 댓글 리스트를 다시 가져오는 함수
  const refreshComments = async () => {
    const updatedComments = await getArticleComments(articleInfo.id);
    setComments(updatedComments);
  };

  return (
    <Container>
      <ArticleContent info={articleInfo} />
      {/* 댓글 등록 후 리스트 갱신 */}
      <ArticleReplyInput refreshComments={refreshComments} />
      <ArticleReplyList list={comments} />
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
