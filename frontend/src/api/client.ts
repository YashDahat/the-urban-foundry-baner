import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1' });

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});