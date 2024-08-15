import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { authTokenKey, oneDay } from "./utils/constants";
import { NextResponse } from "next/server";

//shadcdn
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}




export async function rejectUser(request) {
  const response = NextResponse.redirect(new URL(`/autenticacion/inicio?next=${request.nextUrl.pathname}`, request.url));
  response.cookies.delete(authTokenKey);
  return response
}

export function createSlug(text) {
  const prepositions = ['a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'desde', 'durante', 'en', 'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'so', 'sobre', 'tras', 'versus', 'via', 'de', 'del', 'la', 'el', 'en', 'y', 'a'];

  const accentsMap = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ñ': 'n',
    'ü': 'u'
  };

  const removeAccents = (str) => {
    return str.split('').map(char => accentsMap[char] || char).join('');
  };

  return removeAccents(text)
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios en blanco al inicio y al final
    .split(' ') // Dividir el texto en palabras
    .filter(word => !prepositions.includes(word)) // Filtrar las preposiciones
    .join(' ') // Volver a unir las palabras
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres no alfanuméricos, excepto espacios y guiones
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Reemplazar múltiples guiones con uno solo
}

export function formatDate(fecha) {
  const date = new Date(fecha)
  let año = date.getFullYear();
  let mes = (date.getMonth() + 1).toString().padStart(2, '0');
  let dia = date.getDate().toString().padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}

export function formatKeyObject(objeto, prefix) {
  if (!objeto) return null;
  const objectFormated = {};
  Object.keys(objeto).forEach((key) => {
    objectFormated[prefix + "." + key] = objeto[key];
  });
  return objectFormated;
}