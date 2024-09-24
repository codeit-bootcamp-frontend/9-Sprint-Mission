// src/api/axiosConfig.js
import Axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "https://panda-market-api.vercel.app";

const axiosInstance = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 응답 시 토큰 갱신 시도
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          // refreshToken을 사용해 새로운 accessToken 요청
          const response = await axiosInstance.post("/auth/refresh-token", {
            refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          Cookies.set("accessToken", newAccessToken, {
            expires: 1 / 48, // 30분 (1일의 1/48)
            secure: true,
            sameSite: "strict",
          });

          // 새로운 accessToken으로 요청 다시 시도
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("토큰 갱신 오류:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
