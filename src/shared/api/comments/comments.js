import ApiInstance from "../../../shared/api/base";

async function getProductComments({ productId, params }) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const query = new URLSearchParams(params).toString();
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
