import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, model = 'gpt-4' } = body;
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Simulation d'une réponse IA
    const responses = [
      `Voici le code pour "${message}":\n\n\`\`\`jsx\nimport React from 'react';\n\nconst App = () => {\n  return (\n    <div className="min-h-screen bg-gray-100">\n      <h1 className="text-3xl font-bold text-center py-8">\n        Application générée par IA\n      </h1>\n    </div>\n  );\n};\n\nexport default App;\n\`\`\`\n\nCette application utilise React avec Tailwind CSS. Voulez-vous que je l'améliore ?`,
      `Parfait ! Je vais créer une application complète pour "${message}". Voici le code :\n\n\`\`\`tsx\nimport { useState } from 'react';\n\ninterface Props {\n  title: string;\n}\n\nconst Component = ({ title }: Props) => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="p-6">\n      <h2 className="text-2xl font-bold mb-4">{title}</h2>\n      <button \n        onClick={() => setCount(count + 1)}\n        className="bg-blue-500 text-white px-4 py-2 rounded"\n      >\n        Compteur: {count}\n      </button>\n    </div>\n  );\n};\n\nexport default Component;\n\`\`\`\n\nVoulez-vous que j'ajoute des fonctionnalités spécifiques ?`,
      `Excellente idée ! Voici une implémentation moderne pour "${message}":\n\n\`\`\`jsx\nimport React, { useEffect, useState } from 'react';\n\nconst ModernApp = () => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // Simulation d'un appel API\n    setTimeout(() => {\n      setData({ message: 'Données chargées !' });\n      setLoading(false);\n    }, 1000);\n  }, []);\n\n  if (loading) {\n    return <div className="flex justify-center p-8">Chargement...</div>;\n  }\n\n  return (\n    <div className="max-w-4xl mx-auto p-6">\n      <h1 className="text-4xl font-bold mb-6">Application Moderne</h1>\n      <p className="text-gray-600">{data?.message}</p>\n    </div>\n  );\n};\n\nexport default ModernApp;\n\`\`\`\n\nCette version inclut la gestion d'état et les effets. Que souhaitez-vous ajouter ?`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return NextResponse.json({
      success: true,
      data: {
        message: randomResponse,
        model,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Ajouter un système d\'authentification',
          'Intégrer une base de données',
          'Ajouter des animations',
          'Créer une version mobile'
        ]
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
