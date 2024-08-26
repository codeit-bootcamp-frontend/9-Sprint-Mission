import axios from "axios";

const isntance = axios.create({
    baseURL: "https://panda-market-api.vercel.app",
    timeout: 3000,
});

// 상품 목록 조회
export const getProducts = async (params) => {
    const response = await isntance
        .get(`/products`, { params })
        .catch((error) => {
            return error;
        });
    return response.data;
};

// 상품 상세 조회
export const getProduct = async (productId) => {
    const response = await isntance
        .get(`/products/${productId}`)
        .catch((error) => {
            return error;
        });
    return response.data;
};

// 상품 댓글 조회
export const getProductsComments = async (
    productId,
    params = {
        limit: 10,
        cursor: null,
    }
) => {
    const response = await isntance
        .get(`/products/${productId}/comments`, { params })
        .catch((error) => {
            return error;
        });
    return response.data;
};
