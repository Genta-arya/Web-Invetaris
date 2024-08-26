import axios from "axios";

export const AxiosInstance = axios.create({
    // baseURL: "http://localhost:5001/api/v1",
    baseURL: "https://server-inventaris.vercel.app/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});