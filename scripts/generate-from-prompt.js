#!/usr/bin/env node

/**
 * Generate application from prompt using Bolt Agent
 * Usage: node scripts/generate-from-prompt.js "Create a todo app"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Configuration
const config = {
  outputDir: '/tmp/bolt-output',
  port: 3000,
  frameworks: ['nextjs', 'vite', 'svelte', 'astro']
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('Usage: node scripts/generate-from-prompt.js "Your prompt here" [framework]', 'yellow');
    log('Example: node scripts/generate-from-prompt.js "Create a todo app" nextjs', 'yellow');
    process.exit(1);
  }
  
  const prompt = args[0];
  const framework = args[1] || 'nextjs';
  
  if (!config.frameworks.includes(framework)) {
    logError(`Invalid framework: ${framework}`);
    log(`Available frameworks: ${config.frameworks.join(', ')}`, 'yellow');
    process.exit(1);
  }
  
  return { prompt, framework };
}

// Generate application using Bolt Agent
async function generateApplication(prompt, framework) {
  logStep('1', 'Generating application with Bolt Agent...');
  
  try {
    // Import the agent (this would be from the agent package in a real setup)
    const { boltAgent } = require('../agent/dist/index.js');
    
    const request = {
      prompt,
      framework,
      features: [],
      userId: 'cli-user'
    };
    
    log(`Prompt: "${prompt}"`, 'blue');
    log(`Framework: ${framework}`, 'blue');
    
    const result = await boltAgent.generateCode(request);
    
    logSuccess(`Generated application with ${Object.keys(result.files).length} files`);
    log(`Description: ${result.description}`, 'white');
    log(`Features: ${result.features.join(', ')}`, 'white');
    
    return result;
  } catch (error) {
    logError(`Failed to generate application: ${error.message}`);
    
    // Fallback to template-based generation
    logWarning('Falling back to template-based generation...');
    return generateFromTemplate(prompt, framework);
  }
}

// Fallback template-based generation
function generateFromTemplate(prompt, framework) {
  const templates = {
    nextjs: {
      files: {
        'package.json': JSON.stringify({
          name: 'generated-app',
          version: '1.0.0',
          dependencies: {
            'next': '^14.0.0',
            'react': '^18.0.0',
            'react-dom': '^18.0.0',
            'typescript': '^5.0.0',
            'tailwindcss': '^3.0.0'
          },
          scripts: {
            'dev': 'next dev',
            'build': 'next build',
            'start': 'next start'
          }
        }, null, 2),
        'app/layout.tsx': `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Generated App',
  description: 'App generated from prompt: ${prompt}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`,
        'app/page.tsx': `'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          ${prompt}
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to your generated app!</h2>
          <p className="text-gray-600 mb-6">
            This application was generated from your prompt: "${prompt}"
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Count: {count}
            </button>
            <button
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}`,
        'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`,
        'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`,
        'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
        'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
      },
      description: `Application générée à partir du prompt: ${prompt}`,
      features: ['Interface moderne', 'Design responsive', 'Compteur interactif']
    }
  };
  
  return templates[framework] || templates.nextjs;
}

// Write files to output directory
function writeFiles(files, outputDir) {
  logStep('2', 'Writing files to output directory...');
  
  // Clean and create output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Write all files
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(outputDir, filePath);
    const dir = path.dirname(fullPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file
    fs.writeFileSync(fullPath, content);
    log(`  📄 ${filePath}`, 'white');
  }
  
  logSuccess(`Wrote ${Object.keys(files).length} files to ${outputDir}`);
}

// Install dependencies
function installDependencies(outputDir) {
  logStep('3', 'Installing dependencies...');
  
  try {
    process.chdir(outputDir);
    execSync('npm install', { stdio: 'inherit' });
    logSuccess('Dependencies installed successfully');
  } catch (error) {
    logError(`Failed to install dependencies: ${error.message}`);
    logWarning('You may need to install dependencies manually');
  }
}

// Start development server
function startDevServer(outputDir, port) {
  logStep('4', 'Starting development server...');
  
  try {
    process.chdir(outputDir);
    
    // Start server in background
    const server = execSync(`npm run dev -- --port ${port}`, { 
      stdio: 'pipe',
      detached: true 
    });
    
    logSuccess(`Development server started on http://localhost:${port}`);
    log('Press Ctrl+C to stop the server', 'yellow');
    
    // Keep the process alive
    process.stdin.resume();
    
  } catch (error) {
    logError(`Failed to start development server: ${error.message}`);
    logWarning('You can start the server manually with: npm run dev');
  }
}

// Open browser
function openBrowser(port) {
  logStep('5', 'Opening browser...');
  
  try {
    const url = `http://localhost:${port}`;
    
    // Try to open browser (works on macOS, Linux, Windows)
    const command = process.platform === 'win32' ? 'start' : 
                   process.platform === 'darwin' ? 'open' : 'xdg-open';
    
    execSync(`${command} ${url}`, { stdio: 'ignore' });
    logSuccess(`Opened browser to ${url}`);
  } catch (error) {
    logWarning('Could not open browser automatically');
    log(`Please open http://localhost:${port} in your browser`, 'yellow');
  }
}

// Generate README
function generateReadme(outputDir, prompt, framework, result) {
  const readmeContent = `# Generated Application

This application was generated using Bolt Builder from the following prompt:

> ${prompt}

## Framework
${framework}

## Description
${result.description}

## Features
${result.features.map(feature => `- ${feature}`).join('\n')}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Generated Files

${Object.keys(result.files).map(file => `- \`${file}\``).join('\n')}

## Next Steps

1. Review the generated code
2. Customize the application to your needs
3. Add additional features
4. Deploy to your preferred platform

## Deployment

This application can be deployed to:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- Any Node.js hosting provider

Generated on: ${new Date().toISOString()}
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);
  logSuccess('Generated README.md');
}

// Main function
async function main() {
  try {
    log('🚀 Bolt Builder - Generate from Prompt', 'magenta');
    log('=====================================', 'magenta');
    
    const { prompt, framework } = parseArgs();
    
    // Generate application
    const result = await generateApplication(prompt, framework);
    
    // Write files
    writeFiles(result.files, config.outputDir);
    
    // Generate README
    generateReadme(config.outputDir, prompt, framework, result);
    
    // Install dependencies
    installDependencies(config.outputDir);
    
    // Start development server
    startDevServer(config.outputDir, config.port);
    
    // Open browser
    openBrowser(config.port);
    
    log('\n🎉 Application generated successfully!', 'green');
    log(`📁 Output directory: ${config.outputDir}`, 'blue');
    log(`🌐 URL: http://localhost:${config.port}`, 'blue');
    
  } catch (error) {
    logError(`Generation failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n👋 Goodbye!', 'yellow');
  process.exit(0);
});

// Run main function
main();
