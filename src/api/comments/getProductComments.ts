import axiosInstance from "../axiosConfig";
import { AxiosError } from "axios";
import { CommentListResponse } from "@/types/comment";

export async function getProductComments(
  productId: number,
  {
    limit,
    cursor,
  }: {
    limit: number;
    cursor?: number | null;
  }
): Promise<CommentListResponse> {
  if (!productId) {
    throw new Error("유효하지 않은 상품 ID입니다.");
  }

  try {
    const response = await axiosInstance.get<CommentListResponse>(
      `/products/${productId}/comments`,
      {
        params: {
          limit,
          cursor, // cursor는 선택 사항이므로 존재할 때만 추가됨
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getProductComments API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getProductComments 일반 에러:", error.message);
    } else {
      console.error("getProductComments 알 수 없는 오류:", error);
    }
    throw error;
  }
}
