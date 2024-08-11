const BASE_URL = "https://panda-market-api.vercel.app";

export const getProducts = async ({ orderBy = "recent" }) => {
  const query = `?orderBy=${orderBy}`;
  const response = await fetch(`${BASE_URL}/products${query}`);

  if (!response.ok) {
    throw new Error("상품을 불러오는데 실패했습니다.");
  }

  const data = response.json();
  return data;
};
