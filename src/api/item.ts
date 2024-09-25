// src/api/item.ts
import axiosInstance from "./axiosConfig";

export async function getProducts(params = {}) {
  try {
    const response = await axiosInstance.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductDetail(productId: unknown) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
}

export async function getProductComments({
  productId,
  params,
}: {
  productId: number;
  params: unknown;
}) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await axiosInstance.get(
      `/products/${productId}/comments`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product comments:", error);
    throw error;
  }
}
