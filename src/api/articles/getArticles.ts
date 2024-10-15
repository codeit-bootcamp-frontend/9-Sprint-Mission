import axiosInstance from "../axiosConfig";
import { AxiosError } from "axios";
import { ArticleListResponse, ArticleSortOption } from "@/types/article";

export async function getArticles({
  page,
  pageSize,
  orderBy,
  keyword,
}: {
  page: number;
  pageSize: number;
  orderBy: ArticleSortOption;
  keyword?: string;
}): Promise<ArticleListResponse> {
  try {
    // keyword가 없으면 params에서 제외
    const params: Record<string, unknown> = { page, pageSize, orderBy };
    if (keyword) params.keyword = keyword;

    const response = await axiosInstance.get<ArticleListResponse>("/articles", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getArticles API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getArticles 일반 에러:", error.message);
    } else {
      console.error("getArticles 알 수 없는 오류:", error);
    }
    throw error;
  }
}
