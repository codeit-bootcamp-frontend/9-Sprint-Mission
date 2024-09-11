import axios from "axios"

// 상품 가져오는 함수
export const getProducts = async ({ params }) => {
  try {
    const { page = 1, pageSize, order, keyword = "" } = params;
    const response = await axios.get(`https://panda-market-api.vercel.app/products/?page=${page}&orderBy=${order}&pageSize=${pageSize}&keyword=${keyword}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("getProducts API에서 오류 발생", error);
      throw error;
    }
  }
}
