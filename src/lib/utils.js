import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { authTokenKey, oneDay } from "./utils/constants";
import { refreshToken } from "./server-actions/admin/user/auth-actions";
import { NextResponse } from "next/server";

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
    console.error(err);
  }
}


export async function rejectUser(request) {
  const response = NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
  response.cookies.delete(authTokenKey);
  return response
}

export function createSlug(text) {
  const prepositions = ['a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'desde', 'durante', 'en', 'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'so', 'sobre', 'tras', 'versus', 'via', 'de', 'del', 'la', 'el', 'en', 'y', 'a'];

  return text
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios en blanco al inicio y al final
    .split(' ') // Dividir el texto en palabras
    .filter(word => !prepositions.includes(word)) // Filtrar las preposiciones
    .join(' ') // Volver a unir las palabras
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres no alfanuméricos, excepto espacios y guiones
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Reemplazar múltiples guiones con uno solo
}