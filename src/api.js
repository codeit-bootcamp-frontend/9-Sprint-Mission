const BASE_URL = "https://panda-market-api.vercel.app";

// 상품 조회하기
export const getPandaMarket = async (params = {}) => {
  // URLSearchParams을 이용하면 파라미터 값을 자동으로 쉽게 인코딩할 수 있다.
  const query = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${BASE_URL}/products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// 상품 등록하기
export const postPandaMarket = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}/products?${query}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const body = await response.json();
  return body;
};
