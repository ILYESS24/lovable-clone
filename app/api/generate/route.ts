import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Template simple pour test
    const generatedCode = {
      files: {
        "package.json": JSON.stringify({
          name: "generated-app",
          version: "1.0.0",
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "typescript": "^4.9.0",
            "tailwindcss": "^3.0.0"
          }
        }, null, 2),
        "src/App.tsx": `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ${prompt}
        </h1>
        <p className="text-gray-600">
          Application générée avec succès !
        </p>
      </div>
    </div>
  );
}

export default App;`,
        "src/styles/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;`
      },
      description: `Application basée sur: ${prompt}`,
      features: ["Interface moderne", "Design responsive", "Animations fluides"]
    };

    return NextResponse.json({
      success: true,
      project: generatedCode,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating application:', error);
    return NextResponse.json(
      { error: 'Failed to generate application' },
      { status: 500 }
    );
  }
}