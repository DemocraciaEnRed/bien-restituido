import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { authTokenKey, oneDay } from "./utils/constants";
import { NextResponse } from "next/server";

//shadcdn
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function objectToQueryString(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value !== null && value !== undefined) // Filtrar null y undefined
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
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


export function jsonToCsv(jsonData) {
  const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
  let keys = []
  data.forEach(element => {
    Object.keys(element).forEach(key => { if (!keys.includes(key)) keys.push(key) })
  })
  const csvHeader = keys.join(',') + '\n';
  const csvRows = data.map(row => {
    return keys.map(key => {
      const value = String(row[key]).replace(/"/g, '""');
      return `"${value}"`;
    }).join(',');
  }).join('\n');
  const csvContent = csvHeader + csvRows;
  return csvContent;
}