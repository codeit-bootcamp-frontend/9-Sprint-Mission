import axios from "axios";
import type { GetServerSideProps } from "next";
import { getArticleDetail, getArticleComments } from "@/api/article";
import { Article, ArticleComments } from "@/types/article";
import ArticleDetail from "@/components/UI/boards/ArticleDetail";
import BackButton from "@/components/UI/Button/BackButton";

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const articleId = Number(context.params?.id);

  let articles;
  let comments;

  try {
    if (articleId !== undefined) {
      articles = await getArticleDetail({ articleId });
    }
  } catch {
    return {
      notFound: true,
    };
  }

  try {
    const data = await getArticleComments({ articleId, limit: 10, cursor: 0 });
    comments = data.list ?? [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status, error.message);
    } else {
      throw new Error("에러가 발생했습니다.");
    }
  }

  return {
    props: { articles, comments },
  };
}) satisfies GetServerSideProps<{ articles: Article }>;

interface Props {
  articles: Article;
  comments: ArticleComments[];
}

const BoardDetail = ({ articles, comments }: Props) => {
  return (
    <section className="container">
      <ArticleDetail articles={articles} comments={comments} />
      <BackButton href="/boards" />
    </section>
  );
};

export default BoardDetail;
