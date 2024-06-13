import { NextResponse } from 'next/server';
import { authTokenKey, userRoles } from './lib/utils/constants';

const baseUrl = process.env.NEXT_PUBLIC_URL_APP;

export async function middleware(request) {
    const token = request.cookies.get(authTokenKey)?.value;
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
    }

    if (token) {
        try {
					if (request.nextUrl.pathname.startsWith('/autenticacion')) {
						return NextResponse.redirect(new URL('/', request.url));
					}
					if (request.nextUrl.pathname.startsWith('/admin')) {
						const userRole = await verifyToken(token);
						if (userRole !== userRoles.ADMIN) return NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
					} else {
						if (!request.nextUrl.pathname.startsWith('/favicon')) {

							const userExist = await verifyUserExists(token)
							if (!userExist) {
								const response = NextResponse.redirect(new URL('/', request.url));
								response.cookies.delete(authTokenKey)
								return response

							}
						}
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

async function verifyUserExists(token) {
	try {
		const response = await fetch(`${baseUrl}/api/user/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
		});


		const data = await response.json();
		return data.user
	} catch (error) {
		console.log(error);
	}

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};