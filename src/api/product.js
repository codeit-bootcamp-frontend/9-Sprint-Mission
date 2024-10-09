import { instance } from "./api";

// 상품 목록 조회
export const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = null,
}) => {
  const response = await instance
    .get(`/products`, { params: { page, pageSize, orderBy, keyword } })
    .then((res) => {
      return res.data?.list || [];
    })
    .catch((error) => {
      throw error;
    });
  return response;
};
