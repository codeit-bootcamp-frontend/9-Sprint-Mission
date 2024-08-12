export async function getPandaMarket({ orderBy, pageSize }) {
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?orderBy=${orderBy}&pageSize=${pageSize}`,
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}
