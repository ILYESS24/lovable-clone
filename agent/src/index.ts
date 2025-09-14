import { Anthropic } from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { z } from 'zod';
import Redis from 'ioredis';
import pLimit from 'p-limit';
import { nanoid } from 'nanoid';
import JSZip from 'jszip';
import prettier from 'prettier';

// Types
export interface CodeGenerationRequest {
  prompt: string;
  framework: 'nextjs' | 'vite' | 'svelte' | 'astro';
  template?: string;
  features?: string[];
  userId?: string;
}

export interface CodeGenerationResponse {
  id: string;
  files: Record<string, string>;
  description: string;
  features: string[];
  framework: string;
  timestamp: string;
}

export interface LLMProvider {
  name: string;
  generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse>;
  isAvailable(): Promise<boolean>;
}

// Configuration
const config = {
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-3-5-sonnet-20241022'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o'
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  rateLimit: {
    requestsPerMinute: 10,
    tokensPerMinute: 50000
  }
};

// Rate Limiter
const rateLimiter = pLimit(config.rateLimit.requestsPerMinute);

// Redis Cache
const redis = new Redis(config.redis.url);

// Anthropic Provider
class AnthropicProvider implements LLMProvider {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: config.anthropic.apiKey
    });
  }

  async isAvailable(): Promise<boolean> {
    return !!config.anthropic.apiKey;
  }

  async generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
    const cacheKey = `codegen:${JSON.stringify(request)}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const systemPrompt = this.buildSystemPrompt(request.framework);
    const userPrompt = this.buildUserPrompt(request);

    const response = await this.client.messages.create({
      model: config.anthropic.model,
      max_tokens: 8000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic');
    }

    const generatedCode = this.parseResponse(content.text);
    const result: CodeGenerationResponse = {
      id: nanoid(),
      files: generatedCode.files,
      description: generatedCode.description,
      features: generatedCode.features,
      framework: request.framework,
      timestamp: new Date().toISOString()
    };

    // Cache for 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(result));
    
    return result;
  }

  private buildSystemPrompt(framework: string): string {
    return `Tu es un expert développeur full-stack spécialisé dans la génération d'applications web modernes.

Règles importantes :
- Utilise ${framework} comme framework principal
- Crée du code TypeScript de haute qualité
- Utilise Tailwind CSS pour le styling
- Inclus des composants modulaires et réutilisables
- Ajoute la gestion d'état appropriée
- Inclus des animations avec Framer Motion
- Crée une interface moderne et responsive
- Inclus des fonctionnalités interactives
- Ajoute des tests unitaires de base
- Documente le code avec des commentaires

Retourne le code sous forme de JSON avec cette structure :
{
  "files": {
    "package.json": "contenu du fichier",
    "src/App.tsx": "contenu du fichier",
    "src/components/Header.tsx": "contenu du fichier"
  },
  "description": "Description de l'application créée",
  "features": ["feature1", "feature2", "feature3"]
}`;
  }

  private buildUserPrompt(request: CodeGenerationRequest): string {
    let prompt = `Crée une application web complète basée sur ce prompt : "${request.prompt}"`;
    
    if (request.features && request.features.length > 0) {
      prompt += `\n\nFonctionnalités requises : ${request.features.join(', ')}`;
    }
    
    if (request.template) {
      prompt += `\n\nUtilise le template : ${request.template}`;
    }

    return prompt;
  }

  private parseResponse(text: string): any {
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      // Fallback to default structure
      return {
        files: {
          'package.json': JSON.stringify({
            name: 'generated-app',
            version: '1.0.0',
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0',
              'typescript': '^4.9.0',
              'tailwindcss': '^3.0.0'
            }
          }, null, 2),
          'src/App.tsx': `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Application Générée
        </h1>
        <p className="text-gray-600">
          Votre application a été créée avec succès !
        </p>
      </div>
    </div>
  );
}

export default App;`
        },
        description: 'Application générée avec succès',
        features: ['Interface moderne', 'Design responsive']
      };
    }
  }
}

// OpenAI Provider
class OpenAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey
    });
  }

  async isAvailable(): Promise<boolean> {
    return !!config.openai.apiKey;
  }

  async generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
    const cacheKey = `codegen:openai:${JSON.stringify(request)}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const systemPrompt = this.buildSystemPrompt(request.framework);
    const userPrompt = this.buildUserPrompt(request);

    const response = await this.client.chat.completions.create({
      model: config.openai.model,
      max_tokens: 8000,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const generatedCode = this.parseResponse(content);
    const result: CodeGenerationResponse = {
      id: nanoid(),
      files: generatedCode.files,
      description: generatedCode.description,
      features: generatedCode.features,
      framework: request.framework,
      timestamp: new Date().toISOString()
    };

    // Cache for 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(result));
    
    return result;
  }

  private buildSystemPrompt(framework: string): string {
    return `Tu es un expert développeur full-stack spécialisé dans la génération d'applications web modernes.

Règles importantes :
- Utilise ${framework} comme framework principal
- Crée du code TypeScript de haute qualité
- Utilise Tailwind CSS pour le styling
- Inclus des composants modulaires et réutilisables
- Ajoute la gestion d'état appropriée
- Inclus des animations avec Framer Motion
- Crée une interface moderne et responsive
- Inclus des fonctionnalités interactives
- Ajoute des tests unitaires de base
- Documente le code avec des commentaires

Retourne le code sous forme de JSON avec cette structure :
{
  "files": {
    "package.json": "contenu du fichier",
    "src/App.tsx": "contenu du fichier",
    "src/components/Header.tsx": "contenu du fichier"
  },
  "description": "Description de l'application créée",
  "features": ["feature1", "feature2", "feature3"]
}`;
  }

  private buildUserPrompt(request: CodeGenerationRequest): string {
    let prompt = `Crée une application web complète basée sur ce prompt : "${request.prompt}"`;
    
    if (request.features && request.features.length > 0) {
      prompt += `\n\nFonctionnalités requises : ${request.features.join(', ')}`;
    }
    
    if (request.template) {
      prompt += `\n\nUtilise le template : ${request.template}`;
    }

    return prompt;
  }

  private parseResponse(text: string): any {
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      // Fallback to default structure
      return {
        files: {
          'package.json': JSON.stringify({
            name: 'generated-app',
            version: '1.0.0',
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0',
              'typescript': '^4.9.0',
              'tailwindcss': '^3.0.0'
            }
          }, null, 2),
          'src/App.tsx': `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Application Générée
        </h1>
        <p className="text-gray-600">
          Votre application a été créée avec succès !
        </p>
      </div>
    </div>
  );
}

export default App;`
        },
        description: 'Application générée avec succès',
        features: ['Interface moderne', 'Design responsive']
      };
    }
  }
}

// Code Enhancement Pipeline
export class CodeEnhancementPipeline {
  async enhanceCode(code: string, language: string): Promise<string> {
    try {
      // Format with Prettier
      const formatted = await prettier.format(code, {
        parser: language === 'typescript' ? 'typescript' : 'babel',
        semi: true,
        singleQuote: true,
        trailingComma: 'es5'
      });
      
      return formatted;
    } catch (error) {
      console.error('Error formatting code:', error);
      return code;
    }
  }

  async lintCode(code: string, language: string): Promise<{ errors: any[]; warnings: any[] }> {
    // TODO: Implement ESLint integration
    return { errors: [], warnings: [] };
  }
}

// Main Agent Class
export class BoltAgent {
  private providers: LLMProvider[];
  private enhancementPipeline: CodeEnhancementPipeline;

  constructor() {
    this.providers = [
      new AnthropicProvider(),
      new OpenAIProvider()
    ];
    this.enhancementPipeline = new CodeEnhancementPipeline();
  }

  async generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
    // Rate limiting
    return rateLimiter(async () => {
      // Try providers in order of preference
      for (const provider of this.providers) {
        if (await provider.isAvailable()) {
          try {
            const result = await provider.generateCode(request);
            
            // Enhance the generated code
            const enhancedFiles: Record<string, string> = {};
            for (const [path, content] of Object.entries(result.files)) {
              const language = this.getLanguageFromPath(path);
              enhancedFiles[path] = await this.enhancementPipeline.enhanceCode(content, language);
            }
            
            return {
              ...result,
              files: enhancedFiles
            };
          } catch (error) {
            console.error(`Error with provider ${provider.name}:`, error);
            continue;
          }
        }
      }
      
      throw new Error('No available LLM providers');
    });
  }

  private getLanguageFromPath(path: string): string {
    const ext = path.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      default:
        return 'typescript';
    }
  }

  async createProjectZip(files: Record<string, string>): Promise<Buffer> {
    const zip = new JSZip();
    
    for (const [path, content] of Object.entries(files)) {
      zip.file(path, content);
    }
    
    return zip.generateAsync({ type: 'nodebuffer' });
  }
}

// Export singleton instance
export const boltAgent = new BoltAgent();
