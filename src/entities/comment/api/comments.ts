import ApiInstance from "../../../shared/api/base";
import { ProductCommentsParams } from "../types/product-comments-params.types";

async function getProductComments(
  productId: number,
  params: ProductCommentsParams
) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const query = new URLSearchParams({
      limit: params.limit.toString(),
      cursor: params.cursor.toString(),
    }).toString();

    const response = await ApiInstance.get(
      `/products/${productId}/comments?${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product comments:", error);
    throw error;
  }
}

export { getProductComments };
