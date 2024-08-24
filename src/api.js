import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

export const getProducts = async (
  pageSize = 10,
  page = 1,
  orderBy = "recent"
) => {
  try {
    const response = await instance.get("/products", {
      params: { pageSize, page, orderBy },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductDetail = async (productId) => {
  // 실제 API 호출 부분, 예시로 아래와 같이 작성할 수 있습니다.
  const response = await instance.get(`/products/${productId}`);
  return response.data;
};

export const getProductComment = async (productId) => {
  const response = await instance.get(`/products/${productId}/comments`);
  return response.data;
};

export default instance;
