import Axios from "axios";

export const API_URL = "https://panda-market-api.vercel.app";

const ApiInstance = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiInstance;
