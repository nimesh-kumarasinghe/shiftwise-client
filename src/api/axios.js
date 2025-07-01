import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5204/api', // your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
