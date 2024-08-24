const BASEURL = "https://panda-market-api.vercel.app";

export async function getProducts({
  order = "recent",
  page = 1,
  pageSize = 10,
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${order}`;
  const response = await fetch(`${BASEURL}/products?${query}`);

  const data = await response.json();
  return data;
}

//제품 아이디
export async function getProduct(id = 1) {
  const response = await fetch(`${BASEURL}/products/${id}`);

  const data = await response.json();
  return data;
}

//제품 아이디에 대한 코멘트
export async function getProductComents({ itemId = 1, limit = 1 }) {
  const response = await fetch(
    `${BASEURL}/products/${itemId}/comments?limit=${limit}`
  );
  const data = await response.json();
  return data;
}
