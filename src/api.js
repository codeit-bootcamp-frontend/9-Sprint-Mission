export async function getPandaMarket({ pageSize, orderBy }) {
  try {
    const response = await fetch(`https://panda-market-api.vercel.app/products?pageSize=${pageSize}&render=${orderBy}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}
