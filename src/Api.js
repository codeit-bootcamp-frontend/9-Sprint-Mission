export async function getProducts(page, pageSize, order) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&render=${order}`
  );
  const body = await response.json();
  return body;
}
