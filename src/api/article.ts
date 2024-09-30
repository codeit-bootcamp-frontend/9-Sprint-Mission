// src/api/article.ts
import axiosInstance from "./axiosConfig";

export async function getArticles(params = {}) {
  try {
    const response = await axiosInstance.get("/articles", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function getArticleDetail(articleId: number) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
    throw error;
  }
}

export async function getArticleComments({
  articleId,
  params,
}: {
  articleId: number;
  params: unknown;
}) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get(
      `/articles/${articleId}/comments`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article comments:", error);
    throw error;
  }
}
