import { AxiosInstance } from "../../axiosConfig"

export const HandleLogin = async (username,password) => {
    try {
        const response = await AxiosInstance.post("/login",{
            username,
            password
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const CheckLogin = async (token) => {
    try {
        const response = await AxiosInstance.post("/user",{
            token
        })
        return response.data
    } catch (error) {
        throw error
    }
}