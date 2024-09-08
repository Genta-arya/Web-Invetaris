import { AxiosInstance } from "../../axiosConfig";

export const postPeminjaman = async (data) => {
  try {
    const response = await AxiosInstance.post("/peminjaman", {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetPeminjaman = async (date) => {
  try {
    const response = await AxiosInstance.post("/filter/peminjaman", { date });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusPeminjaman = async (data) => {
  try {
    const response = await AxiosInstance.put("/peminjaman", {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const returPeminjmana = async (data) => {
  try {
    const response = await AxiosInstance.put("/retur/peminjaman", {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
