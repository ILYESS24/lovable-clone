import { NextRequest, NextResponse } from 'next/server';

// Mock data pour les projets
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Plateforme de vente en ligne complète',
    status: 'active',
    template: 'ecommerce',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tech: ['React', 'Node.js', 'PostgreSQL'],
    progress: 85
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Application de gestion de tâches avec équipes',
    status: 'deployed',
    template: 'productivity',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    progress: 100
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let projects = mockProjects;
    
    if (status) {
      projects = projects.filter(project => project.status === status);
    }
    
    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, template } = body;
    
    if (!name || !description || !template) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newProject = {
      id: Date.now().toString(),
      name,
      description,
      status: 'draft',
      template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tech: [],
      progress: 0
    };
    
    return NextResponse.json({
      success: true,
      data: newProject
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
