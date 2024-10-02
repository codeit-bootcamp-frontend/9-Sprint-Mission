// src/api/item.ts
import { AxiosError } from "axios";
import axiosInstance from "./axiosConfig";
import {
  ProductDetail,
  ProductListResponse,
  ProductSortOption,
} from "@/types/product";
import { CommentListResponse } from "@/types/comment";

// 상품 리스트를 가져오는 함수
export const getProducts = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: {
  page: number;
  pageSize: number;
  orderBy: ProductSortOption;
  keyword?: string;
}): Promise<ProductListResponse> => {
  try {
    // keyword가 없으면 params에서 제외
    const params: Record<string, unknown> = { page, pageSize, orderBy };
    if (keyword) params.keyword = keyword;

    const response = await axiosInstance.get<ProductListResponse>("/products", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getProducts API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getProducts 일반 에러:", error.message);
    } else {
      console.error("getProducts 알 수 없는 오류:", error);
    }
    throw error;
  }
};

// 상품 상세 정보를 가져오는 함수
export async function getProductDetail(
  productId: number
): Promise<ProductDetail> {
  if (!productId) {
    throw new Error("유효하지 않은 상품 ID입니다.");
  }

  try {
    const response = await axiosInstance.get<ProductDetail>(
      `/products/${productId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getProductDetail API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getProductDetail 일반 에러:", error.message);
    } else {
      console.error("getProductDetail 알 수 없는 오류:", error);
    }
    throw error;
  }
}

// 상품에 대한 댓글을 가져오는 함수
export async function getProductComments({
  productId,
  limit,
  cursor,
}: {
  productId: number; // 상품 ID는 필수
  limit: number; // 페이지 당 댓글 수는 필수
  cursor?: number | null; // 다음 페이지를 위한 커서는 선택
}): Promise<CommentListResponse> {
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
