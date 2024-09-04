'use server'

import { cookies } from "next/headers";
import { authTokenKey, oneDay } from "../../utils/constants";
import { redirect } from "next/navigation";
import { formDataValidate } from "@/lib/validators/data-validate";
import { loginSchema, registerSchema } from "@/lib/validators/data-validate/auth";
import { createSession, deleteSession } from "@/lib/utils/sessions";
import axiosServices from "@/lib/utils/axios";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export const login = async (_currentState, formData) => {
    let success = false
    try {
        const dataForm = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        await formDataValidate(dataForm, loginSchema)

        const res = await axiosServices.post('/api/auth/login', JSON.stringify(dataForm))
        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        await createSession(data.token)
        success = true
    } catch (error) {
        console.log(error);
        return {
            status: error.status,
            errors: error.message
        }
    } finally {
        if (success) {
            const nextRoute = formData.get('next')
            if (nextRoute) redirect(nextRoute)
            else redirect('/')

        }
    }
};

export const register = async (_currentState, formData) => {
    try {
        const dataForm = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),

        }
        await formDataValidate(dataForm, registerSchema)
        const res = await axiosServices.post('/api/auth/register', JSON.stringify(dataForm))
        const { data } = res;
        if (res.status !== 201) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        return {
            status: error.status,
            errors: error.message
        }
    }

};


export const verifyToken = async (token) => {
    try {
        let res = await axiosServices.get(`/api/auth/verify/${token}`)
        const { data } = res
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        return error
    }
}



export const forgotPassword = async (_currentState, formData) => {
    try {
        let email = formData.get('email');
        let res = await axiosServices.post(`/api/auth/forgot`, JSON.stringify({ email }));
        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        return error.message
    }

};

export const restorePassword = async (_currentState, formData) => {
    try {
        let password = formData.get('password');
        let confirmPassword = formData.get('confirmPassword');
        let token = formData.get('token');
        let res = await axiosServices.post(`/api/auth/reset/${token}`, JSON.stringify({
                password,
                confirmPassword
            }),
        );

        const { data } = res;
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        data.status = res.status
        return data
    } catch (error) {
        return {
            status: error.status,
            message: error.message
        }
    }

};



export const userMe = async () => {
    const token = cookies().get(authTokenKey)
    try {
        if (token) {
            let res = await axiosServices.get(`/api/user/me`,);
            const { data } = res;
            if (res.status !== 200) {
                const error = new Error(data.message);
                error.status = res.status
                throw error
            }
            return data.user
        }
        return null
    } catch (error) {
        return JSON.parse(JSON.stringify(error))
    }
}

export const refreshToken = async () => {
    const token = cookies().get(authTokenKey)
    try {
        let res = await axiosServices.post('/api/auth/refresh-token');
        const { data } = res
        return data
    } catch (err) {
        deleteSession()
    }

}


