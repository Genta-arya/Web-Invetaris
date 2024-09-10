import { AxiosInstance } from "../../axiosConfig";



export const getDataDashboard = async () => {
    try {
        const response = await AxiosInstance.get("/dashboard");
        return response.data;
    } catch (error) {
       
        throw error;
    }
}

export const getChartData  = async () => {
    try {
        const response = await AxiosInstance.get("/pengeluaran/tahunan");
        return response.data;
    } catch (error) {
        throw error;
    }
}