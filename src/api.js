const BASE_URL = "https://panda-market-api.vercel.app";

export const getProducts = async ({ order, page, limit }) => {
  const query = `orderBy=${order}&page=${page}&pageSize=${limit}`;
  try {
    const response = await fetch(`${BASE_URL}/products?${query}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async ({ id = 0 }) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComment = async ({ id = 0 }) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}/comments?limit=3`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
