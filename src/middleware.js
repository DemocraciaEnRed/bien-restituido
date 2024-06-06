import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { authTokenKey } from './lib/utils/constants';

const baseUrl = process.env.NEXT_PUBLIC_URL_APP;

export async function middleware(request) {
    const token = request.cookies.get(authTokenKey)?.value;

    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
    }

    if (token) {
        try {
            const userRole = await verifyToken(token);
            if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
                return NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
            }

            if (request.nextUrl.pathname.startsWith('/autenticacion')) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
        }
    }
    return NextResponse.next();
}

async function verifyToken(token) {
    try {
        const response = await fetch(`${baseUrl}/api/user/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        return data.user?.role;
    } catch (error) {
        console.error('Token verification error:', error);
        throw error;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};




/* import { verify } from "jsonwebtoken";
import { authTokenKey } from "./lib/utils/constants"
const baseUrl = process.env.NEXT_PUBLIC_URL_APP


export async function middleware(request) {
    const currentUser = request.cookies.get(authTokenKey)
    if (!currentUser && request.nextUrl.pathname.startsWith('/admin')) {
        return Response.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url))
    }
    if (currentUser && request.nextUrl.pathname.startsWith('/admin')) {
        const userRole = await verifyToken(currentUser.value)
        if (userRole !== 'admin') return Response.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url))
    }

    if (currentUser && request.nextUrl.pathname.startsWith('/autenticacion')) {
        return Response.redirect(new URL('/', request.url))
    }
}

async function verifyToken(token) {

    let res = await fetch(`${baseUrl}/api/user/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await res.json();
    if (data.user) {
        return data.user.role;
    }
    return null;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

 */