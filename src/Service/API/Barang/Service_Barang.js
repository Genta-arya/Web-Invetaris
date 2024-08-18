import { AxiosInstance } from "../../axiosConfig"




export const PostBarang = async (data) => {
    try {
        const response = await AxiosInstance.post("/barang/upload", data , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const GetBarang = async () => {
    try {
        const response = await AxiosInstance.get("/barang")
        return response.data
    } catch (error) {
        throw error
    }
}

export const DeleteBarang = async (id) => {
    try {
        const response = await AxiosInstance.delete(`/barang/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}