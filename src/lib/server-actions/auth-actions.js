'use server'

import { cookies } from "next/headers";
import { authTokenKey } from "../utils/constants";

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
        console.log(error);
        return error.message
    }
    /* */
};

export const register = async (_currentState, formData) => {
    try {
        let email = formData.get('email');
        let password = formData.get('password');
        let res = await fetch(`${baseUrl}/api/auth/register`, {
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
        if (res.status !== 201) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        return res.status
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
        return res
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
        if (res.status !== 201) {
            const error = new Error(data.message);
            error.status = res.status
            throw error
        }
        return res.status
    } catch (error) {
        return error.message
    }

}; 