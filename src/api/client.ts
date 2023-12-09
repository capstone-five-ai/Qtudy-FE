import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.BASE_URL}`,
});

export default apiClient;

// TODO: apiClient.interceptors 구현
