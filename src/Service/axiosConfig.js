import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOCAL_URL = "http://localhost:5001/api/v1";

export const AxiosInstance = axios.create({
  baseURL: LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan Authorization header
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
