"use server"
import { revalidatePath } from "next/cache";
import fetchData from "@/lib/utils/get-data";
import axiosServices from "@/lib/utils/axios";

export const saveAsset = async (formData) => {
    try {
        let res = await axiosServices.post(`/api/asset`, formData);

        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.log(error);

        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }
}

export const editAsset = async (id, formData) => {
    try {
        let res = await axiosServices.put(`/api/asset/${id}`, formData);
        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.log(error);
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }

}




export const archiveAsset = async (id) => {
    revalidatePath(`/admin/bien`)
    return await fetchData(`/api/asset/archive/${id}`)

}


