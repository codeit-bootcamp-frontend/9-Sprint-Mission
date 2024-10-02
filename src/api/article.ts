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
  limit,
  cursor,
}: {
  articleId: number;
  limit: number;
  cursor?: number | null; // 다음 페이지를 위한 커서는 선택
}) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get(
      `/articles/${articleId}/comments`,
      {
        params: {
          limit,
          cursor, // cursor는 선택 사항이므로 존재할 때만 추가됨
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article comments:", error);
    throw error;
  }
}
