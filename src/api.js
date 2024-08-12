export async function getProducts({
  order = "createdAt",
  page = 1,
  pageSize = 10,
}) {
  const query = `order=${order}&page=${page}&pageSize=${pageSize}`;
  console.log(query);
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}
