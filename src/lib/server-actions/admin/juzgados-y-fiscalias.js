"use server"
import { promises as fs } from 'fs';

export async function getJuzgados() {

  const file = await fs.readFile(process.cwd() + '/src/lib/utils/juzgados.json', 'utf8');
  return file
}


export async function getFiscalias() {

  const file = await fs.readFile(process.cwd() + '/src/lib/utils/fiscalias.json', 'utf8');
  return file
}
