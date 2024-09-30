import axios from "./axios";

export async function getArticles(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = axios.get(`/articles?${query}`);
    return (await response).data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function getArticleDetail(articleId: number) {
  try {
    const response = axios.get(`/articles/${articleId}`);
    return (await response).data;
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
    throw error;
  }
}
