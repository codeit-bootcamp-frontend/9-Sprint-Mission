async function getItems({ order = "favorite", page = 1, pageSize = 10 }) {
  const query = `orderBy=${order}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}

export default getItems;
