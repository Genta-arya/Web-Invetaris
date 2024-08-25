import { AxiosInstance } from "../../axiosConfig";

export const getAllInventaris = async () => {
  try {
    const response = await AxiosInstance.get("/inventaris");
    return response.data;
  } catch (error) {
    throw error;
  }
};
