import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectType = 'web-app' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Génération du code avec GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Tu es un expert développeur full-stack. Crée une application web complète basée sur le prompt utilisateur.
          
          Règles importantes :
          - Utilise React avec TypeScript
          - Utilise Tailwind CSS pour le styling
          - Crée des composants modulaires et réutilisables
          - Inclus la gestion d'état avec useState/useEffect
          - Ajoute des animations avec Framer Motion
          - Crée une interface moderne et responsive
          - Inclus des fonctionnalités interactives
          
          Retourne le code sous forme de fichiers JSON avec cette structure :
          {
            "files": {
              "package.json": "contenu du fichier",
              "src/App.tsx": "contenu du fichier",
              "src/components/Header.tsx": "contenu du fichier",
              "src/styles/globals.css": "contenu du fichier"
            },
            "description": "Description de l'application créée",
            "features": ["feature1", "feature2", "feature3"]
          }`
        },
        {
          role: "user",
          content: `Crée une application web basée sur ce prompt : "${prompt}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse la réponse JSON
    let generatedCode;
    try {
      generatedCode = JSON.parse(response);
    } catch (error) {
      // Si ce n'est pas du JSON valide, créer une structure par défaut
      generatedCode = {
        files: {
          "package.json": JSON.stringify({
            name: "generated-app",
            version: "1.0.0",
            dependencies: {
              "react": "^18.0.0",
              "react-dom": "^18.0.0",
              "typescript": "^4.9.0",
              "tailwindcss": "^3.0.0",
              "framer-motion": "^10.0.0"
            }
          }, null, 2),
          "src/App.tsx": `import React from 'react';
import './styles/globals.css';

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
        description: `Application générée basée sur : ${prompt}`,
        features: ["Interface moderne", "Responsive design", "Animations fluides"]
      };
    }

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
