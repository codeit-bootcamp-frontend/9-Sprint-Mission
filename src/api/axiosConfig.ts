import Axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = 'https://panda-market-api.vercel.app';

const axiosInstance = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// accessToken을 Authorization 헤더에 자동으로 포함하는 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
