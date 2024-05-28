import { authTokenKey } from "./lib/utils/constants"


export function middleware(request) {
    const currentUser = request.cookies.get(authTokenKey)
    /* if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/dashboard', request.url))
    } */

    if (currentUser && request.nextUrl.pathname.startsWith('/autenticacion')) {
        return Response.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

