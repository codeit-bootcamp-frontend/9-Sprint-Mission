const BASE_URL = "https://panda-market-api.vercel.app/products";
export async function getProducts(page, pageSize, order) {
  try {
    const response = await fetch(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}&orderBy=${order}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// AddItem 데이터 보내기
export async function createAddItem(formData) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("상품을 등록하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
