"use server"
import axiosServices from "@/lib/utils/axios";
import { authTokenKey } from "@/lib/utils/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export const editUser = async (_currentState, formData) => {
    revalidatePath(`/admin/usuarios/[id]`)
    try {
        let username = formData.get('username');
        let bio = formData.get('bio');
        let userId = formData.get('userId');
        let res = await axiosServices.put(`/api/admin/users/${userId}`, JSON.stringify({
                username,
                bio,
        }));
        const { data } = res;
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
        let res = await axiosServices.post(`/api/admin/users/${userId}/force-verify`);
        const { data } = res;
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
        let role = formData.get('role');
        let userId = formData.get('userId');
        let res = await axiosServices.put(`/api/admin/users/${userId}/role`, JSON.stringify({
                role
        }));
        const { data } = res;
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
        let userId = formData.get('userId');
        let email = formData.get('email');
        let forceVerified = formData.get('forceVerified') == 'on'
        let res = await axiosServices.put(`/api/admin/users/${userId}/email`, JSON.stringify({
                email,
                forceVerified,
        }));
        const { data } = res;
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
        let userId = formData.get('userId');
        let password = formData.get('password');
        let forceVerified = formData.get('forceVerified') == 'on'
        let res = await axiosServices.put(`/api/admin/users/${userId}/password`, JSON.stringify({
                password,
                forceVerified,
        }));
        const { data } = res;
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

export const changeUserMeData = async (_currentState, formData) => {
    try {
        let userId = formData.get('userId');
        let currentPassword = formData.get('currentPassword');
        let newPassword = formData.get('newPassword');
        let confirmPassword = formData.get('confirmPassword');
        let username = formData.get('username')
        let email = formData.get('email')

        const body = {
            username,
            email
        }

        if (currentPassword && newPassword && confirmPassword) {
            body.currentPassword = currentPassword
            body.newPassword = newPassword
            body.confirmPassword = confirmPassword
        }

        let res = await axiosServices.put(`/api/users/me`, JSON.stringify(body));
        const { data } = res;
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