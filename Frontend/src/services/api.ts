import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api'
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> =>
    api.post('/auth/login', credentials).then(res => res.data),

  register: (data: RegisterData): Promise<AuthResponse> =>
    api.post('/auth/register', data).then(res => res.data),

  forgotPassword: (email: string): Promise<AuthResponse> =>
    api.post('/auth/forgot-password', { email }).then(res => res.data),

  resetPassword: (token: string, password: string): Promise<AuthResponse> =>
    api.post(`/auth/reset-password/${token}`, { password }).then(res => res.data),

  getProfile: (): Promise<AuthResponse> =>
    api.get('/auth/profile').then(res => res.data)
};

export default api;