import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export default apiClient;

// TODO: apiClient.interceptors 구현
