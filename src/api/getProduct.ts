import instance from "./axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface fetchDataParams {
  orderBy: string;
  page: number;
  pageSize: number;
}

const getProducts = async (query: fetchDataParams) => {
  try {
    const res = await instance.get(`/products/${query}`);
    if (!res) {
      throw new Error("getProducts 요청에 실패했습니다.");
    }
    return res.data as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export default getProducts;
