export async function getPandaMarket({ order, limit, page }) {
  try {
    const query = `order=${order}&limit=${limit}&page=${page}`;
    const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다');
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}
