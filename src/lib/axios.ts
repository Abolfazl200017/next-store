import axios from 'axios';
import { redirect } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com/';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    // Handle 401 errors and token refresh
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const refreshToken = localStorage.getItem('refreshToken');
    //     const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
    //     const { token } = response.data;
        
    //     localStorage.setItem('token', token);
    //     originalRequest.headers.Authorization = `Bearer ${token}`;
        
    //     return axiosInstance(originalRequest);
    //   } catch (error) {
    //     // Handle refresh token failure (e.g., logout user)
    //     return Promise.reject(error);
    //   }
    // }

    if (error.response?.status >= 500 || error.response?.status === 0)
      redirect('/server-error');
    
    return Promise.reject(error);
  }
);

export default axiosInstance;