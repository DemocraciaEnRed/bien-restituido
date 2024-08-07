"use server"
import { SignJWT, jwtVerify } from "jose";
import { authTokenKey, oneDay, userRoles } from "./constants";
import { cookies } from "next/headers";
import { refreshToken } from "../server-actions/authentication/auth-actions";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET

const cookie = {
  name: authTokenKey,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  }
}

export const decrypt = async (input) => {
  try {
    const { payload } = await jwtVerify(input, new TextEncoder().encode(secret), { algorithms: ['HS256'] })
    return payload
  } catch (err) {
    deleteSession()
    console.error(err);
  }
}

export async function createSession(token) {
  const expires = new Date(Date.now() + oneDay * 2)

  cookies().set(cookie.name, token, { ...cookie.options, expires })
}

export async function verifySession() {
  const session = cookies().get(authTokenKey)?.value;
  if (!session) return null
  const session1 = await decrypt(session)
  return session1
}

export async function deleteSession() {
  cookies().set(authTokenKey, '', { maxAge: 0 })
}



export async function isAuthotized() {
  const { role } = await verifySession()
  if (role !== userRoles.ADMIN) throw 'no estas autorizado'
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
    console.error(err);
  }
}
