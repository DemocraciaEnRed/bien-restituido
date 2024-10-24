import { NextResponse } from 'next/server';
import { authTokenKey, userRoles } from './lib/utils/constants';
import { decrypt, rejectUser, updateSession } from './lib/utils/sessions';

const baseUrl = process.env.NEXT_PUBLIC_URL_APP;

export async function middleware(request) {

	let token = request.cookies.get(authTokenKey)?.value;
	if (!token && request.nextUrl.pathname.startsWith('/admin')) {
		return rejectUser(request)
	}
	if (token) {
		const user = await decrypt(token)
		try {
					if (request.nextUrl.pathname.startsWith('/autenticacion')) {
						return Response.redirect(new URL('/', request.url));
					}
			// if (![userRoles.ADMIN, userRoles.GESTOR].includes(user.role) && request.nextUrl.pathname.startsWith('/admin')) {
			// 	return await rejectUser(request)
			// }

			switch (user.role) {
				case userRoles.ADMIN:
					return NextResponse.next()
				case userRoles.GESTOR:
					if (
						request.nextUrl.pathname.startsWith('/admin/configuracion') ||
						request.nextUrl.pathname.startsWith('/admin/usuarios'))
						return Response.redirect(new URL('/admin/bien', request.url))
					break
				default:
					if (request.nextUrl.pathname.startsWith('/admin')) {
						return await rejectUser(request)
					}
			}
		} catch (error) {
			return await rejectUser(request)
		}
		return await updateSession(request)
	}
}


export const config = {
	matcher: "/((?!api|static|.*\\..*|_next).*)",
};