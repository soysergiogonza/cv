import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getResumeData, writeResumeData } from '../utils';
import { Job } from '@/types/cv';

// GET /api/cv/experience?locale=en
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const data = await getResumeData(locale);
    return NextResponse.json(data.Experience);
  } catch (error) {
    return NextResponse.json({ error: 'Error loading experience data' }, { status: 500 });
  }
}

// POST /api/cv/experience?locale=en
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Add new job experience
    data.Experience.JobList.push(body);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Experience);
  } catch (error) {
    return NextResponse.json({ error: 'Error adding experience' }, { status: 500 });
  }
}

// PUT /api/cv/experience/:id?locale=es
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const jobId = searchParams.get('id');
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Update specific job using id
    const jobIndex = data.Experience.JobList.findIndex((job: Job) => job.id === jobId);
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    data.Experience.JobList[jobIndex] = { 
      ...data.Experience.JobList[jobIndex],
      ...body,
      id: jobId // Mantener el ID original
    };
    
    await writeResumeData(data, locale);
    return NextResponse.json(data.Experience.JobList[jobIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating job' }, { status: 500 });
  }
}

// DELETE /api/cv/experience/:id?locale=en
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const jobId = searchParams.get('id');
    const data = await getResumeData(locale);
    
    // Remove specific job
    data.Experience.JobList = data.Experience.JobList.filter((job: any) => job.company !== jobId);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Experience);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting experience' }, { status: 500 });
  }
} 