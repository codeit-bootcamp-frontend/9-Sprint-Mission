const BASE_URL = 'https://panda-market-api.vercel.app';


export async function getProducts({order='recent', pageSize = 10, page = 1}) {
  const query = `orderBy=${order}&pageSize=${pageSize}&page=${page}`
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data; 
}

export async function getProductByIdComments(id) {
  const response = await fetch(`${BASE_URL}/products/${id}/comments?limit=5`);
  const data = await response.json();
  return data;
}