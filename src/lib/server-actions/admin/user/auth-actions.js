'use server'

import { cookies } from "next/headers";
import { authTokenKey, oneDay } from "../../../utils/constants";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP
const secret = process.env.JWT_SECRET


export const decrypt = async (input) => {
    try {
        const { payload } = await jwtVerify(input, new TextEncoder().encode(secret), { algorithms: ['HS256'] })
        return payload
    } catch (err) {
        signOut()
        console.error(err);
    }
}

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
        const expires = new Date(Date.now() + oneDay * 2)
        cookies().set(authTokenKey, data.token, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
    } catch (error) {
        return {
            status: error.status,
            message: error.message
        }
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



export const userMe = async () => {
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
        return JSON.parse(JSON.stringify(error))
    }
}

export const refreshToken = async () => {
    try {
        const token = cookies().get(authTokenKey)
        let res = await fetch(`${baseUrl}/api/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token.value}`
            },

        });
        const data = await res.json();
        return data
    } catch (err) {
        signOut()
    }

}

export const signOut = async () => {
    cookies().set(authTokenKey, '', { maxAge: 0 })
}


export async function getSession() {
    const session = cookies().get(authTokenKey)?.value;
    if (!session) return null
    const session1 = await decrypt(session)
    return session1
}