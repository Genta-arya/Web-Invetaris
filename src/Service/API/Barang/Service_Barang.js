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

export const ReturBarang = async (id) => {
  try {
    const response = await AxiosInstance.post(`/retur/barang`, {
      barangId: id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getBarangKeluar = async () => {
  try {
    const response = await AxiosInstance.get("/barang/keluar");
    return response.data;
  } catch (error) {
    throw error;
  }
}