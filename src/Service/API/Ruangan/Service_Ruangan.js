import { AxiosInstance } from "../../axiosConfig";

export const addRuangan = async (nama) => {
  try {
    const response = await AxiosInstance.post("/ruangan", {
      namaRuangan: nama,
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

export const updateNamaRuangan = async (id, data) => {
  try {
    const response = await AxiosInstance.put(`/ruangan/${id}`, {
      nama: data,
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
}