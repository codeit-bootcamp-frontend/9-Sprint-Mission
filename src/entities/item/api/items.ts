import ApiInstance from "../../../shared/api/base";
import { FetchProductsParams } from "../types/fetch-products-params.types";
import { ProductDetail, ProductResponse } from "../types/product.types"; // ProductResponse 타입 임포트

const getProducts = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: FetchProductsParams): Promise<ProductResponse> => {
  // URLSearchParams에 조건부로 필드를 추가
  const queryParams: Record<string, string> = {
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
  };

  // keyword가 있을 때만 추가
  if (keyword) {
    queryParams.keyword = keyword;
  }

  const query = new URLSearchParams(queryParams).toString();

  try {
    const response = await ApiInstance.get(`/products?${query}`);
    return response.data as ProductResponse; // ProductResponse 타입으로 반환
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await ApiInstance.get(`/products/${productId}`);
    return response.data as ProductDetail; // ProductDetail 타입으로 반환
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
};

export { getProducts, getProductDetail };
