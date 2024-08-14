export async function getProducts({order='', pageSize}) {
  const query = `orderBy=${order}&pageSize=${pageSize}`
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}
