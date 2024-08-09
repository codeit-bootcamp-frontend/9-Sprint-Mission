import ApiInstance from "../base";

export async function getProducts(fetchItems, params = {}) {
  const query = new URLSearchParams(params).toString();

  await ApiInstance.get(`/products?${query}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      fetchItems(response.data.list);
    })
    .catch((error) => {
      console.error("Failed to fetch products:", error);
      throw error;
    });
}
