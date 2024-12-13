import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getResumeData, writeResumeData } from '../utils';

// GET /api/cv/education?locale=en
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const data = await getResumeData(locale);
    return NextResponse.json(data.Education);
  } catch (error) {
    return NextResponse.json({ error: 'Error loading education data' }, { status: 500 });
  }
}

// POST /api/cv/education?locale=en
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Add new education
    data.Education.SchoolList.push(body);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Education);
  } catch (error) {
    return NextResponse.json({ error: 'Error adding education' }, { status: 500 });
  }
}

// PUT /api/cv/education/:id?locale=en
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const schoolId = searchParams.get('id');
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Update specific education
    const eduIndex = data.Education.SchoolList.findIndex((edu: any) => edu.school === schoolId);
    if (eduIndex === -1) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }
    
    data.Education.SchoolList[eduIndex] = { ...data.Education.SchoolList[eduIndex], ...body };
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Education);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating education' }, { status: 500 });
  }
}

// DELETE /api/cv/education/:id?locale=en
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const schoolId = searchParams.get('id');
    const data = await getResumeData(locale);
    
    // Remove specific education
    data.Education.SchoolList = data.Education.SchoolList.filter((edu: any) => edu.school !== schoolId);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Education);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting education' }, { status: 500 });
  }
} 