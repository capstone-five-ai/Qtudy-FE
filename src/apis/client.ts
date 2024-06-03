import { postUpdateToken } from '@/apis/authApi';
import axios, { InternalAxiosRequestConfig } from 'axios';

export const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export const noAuthClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export const refreshApiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

authClient.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return request;
});

authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const response = await postUpdateToken();
        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return await axios(originRequest);
        }
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);
