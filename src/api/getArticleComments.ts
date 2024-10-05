import instance from "./axios";
import { ArticleComment } from "@/types/articles";

const getArticleComments = async (articleId: string | string[]) => {
  const res = await instance.get(`/articles/${articleId}/comments?limit=3`);
  return res.data.list as ArticleComment[];
};

export default getArticleComments;
