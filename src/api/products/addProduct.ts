import axios from "axios";
import { Product, ProductForm } from "@/types/product";

// 상품 등록하기
export async function addProduct(
  productForm: ProductForm
): Promise<Product | null> {
  try {
    // 이미지가 없으면 빈 문자열로 설정
    if (!productForm.images[0]) productForm.images[0] = "";

    const response = await axios.post("/api/products/addProduct", productForm);

    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.product;
    } else {
      console.error("상품 등록 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("addProduct 일반 에러:", error);
    throw error;
  }
}
