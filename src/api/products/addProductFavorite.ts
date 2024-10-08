import axios from "axios";
import { ProductDetail } from "@/types/product";

export async function addProductFavorite(
  productId: number
): Promise<ProductDetail | null> {
  try {
    const response = await axios.post("/api/products/addProductFavorite", {
      productId,
    });
    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.productDetail;
    } else {
      console.error("상품 좋아요 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("addProductFavorite 일반 에러:", error);
    throw error;
  }
}
