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
			if (user.role !== userRoles.ADMIN && request.nextUrl.pathname.startsWith('/admin')) {
				return await rejectUser(request)
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