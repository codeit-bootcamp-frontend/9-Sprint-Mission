// boards 페이지 -> 게시글 상세 페이지

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import getArticle from "@/api/getArticle";
import getArticleComments from "@/api/getArticleComments";
import { ArticleContent } from "@/components/boards/[id]/ArticleContent";
import { ArticleReplyInput } from "@/components/boards/[id]/ArticleReplyInput";
import { ArticleReplyList } from "@/components/boards/[id]/ArticleReplyList";
import { GoBackButton } from "@/components/UI/Button/GoBackButton";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;
//   const articleInfo: Article = await getArticle(id);
//   const articleComments: ArticleComment[] = await getArticleComments(id);

//   return {
//     props: {
//       articleInfo,
//       articleComments,
//     },
//   };
// };

const BoardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({ article: {}, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [articleInfo, articleComments] = await Promise.all([
          getArticle(id),
          getArticleComments(id),
        ]);
        setData({ article: articleInfo, comments: articleComments });
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <ArticleContent info={data.article} />
      <ArticleReplyInput />
      <ArticleReplyList list={data.comments} />
      <GoBackButton />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 90px auto;

  > :nth-child(2) {
    margin-top: 32px;
  }

  > :nth-child(3) {
    margin-top: 40px;
  }

  > :last-child {
    margin: 0 auto;
    margin-top: 48px;
  }
`;

export default BoardDetailPage;
