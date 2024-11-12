// src/api/axiosConfig.js
import Axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
