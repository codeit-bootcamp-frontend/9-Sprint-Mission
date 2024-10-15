import axiosInstance from "../axiosConfig";
import { AxiosError } from "axios";
import { CommentListResponse } from "@/types/comment";

export async function getArticleComments(
  articleId: number,
  {
    limit,
    cursor,
  }: {
    limit: number;
    cursor?: number | null;
  }
): Promise<CommentListResponse> {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get<CommentListResponse>(
      `/articles/${articleId}/comments`,
      {
        params: {
          limit,
          cursor,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getArticleComments API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getArticleComments 일반 에러:", error.message);
    } else {
      console.error("getArticleComments 알 수 없는 오류:", error);
    }
    throw error;
  }
}
