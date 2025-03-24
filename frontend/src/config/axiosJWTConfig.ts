import axios from "axios";
import { DOMAIN } from "../apis";

const axiosJWT = axios.create({
    baseURL: `${DOMAIN}`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true, // Giữ nguyên
    timeout: 5000 
});

axiosJWT.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('auth_token');
        
        // Loại bỏ việc slice token nếu không cần thiết
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Nên handle gracefully hơn, không reject ngay
            console.warn('No JWT token found');
            // Hoặc có thể redirect đến trang loginz
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor response để handle token expired
axiosJWT.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token hết hạn, redirect đến login hoặc refresh token
            localStorage.removeItem('auth_token');
            // Ví dụ: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosJWT;