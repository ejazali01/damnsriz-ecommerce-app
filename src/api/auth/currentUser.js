import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Request interceptor to add access token to headers
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle unauthorized (401) responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await handleTokenRefresh();
        return api(originalRequest);
      } catch (refreshError) {
        handleLogout(); // Token refresh failed, log out user
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
});

async function handleTokenRefresh() {
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await api.post('/refresh-token', { refreshToken });
    const { accessToken, newRefreshToken } = response.data;
    setAccessToken(accessToken);
    setRefreshToken(newRefreshToken);
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
}

function handleLogout() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  localStorage.clear(); // Clear other stored data if needed
  window.location.href = '/login'; // Redirect to login page
}

function setAccessToken(token) {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // Store access token in cookies
}

function setRefreshToken(token) {
  Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 30 }); // Store refresh token in cookies
}

export default api;
