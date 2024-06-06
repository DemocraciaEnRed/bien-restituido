'use server'

import { cookies } from "next/headers";
import { authTokenKey } from "../utils/constants";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export const login = async (_currentState, formData) => {
    try {
        let email = formData.get('email');
        let password = formData.get('password');
        let res = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await res.json();
        if (res.status !== 200) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        cookies().set(authTokenKey, data.token)
    } catch (error) {
        return error.message
    }
    const nextRoute = formData.get('next')
    if (nextRoute) redirect(nextRoute)
    else redirect('/')
};

export const register = async (_currentState, formData) => {
    try {
        let username = formData.get('username')
        let email = formData.get('email');
        let password = formData.get('password');
        let res = await fetch(`${baseUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        const data = await res.json();
        if (res.status !== 201) {
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


export const verifyToken = async (token) => {
    try {
        let res = await fetch(`${baseUrl}/api/auth/verify/${token}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
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
        return error
    }
}



export const forgotPassword = async (_currentState, formData) => {
    try {
        let email = formData.get('email');
        let res = await fetch(`${baseUrl}/api/auth/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
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
        return error.message
    }

};

export const restorePassword = async (_currentState, formData) => {
    try {
        let password = formData.get('password');
        let confirmPassword = formData.get('confirmPassword');
        let token = formData.get('token');
        let res = await fetch(`${baseUrl}/api/auth/reset/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                confirmPassword
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
        return {
            status: error.status,
            message: error.message
        }
    }

};

export const signOut = async () => {
    cookies().delete(authTokenKey)
    redirect('/')
}

export const userMe = async (token) => {
    try {
        const token = cookies().get(authTokenKey)
        if (token) {
            let res = await fetch(`${baseUrl}/api/user/me`, {
                method: "GET",
                cache: 'force-cache',
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
            return data.user
        }
        return null
    } catch (error) {
        return error
    }
}