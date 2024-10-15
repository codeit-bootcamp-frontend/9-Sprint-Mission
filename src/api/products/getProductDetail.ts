import axiosInstance from "../axiosConfig";
import { AxiosError } from "axios";
import { ProductDetail } from "@/types/product";

export async function getProductDetail(
  productId: number
): Promise<ProductDetail> {
  if (!productId) {
    throw new Error("Invalid product ID");
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
