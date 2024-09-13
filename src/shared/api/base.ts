import Axios from "axios";

export const API_URL = "https://panda-market-api.vercel.app";

const ApiInstance = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
ApiInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

ApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 응답 시 토큰 갱신 시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // refreshToken을 사용해 새로운 accessToken 요청
          const response = await ApiInstance.post("/auth/refresh-token", {
            refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          sessionStorage.setItem("accessToken", newAccessToken);

          // 새로운 accessToken으로 요청 다시 시도
          ApiInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return ApiInstance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default ApiInstance;
