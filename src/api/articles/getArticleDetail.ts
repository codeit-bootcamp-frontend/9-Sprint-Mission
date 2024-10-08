import axiosInstance from "../axiosConfig";
import { AxiosError } from "axios";
import { ArticleDetail } from "@/types/article";

export async function getArticleDetail(
  articleId: number
): Promise<ArticleDetail> {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get<ArticleDetail>(
      `/articles/${articleId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getArticleDetail API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getArticleDetail 일반 에러:", error.message);
    } else {
      console.error("getArticleDetail 알 수 없는 오류:", error);
    }
    throw error;
  }
}
