import { AxiosInstance } from "../../axiosConfig";

export const AddUsulan = async (data) => {
  try {
    const response = await AxiosInstance.post("/usulan", {
      data
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataUsulan = async (date, status) => {
  try {
    const response = await AxiosInstance.post("/data/usulan", { date, status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusUsulan = async (id, data) => {
  try {
    const response = await AxiosInstance.put(`/usulan/${id}`, { status: data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNamaBarangUsulan = async (id, data) => {
  try {
    const response = await AxiosInstance.put(`/nama/usulan/${id}`, {
      namaBarang: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const HandledeleteUsulan = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/usulan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReportUsulan = async (id) => {
  try {
    const response = await AxiosInstance.get(`/usulan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
