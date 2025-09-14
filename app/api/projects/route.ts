import { NextRequest, NextResponse } from 'next/server';

// Simulation d'une base de données en mémoire
let projects: any[] = [
  {
    id: '1',
    name: 'Mon Premier Projet',
    description: 'Application web générée avec IA',
    files: {
      'package.json': '{"name": "my-app", "version": "1.0.0"}',
      'src/App.tsx': 'import React from "react";\n\nexport default function App() {\n  return <div>Hello World</div>;\n}'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    projects: projects
  });
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, files } = await request.json();

    const newProject = {
      id: Date.now().toString(),
      name: name || 'Nouveau Projet',
      description: description || 'Projet généré avec IA',
      files: files || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);

    return NextResponse.json({
      success: true,
      project: newProject
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
