import { AxiosInstance } from "../../axiosConfig";

export const addRuangan = async (nama, kodeRuang) => {
  try {
    const response = await AxiosInstance.post("/ruangan", {
      namaRuangan: nama,
      kode: kodeRuang,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRuangan = async () => {
  try {
    const response = await AxiosInstance.get("/ruangan");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNamaRuangan = async (id, nama, kode) => {
  try {
    const response = await AxiosInstance.put(`/ruangan/${id}`, {
      nama: nama,
      kode: kode,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteRuangan = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/ruangan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleRuangan = async (id) => {
  try {
    const response = await AxiosInstance.get(`/ruangan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReportKir = async (id) => {
  try {
    const response = await AxiosInstance.get(`/report/kir/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
