import ApiInstance from "../../../shared/api/base";

const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  try {
    return await ApiInstance.get(`/products?${query}`);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export { getProducts };
