"use server"
import { authTokenKey } from "@/lib/utils/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export const editUser = async (_currentState, formData) => {
    revalidatePath(`/admin/usuarios/[id]`)

    try {
        const token = cookies().get(authTokenKey)

        let username = formData.get('username');
        let bio = formData.get('bio');
        let userId = formData.get('userId');
        let res = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                username,
                bio,
            }),
        });
        const data = await res.json();
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }
};

export async function verifiedUser(userId) {
    try {
        const token = cookies().get(authTokenKey)
        let res = await fetch(`${baseUrl}/api/admin/users/${userId}/force-verify`, {
            method: "POST",
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
        data.status = res.status
        return data
    } catch (error) {
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }

};



export const changeRoleUser = async (_currentState, formData) => {
    revalidatePath(`/admin/usuarios/[id]`)

    try {
        const token = cookies().get(authTokenKey)
        let role = formData.get('role');
        let userId = formData.get('userId');
        let res = await fetch(`${baseUrl}/api/admin/users/${userId}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                role
            })

        });
        const data = await res.json();
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.error(error);
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }

};

export const changeEmailUser = async (_currentState, formData) => {
    revalidatePath(`/admin/usuarios`, 'page')

    try {
        const token = cookies().get(authTokenKey)
        let userId = formData.get('userId');
        let email = formData.get('email');
        let forceVerified = formData.get('forceVerified') == 'on'
        let res = await fetch(`${baseUrl}/api/admin/users/${userId}/email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                email,
                forceVerified,
            })

        });
        const data = await res.json();
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.error(error);
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }

};

export const changePasswordUser = async (_currentState, formData) => {
    revalidatePath(`/admin/usuarios`, 'page')

    try {
        const token = cookies().get(authTokenKey)
        let userId = formData.get('userId');
        let password = formData.get('password');
        let forceVerified = formData.get('forceVerified') == 'on'
        let res = await fetch(`${baseUrl}/api/admin/users/${userId}/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                password,
                forceVerified,
            })

        });
        const data = await res.json();
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        console.error(error);
        return JSON.stringify({
            status: error.status,
            message: error.message
        })
    }

};