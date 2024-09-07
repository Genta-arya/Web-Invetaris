import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");
export const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // baseURL: "https://server-inventaris.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
