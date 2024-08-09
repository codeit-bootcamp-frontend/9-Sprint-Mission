export async function getProducts({pageSize= 5, order=''}) {
  const query = `pageSize=${pageSize}&orderBy=${order}`
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  // const response = await fetch('https://panda-market-api.vercel.app/products');
  const data = await response.json();
  return data;
}
