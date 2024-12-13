import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getResumeData, writeResumeData } from '../utils';

// GET /api/cv/tech-stack?locale=en
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const data = await getResumeData(locale);
    return NextResponse.json(data.TechStack);
  } catch (error) {
    return NextResponse.json({ error: 'Error loading tech stack data' }, { status: 500 });
  }
}

// POST /api/cv/tech-stack?locale=en
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Add new tech
    if (!Array.isArray(data.TechStack)) {
      data.TechStack = [];
    }
    data.TechStack.push(body.tech);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.TechStack);
  } catch (error) {
    return NextResponse.json({ error: 'Error adding tech' }, { status: 500 });
  }
}

// PUT /api/cv/tech-stack/:tech?locale=en
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const oldTech = searchParams.get('tech');
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Update specific tech
    const techIndex = data.TechStack.indexOf(oldTech);
    if (techIndex === -1) {
      return NextResponse.json({ error: 'Tech not found' }, { status: 404 });
    }
    
    data.TechStack[techIndex] = body.tech;
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.TechStack);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating tech' }, { status: 500 });
  }
}

// DELETE /api/cv/tech-stack/:tech?locale=en
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const techToRemove = searchParams.get('tech');
    const data = await getResumeData(locale);
    
    // Remove specific tech
    data.TechStack = data.TechStack.filter((tech: string) => tech !== techToRemove);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.TechStack);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting tech' }, { status: 500 });
  }
} 