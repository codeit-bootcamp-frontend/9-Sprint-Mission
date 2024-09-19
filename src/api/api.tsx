import axios from "axios"

interface IParams {
  page?: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

interface IList {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string;
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

interface IApiResponse {
  totalCount: number;
  list: IList[];
}

// 상품 가져오는 함수
export const getProducts = async ( params: IParams ): Promise<IApiResponse> => {
  try {
    const { page = 1, pageSize, orderBy, keyword = "" } = params;
    const response = await axios.get(`https://panda-market-api.vercel.app/products/?page=${page}&orderBy=${orderBy}&pageSize=${pageSize}&keyword=${keyword}`);

    if (response.status === 200) {
      return response.data as IApiResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("getProducts API에서 API 오류 발생", error);
      throw error;
    } else {
      console.error("getProducts API에서 알 수 없는 오류 발생", error);
      throw error;
    }
  }

  // API 호출 실패 시 기본값 반환
  return {
    totalCount: 0,
    list: []
  };
}
