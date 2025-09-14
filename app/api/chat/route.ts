import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
});

export async function POST(request: NextRequest) {
  try {
    const { message, context = '' } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Tu es un assistant IA spécialisé dans le développement d'applications web. 
          
          Tu aides les utilisateurs à :
          - Créer des applications web modernes
          - Résoudre des problèmes de code
          - Améliorer des fonctionnalités existantes
          - Expliquer des concepts de développement
          
          Contexte du projet : ${context}
          
          Réponds de manière claire, concise et pratique. Si l'utilisateur demande des modifications de code, fournis du code complet et fonctionnel.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
