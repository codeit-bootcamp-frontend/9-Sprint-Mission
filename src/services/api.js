export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;

  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );

  if (!response.ok) {
    throw new Error("상품을 불러오는데 실패했습니다.");
  }

  const body = await response.json();
  return body;
}
