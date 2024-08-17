const BASEURL = "https://panda-market-api.vercel.app";

export async function getProducts({
  order = "createdAt",
  page = 1,
  pageSize = 10,
}) {
  const query = `orderby=${order}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(`${BASEURL}/products?${query}`);

  if (!response.ok) {
    throw new Error("데이터를 불러오지 못했습니다");
  }
  const data = await response.json();
  return data;
}
