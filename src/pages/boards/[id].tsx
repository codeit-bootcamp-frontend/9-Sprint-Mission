// boards 페이지 -> 게시글 상세 페이지

import styled from "styled-components";
import { GetServerSideProps } from "next";
import {
  Article,
  ArticleComment,
  BoardDetailPageProps,
} from "@/types/articles";
import getArticle from "@/api/getArticle";
import getArticleComments from "@/api/getArticleComments";
import { ArticleContent } from "@/components/boards/[id]/ArticleContent";
import { ArticleReplyInput } from "@/components/boards/[id]/ArticleReplyInput";
import { ArticleReplyList } from "@/components/boards/[id]/ArticleReplyList";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const articleInfo: Article = await getArticle(id);
  const articleComments: ArticleComment[] = await getArticleComments(id);

  return {
    props: {
      articleInfo,
      articleComments,
    },
  };
};

export default function BoardDetailPage({
  articleInfo,
  articleComments,
}: BoardDetailPageProps) {
  return (
    <Container>
      <ArticleContent info={articleInfo} />
      <ArticleReplyInput />
      <ArticleReplyList info={articleComments} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;
