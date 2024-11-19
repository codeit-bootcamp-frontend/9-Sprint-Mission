import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const tokenResponse = await axios.post("/api/auth/refresh", { refreshToken });
        const { accessToken } = tokenResponse.data;

        Cookies.set("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return instance.request(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
