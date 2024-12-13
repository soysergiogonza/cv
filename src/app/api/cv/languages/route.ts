import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getResumeData, writeResumeData } from '../utils';

// GET /api/cv/languages?locale=en
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const data = await getResumeData(locale);
    return NextResponse.json(data.Languages);
  } catch (error) {
    return NextResponse.json({ error: 'Error loading languages data' }, { status: 500 });
  }
}

// POST /api/cv/languages?locale=en
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Add new language
    data.Languages.LanguageList.push(body);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Languages);
  } catch (error) {
    return NextResponse.json({ error: 'Error adding language' }, { status: 500 });
  }
}

// PUT /api/cv/languages/:name?locale=en
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const langName = searchParams.get('name');
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Update specific language
    const langIndex = data.Languages.LanguageList.findIndex((lang: any) => lang.name === langName);
    if (langIndex === -1) {
      return NextResponse.json({ error: 'Language not found' }, { status: 404 });
    }
    
    data.Languages.LanguageList[langIndex] = { ...data.Languages.LanguageList[langIndex], ...body };
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Languages);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating language' }, { status: 500 });
  }
}

// DELETE /api/cv/languages/:name?locale=en
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const langName = searchParams.get('name');
    const data = await getResumeData(locale);
    
    // Remove specific language
    data.Languages.LanguageList = data.Languages.LanguageList.filter((lang: any) => lang.name !== langName);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Languages);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting language' }, { status: 500 });
  }
} 