const BASE_URL = "https://panda-market-api.vercel.app";

interface Query {
  order: string;
  pageSize: number;
  page: number
}
export async function getProducts({
  order = "recent",
  pageSize = 10,
  page = 1,
}:Query) {
  const query = `orderBy=${order}&pageSize=${pageSize}&page=${page}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}

export async function getProductById(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}

export async function getProductByIdComments(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}/comments?limit=5`);
  const data = await response.json();
  return data;
}
