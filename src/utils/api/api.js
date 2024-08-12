import axios from "axios";

const isntance = axios.create({
    baseURL: "https://panda-market-api.vercel.app",
    timeout: 3000,
});

export const getProduct = async (params) => {
    const response = await isntance
        .get(`/products`, { params })
        .catch((error) => {
            return error;
        });
    return response.data;
};
