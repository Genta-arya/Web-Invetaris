import { AxiosInstance } from "../../axiosConfig";

export const addPermintaan = async (data) => {
  try {
    const response = await AxiosInstance.post("/permintaan", {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPermintaan = async (date) => {
  try {
    const response = await AxiosInstance.post("/filter/permintaan", { date });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePermintaan = async (id, data) => {
  try {
    const response = await AxiosInstance.put(`/permintaan/${id}`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectPermintaan = async (id) => {
  try {
    const response = await AxiosInstance.put(`/reject/permintaan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
