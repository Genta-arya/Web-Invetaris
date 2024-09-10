import handleError from "../../../Utils/HandleError";
import { AxiosInstance } from "../../axiosConfig";

export const PostBarang = async (data) => {
  console.log(data);
  try {
    const response = await AxiosInstance.post("/barang/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetBarang = async () => {
  try {
    const response = await AxiosInstance.get("/barang");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteBarang = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/barang/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetSingleBarang = async (id) => {
  try {
    const response = await AxiosInstance.get(`/barang/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ReturBarang = async (id, idx, qty) => {
  try {
    const response = await AxiosInstance.post(`/retur/barang`, {
      barangId: id,
      ruangId: idx,
      qty: qty,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBarangKeluar = async (date) => {
  try {
    const response = await AxiosInstance.post("/barang/keluar", { date });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const EditBarang = async (data) => {
  try {
    const response = await AxiosInstance.put(`/barang/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBarangMasuk = async (data) => {
  try {
    const response = await AxiosInstance.post(`/barang/masuk`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBarangMasuk = async (date) => {
  try {
    const response = await AxiosInstance.post("/filter/barang/masuk", { date });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPrintQrCode = async () => {
  try {
    const respose = await AxiosInstance.get("/report/barang/qrcode");
    return respose.data;
  } catch (error) {
    handleError(error);
  }
};


export const getReportBarangKeluar = async () => { 
  try {
    const respose = await AxiosInstance.get("/report/barangkeluar");
    return respose.data;
  } catch (error) {
    handleError(error);
  }
}