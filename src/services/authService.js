import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'default_jwt_secret';
const TOKEN_EXPIRY = import.meta.env.VITE_TOKEN_EXPIRY || 3600;

const TOKEN_KEY = 'metarealfi_token';

// Configure axios defaults
const api = axios.create({
  baseURL: API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token (if you have refresh token functionality)
        // const refreshToken = localStorage.getItem('refresh_token');
        // const response = await api.post('/auth/refresh', { refreshToken });
        // localStorage.setItem(TOKEN_KEY, response.data.token);
        // originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
        // return api(originalRequest);
        
        // For now, just logout on 401
        logout();
        window.location.href = '/login';
      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth functions
const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      return response.data;
    }
    return null;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

const logout = () => {
  // Clear the auth token
  localStorage.removeItem(TOKEN_KEY);
  
  // Clear any other auth-related data
  localStorage.removeItem('metarealfi_user');
  localStorage.removeItem('metarealfi_email');
  
  // Optional: Clear remember me preference if you want to force login credentials re-entry
  // localStorage.removeItem('metarealfi_remember');
  
  // Return true to indicate successful logout
  return true;
};


// Add a function to get the auth header
const getAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Update the getCurrentUser function to properly decode JWT
const getCurrentUser = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  
  try {
    // Simple JWT decode (not secure, just for demo)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// Add this function to your authService.js file

// Request password reset
const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Password reset request failed' };
  }
};

// Reset password with token
const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Password reset failed' };
  }
};

// Add these functions to your exported object
// Add Google authentication functions
const loginWithGoogle = async (credential) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, { credential });
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem('metarealfi_user', JSON.stringify(response.data.user));
      return response.data;
    }
    return null;
  } catch (error) {
    throw error.response?.data || { message: 'Google login failed' };
  }
};

// Update authService export
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  requestPasswordReset,
  resetPassword,
  api,
  loginWithGoogle,
  GoogleOAuthProvider,
  GoogleLogin
};

export default authService;