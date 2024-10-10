import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data.message || "로그인 중 오류가 발생했습니다.";
    return Promise.reject(new Error(errorMessage)); // 에러 메시지를 담아 에러를 전달
  }
);

export default instance;
