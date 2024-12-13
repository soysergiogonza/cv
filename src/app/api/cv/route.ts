import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Función auxiliar para leer el archivo JSON
async function getResumeData(locale: string = 'es') {
  const filePath = path.join(process.cwd(), 'src/data', `resume-${locale}.json`);
  const fileData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileData);
}

// Función auxiliar para escribir en el archivo JSON
async function writeResumeData(data: any, locale: string = 'es') {
  const filePath = path.join(process.cwd(), 'src/data', `resume-${locale}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// GET /api/cv?locale=es
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const data = await getResumeData(locale);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error loading CV data' }, { status: 500 });
  }
}

// POST /api/cv?locale=es
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Merge new data with existing data
    const updatedData = { ...data, ...body };
    await writeResumeData(updatedData, locale);
    
    return NextResponse.json(updatedData);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating CV data' }, { status: 500 });
  }
} 