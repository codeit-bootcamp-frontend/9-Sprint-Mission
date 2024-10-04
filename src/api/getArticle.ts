import instance from "./axios";
import { Article } from "@/types/articles";

const getArticle = async (articleId: number) => {
  const res = await instance.get(`/articles/${articleId}`);
  return res.data as Article;
};

export default getArticle;
