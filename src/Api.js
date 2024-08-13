export async function getProducts(page, pageSize, order) {
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&order=${order}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
