import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { refreshToken } from "./server-actions/auth-actions";
import { NextResponse } from "next/server";
import { authTokenKey, oneDay } from "./utils/constants";

//shadcdn
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export async function updateSession(request) {
  try {
    const token = request.cookies.get(authTokenKey)?.value;
    if (!token) return

    const newToken = await refreshToken()
    const res = NextResponse.next()
    const expires = new Date(Date.now() + oneDay * 2)
    res.cookies.set({
      name: authTokenKey,
      value: newToken.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires
    })
    return res
  } catch (err) {
    console.log(err);
  }
}


export async function rejectUser(request) {
  const response = NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
  response.cookies.delete(authTokenKey);
  return response
}
