import axios from "axios";

// api instance
export const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  timeout: 3000,
});
