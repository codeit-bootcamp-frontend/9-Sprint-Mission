import { getArticleDetail } from "@/api/article";
import { Article, ArticleProps } from "@/types/article";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const articleId = Number(context.params?.id);
  let article;
  try {
    if (articleId !== undefined) {
      article = await getArticleDetail(articleId);
    }
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: { article },
  };
}) satisfies GetServerSideProps<{ article: Article }>;

const ArticleDetail = <T extends Article>({ article }: ArticleProps<T>) => {
  return (
    <>
      <h1
        style={{
          height: "100vh",
          marginTop: "100px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        {article.id} 페이지입니다.
      </h1>
    </>
  );
};

export default ArticleDetail;
