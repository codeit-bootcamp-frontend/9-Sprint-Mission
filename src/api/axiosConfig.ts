// src/api/axiosConfig.js
import Axios from "axios";

export const API_URL = "https://panda-market-api.vercel.app";

const axiosInstance = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
