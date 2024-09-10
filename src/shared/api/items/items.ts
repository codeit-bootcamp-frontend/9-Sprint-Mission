import ApiInstance from "../base";

const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await ApiInstance.get(`/products?${query}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

const getProductDetail = async (productId: number) => {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await ApiInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
};

export { getProducts, getProductDetail };
