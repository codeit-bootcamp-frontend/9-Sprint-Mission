import { getArticleDetail } from "@/api/article";
import { Article } from "@/types/article";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const articleId = Number(context.params?.id);
  let articles;
  try {
    if (articleId !== undefined) {
      articles = await getArticleDetail(articleId);
    }
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: { articles },
  };
}) satisfies GetServerSideProps<{ articles: Article }>;

const ArticleDetail = ({ articles }: { articles: Article }) => {
  return (
    <h1
      style={{
        height: "100vh",
        marginTop: "100px",
        fontSize: "20px",
        textAlign: "center",
      }}
    >
      {articles.id} 페이지입니다.
    </h1>
  );
};

export default ArticleDetail;
