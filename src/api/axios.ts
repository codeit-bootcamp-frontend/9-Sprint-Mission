import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app", // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    "Content-Type": "application/json", // 기본 헤더 설정
  },
  // withCredentials: true, // Cross Origin에서 쿠키를 보내거나 받을 수 있도록 허용
});

export default instance;
