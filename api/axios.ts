import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 클라이언트 환경에서만 실행되는 조건
if (typeof window !== "undefined") {
  // Axios 인터셉터를 사용한 전역 설정
  // 여러 API 호출에서 동일하게 Authorization 헤더를 설정해야 한다면, Axios 인터셉터를 사용해 전역 설정을 할 수 있다.
  instance.interceptors.request.use(
    (config) => {
      // 토큰을 로컬스토리지에서 가져오기
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (token) {
        // 헤더에 토큰 추가
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default instance;
