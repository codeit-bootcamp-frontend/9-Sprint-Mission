export async function getProducts({order='recent', pageSize = 10, page = 1}) {
  const query = `orderBy=${order}&pageSize=${pageSize}&page=${page}`
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}
