const BASE_URL = "https://panda-market-api.vercel.app";

export const getProducts = async ({
  orderBy = "recent",
  currentPage = 1,
  itemCountPerPage = 10,
}) => {
  const query = `?page=${currentPage}&pageSize=${itemCountPerPage}&orderBy=${orderBy}`;
  const response = await fetch(`${BASE_URL}/products${query}`);

  if (!response.ok) {
    throw new Error("전체 상품을 불러오는데 실패했습니다.");
  }

  const data = response.json();
  return data;
};

export const getBestProducts = async (itemCount) => {
  const query = `?page=1&pageSize=${itemCount}&orderBy=favorite`;
  const response = await fetch(`${BASE_URL}/products${query}`);

  if (!response.ok) {
    throw new Error("베스트 상품을 불러오는데 실패했습니다.");
  }

  const data = response.json();
  return data;
};
