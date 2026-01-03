
import axios from 'axios';

const api = axios.create({
  // Use process.env instead of import.meta.env to resolve Property 'env' does not exist on type 'ImportMeta' error
  baseURL: process.env.VITE_API_BASE_URL || 'https://api.eduquest.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '#/login';
    }
    return Promise.reject(error);
  }
);

export default api;
