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

export default instance;
