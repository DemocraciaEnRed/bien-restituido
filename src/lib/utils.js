import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
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