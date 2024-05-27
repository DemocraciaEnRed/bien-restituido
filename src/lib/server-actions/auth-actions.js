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
        const user = await res.json();
        if (res.status !== 200) {
            throw new Error(user.message)
        }
        cookies().set(authTokenKey, user.token)
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
        const user = await res.json();
        if (res.status !== 201) {
            throw new Error(user.message);
        }
        return res.status
    } catch (error) {
        return error.message
    }

}; 
