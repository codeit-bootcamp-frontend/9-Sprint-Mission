import axiosInstance from "../axiosConfig";
import { AxiosError } from "axios";
import { ProductListResponse, ProductSortOption } from "@/types/product";

export async function getProducts({
  page,
  pageSize,
  orderBy,
  keyword,
}: {
  page: number;
  pageSize: number;
  orderBy: ProductSortOption;
  keyword?: string;
}): Promise<ProductListResponse> {
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
}
