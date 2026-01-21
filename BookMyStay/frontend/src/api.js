// api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:2323/api",
  withCredentials: true, // keep cookies if backend uses them too
});

// Interceptor to add Authorization header automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
