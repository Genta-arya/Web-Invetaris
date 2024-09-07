import { AxiosInstance } from "../../axiosConfig";

export const HandleLogin = async (username, password) => {
  try {
    const response = await AxiosInstance.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const HandleRegister = async (data) => {
  try {
    const response = await AxiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckLogin = async (token) => {
  try {
    const response = await AxiosInstance.post("/user", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await AxiosInstance.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async (token) => {
  try {
    const response = await AxiosInstance.post("/logout", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
