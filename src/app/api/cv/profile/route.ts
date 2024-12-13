import { NextResponse } from 'next/server';
import { getResumeData, writeResumeData } from '../utils';

// GET /api/cv/profile?locale=es
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const data = await getResumeData(locale);
    return NextResponse.json(data.Profile);
  } catch (error) {
    console.error('Error in GET /api/cv/profile:', error);
    return NextResponse.json({ error: 'Error loading profile data' }, { status: 500 });
  }
}

// POST /api/cv/profile?locale=es
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Add new profile
    data.Profile.profiles.push(body);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Profile);
  } catch (error) {
    return NextResponse.json({ error: 'Error adding profile' }, { status: 500 });
  }
}

// PUT /api/cv/profile?id=1&locale=es
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const profileId = searchParams.get('id');
    const body = await request.json();
    const data = await getResumeData(locale);
    
    // Verificar que el perfil existe
    if (!data.Profile?.profiles) {
      return NextResponse.json({ error: 'Profile structure not found' }, { status: 404 });
    }

    // Buscar el índice del perfil
    const profileIndex = data.Profile.profiles.findIndex(
      (p: any) => p.id === profileId
    );

    // Si no se encuentra el perfil, devolver error
    if (profileIndex === -1) {
      return NextResponse.json(
        { error: `Profile with id ${profileId} not found` },
        { status: 404 }
      );
    }

    // Actualizar el perfil
    data.Profile.profiles[profileIndex] = {
      ...data.Profile.profiles[profileIndex],
      ...body
    };

    // Guardar los cambios
    await writeResumeData(data, locale);
    
    // Devolver el perfil actualizado
    return NextResponse.json(data.Profile.profiles[profileIndex]);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Error updating profile', details: error },
      { status: 500 }
    );
  }
}

// DELETE /api/cv/profile/:id?locale=es
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'es';
    const profileId = searchParams.get('id');
    const data = await getResumeData(locale);
    
    // Remove specific profile
    data.Profile.profiles = data.Profile.profiles.filter((p: any) => p.id !== profileId);
    await writeResumeData(data, locale);
    
    return NextResponse.json(data.Profile);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting profile' }, { status: 500 });
  }
} 