import { AxiosInstance } from "../../axiosConfig";

export const getAllInventaris = async () => {
  try {
    const response = await AxiosInstance.get("/inventaris");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReport = async (data) => {
  try {
    const response = await AxiosInstance.post("/report/inventaris", {
      date:data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
