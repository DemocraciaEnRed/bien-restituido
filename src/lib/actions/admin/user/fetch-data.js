"use server"
import axiosServices from "@/lib/utils/axios";
import { authTokenKey } from "@/lib/utils/constants";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export const fetchUsers = async () => {
    const token = cookies().get(authTokenKey)
    try {
        if (token) {
            let res = await axiosServices.get(`/api/admin/users`);
            const { data } = res;
            if (res.status !== 200) {
                const error = new Error(data.message);
                error.status = res.status
                throw error
            }
            return data.users
        }
        return null
    } catch (error) {
        console.error(error);
    }
}


export const fetchUserById = async (id) => {
    const token = cookies().get(authTokenKey)
    try {
        if (token) {
            let res = await axiosServices.get(`/api/admin/users/${id}`);
            const { data } = res;
            if (res.status !== 200) {
                const error = new Error(data.message);
                error.status = res.status
                throw error
            }
            return data
        }
        return null
    } catch (error) {
        return error
    }
}