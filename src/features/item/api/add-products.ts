import ApiInstance from "../../../shared/api/base";
import { ProductFormData } from "../types/add-item-form";

const addProducts = async (formData: ProductFormData) => {
  try {
    const response = await ApiInstance.post("/products", formData);
    alert("상품이 등록되었습니다!");
    return response.data;
  } catch (error) {
    console.error("Error registering item:", error);
    alert("상품 등록에 실패했습니다.");
    return null;
  }
};

export default addProducts;
