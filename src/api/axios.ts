import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app", // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
});

export default instance;
