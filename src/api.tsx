import { CommentData } from "./types/types";
const BASE_URL = "https://panda-market-api.vercel.app";

interface GetProductsParams {
  order: string;
  page: number;
  limit: number;
}

interface GetProductParams {
  id: string;
}

interface GetCommentsParams {
  id: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  favoriteCount: number;
  images: string[];
}

interface ProductsResponse {
  list: Product[];
  totalCount: number;
}

interface CommentsResponse {
  list: CommentData[];
  totalCount: number;
}

export const getProducts = async ({
  order,
  page,
  limit,
}: GetProductsParams): Promise<ProductsResponse> => {
  const query = `orderBy=${order}&page=${page}&pageSize=${limit}`;
  try {
    const response = await fetch(`${BASE_URL}/products?${query}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async ({
  id,
}: GetProductParams): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComments = async ({
  id,
}: GetCommentsParams): Promise<CommentsResponse> => {
  try {
    if (id === undefined || id === null) {
      throw new Error("Invalid ID");
    }

    const response = await fetch(`${BASE_URL}/products/${id}/comments?limit=3`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
