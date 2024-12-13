import { promises as fs } from 'fs';
import path from 'path';

// Función auxiliar para leer el archivo JSON
export async function getResumeData(locale: string = 'es') {
  try {
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading resume data:', error);
    throw error;
  }
}

// Función auxiliar para escribir en el archivo JSON
export async function writeResumeData(data: any, locale: string = 'es') {
  try {
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing resume data:', error);
    throw error;
  }
} 