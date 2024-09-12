import ApiInstance from "./base";
import { ProductCommentsParams } from "../types/product-comments-params";
import { CommentsResponse } from "../types/comment"; // CommentsResponse 가져오기

// 상품 댓글 가져오기
async function getProductComments(
  productId: number,
  params: ProductCommentsParams
): Promise<CommentsResponse> {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    if (!params.cursor) {
      params.cursor = 0;
    }
    const query = `limit=${params.limit}&cursor=${params.cursor}`;
    const response = await ApiInstance.get<CommentsResponse>(
      `/products/${productId}/comments?${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product comments:", error);
    throw error;
  }
}

// 게시글 댓글 가져오기
async function getArticleComments(
  articleId: number,
  params: ProductCommentsParams
): Promise<CommentsResponse> {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    if (!params.cursor) {
      params.cursor = 0;
    }
    const query = `limit=${params.limit}&cursor=${params.cursor}`;
    const response = await ApiInstance.get<CommentsResponse>(
      `/articles/${articleId}/comments?${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article comments:", error);
    throw error;
  }
}

export { getProductComments, getArticleComments };
