import instance from "./axios";
import { ArticleComment } from "@/types/articles";

const getArticleComments = async (articleId: number) => {
  const res = await instance.get(`/articles/${articleId}/comments?limit=3`);
  return res.list as ArticleComment[];
};

export default getArticleComments;
