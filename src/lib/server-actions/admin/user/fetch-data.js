"use server"
import { authTokenKey } from "@/lib/utils/constants";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export const fetchUsers = async () => {
    try {
        const token = cookies().get(authTokenKey)
        if (token) {
            let res = await fetch(`${baseUrl}/api/admin/users`, {
                method: "GET",
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token.value}`
                },

            });
            const data = await res.json();
            if (res.status !== 200) {
                const error = new Error(data.message);
                error.status = res.status
                throw error
            }
            return data.users
        }
        return null
    } catch (error) {
        return error
    }
}


export const fetchUserById = async (id) => {
    try {
        const token = cookies().get(authTokenKey)
        if (token) {
            let res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
                method: "GET",
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token.value}`
                },

            });
            const data = await res.json();
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