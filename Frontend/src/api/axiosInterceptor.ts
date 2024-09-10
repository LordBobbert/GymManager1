// File: src/api/axiosInterceptor.ts

import axios from 'axios';
import { refreshToken } from './authApi';

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();  // Send refresh request to renew the token
        return axios(originalRequest);  // Retry the original request
      } catch (err) {
        console.error('Refresh token failed:', err);
      }
    }
    return Promise.reject(error);
  }
);
