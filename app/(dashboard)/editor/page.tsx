'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Play, 
  Save, 
  Download, 
  Share, 
  Settings,
  File,
  Folder,
  Search,
  GitBranch,
  Zap,
  Eye,
  Maximize2,
  Minimize2,
  Terminal,
  Bug,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

export default function EditorPage() {
  const [activeFile, setActiveFile] = useState<string>('App.tsx');
  const [code, setCode] = useState(`import React from 'react';
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Compteur Interactif
        </h1>
        
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            {count}
          </div>
          <p className="text-gray-600">
            Cliquez sur les boutons pour modifier le compteur
          </p>
        </div>
        
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            -1
          </button>
          <button
            onClick={() => setCount(0)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;`);

  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('$ npm start\n> Starting development server...\n> Server running on http://localhost:3000\n> ✓ Compiled successfully');
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const fileTree: FileNode[] = [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: 'App.tsx',
          name: 'App.tsx',
          type: 'file',
          language: 'typescript'
        },
        {
          id: 'index.tsx',
          name: 'index.tsx',
          type: 'file',
          language: 'typescript'
        },
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          children: [
            {
              id: 'Button.tsx',
              name: 'Button.tsx',
              type: 'file',
              language: 'typescript'
            },
            {
              id: 'Card.tsx',
              name: 'Card.tsx',
              type: 'file',
              language: 'typescript'
            }
          ]
        }
      ]
    },
    {
      id: 'package.json',
      name: 'package.json',
      type: 'file',
      language: 'json'
    },
    {
      id: 'README.md',
      name: 'README.md',
      type: 'file',
      language: 'markdown'
    }
  ];

  const languageIcons = {
    typescript: 'TS',
    javascript: 'JS',
    json: '{}',
    markdown: 'MD',
    css: 'CSS',
    html: 'HTML'
  };

  const handleFileSelect = (fileName: string) => {
    setActiveFile(fileName);
    // Ici vous chargeriez le contenu du fichier depuis votre système de fichiers
  };

  const handleRun = () => {
    setTerminalOutput(prev => prev + '\n$ npm run build\n> Building application...\n> ✓ Build completed successfully');
    setIsTerminalOpen(true);
  };

  const handleSave = () => {
    // Logique de sauvegarde
    console.log('Saving file:', activeFile);
  };

  const handleDeploy = () => {
    setTerminalOutput(prev => prev + '\n$ vercel deploy\n> Deploying to Vercel...\n> ✓ Deployment successful\n> https://your-app.vercel.app');
    setIsTerminalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">Éditeur de Code</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                En ligne
              </Badge>
              <Badge variant="outline">
                <GitBranch className="w-3 h-3 mr-1" />
                main
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Sauvegarder
            </Button>
            <Button size="sm" variant="outline" onClick={handleRun}>
              <Play className="w-4 h-4 mr-1" />
              Exécuter
            </Button>
            <Button size="sm" variant="outline" onClick={handleDeploy}>
              <Zap className="w-4 h-4 mr-1" />
              Déployer
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Aperçu
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            >
              <Terminal className="w-4 h-4 mr-1" />
              Terminal
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-sm text-gray-300">Explorateur de fichiers</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {fileTree.map((node) => (
              <FileTreeNode 
                key={node.id} 
                node={node} 
                onSelect={handleFileSelect}
                activeFile={activeFile}
                languageIcons={languageIcons}
              />
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 flex items-center">
            <div className="flex items-center space-x-1 p-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-t text-sm">
                <File className="w-4 h-4" />
                <span>{activeFile}</span>
                <button className="ml-2 hover:bg-gray-600 rounded p-1">
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex">
            <div className="flex-1">
              <MonacoEditor
                value={code}
                onChange={setCode}
                language="typescript"
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Preview Panel */}
            {isPreviewOpen && (
              <div className="w-96 border-l border-gray-700 bg-white">
                <div className="h-8 bg-gray-100 border-b flex items-center justify-between px-3">
                  <span className="text-sm font-medium text-gray-700">Aperçu</span>
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="ghost">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-full bg-white">
                  <iframe
                    src="data:text/html,<div style='padding:20px;font-family:Arial;'><h1>Compteur Interactif</h1><div style='text-align:center;font-size:48px;color:#2563eb;margin:20px 0;'>0</div><div style='text-align:center;'><button style='background:#ef4444;color:white;border:none;padding:12px 24px;margin:0 8px;border-radius:8px;'>-1</button><button style='background:#6b7280;color:white;border:none;padding:12px 24px;margin:0 8px;border-radius:8px;'>Reset</button><button style='background:#10b981;color:white;border:none;padding:12px 24px;margin:0 8px;border-radius:8px;'>+1</button></div></div>"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Terminal */}
          {isTerminalOpen && (
            <div className="h-64 bg-gray-900 border-t border-gray-700">
              <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-3">
                <span className="text-sm font-medium text-gray-300">Terminal</span>
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="ghost">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 h-full overflow-y-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {terminalOutput}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Problems Panel */}
      {(errors.length > 0 || warnings.length > 0) && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-800 border-t border-gray-700">
          <div className="h-8 bg-gray-700 border-b border-gray-600 flex items-center px-3">
            <span className="text-sm font-medium text-gray-300">Problèmes</span>
          </div>
          <div className="p-3 h-full overflow-y-auto">
            {errors.map((error, index) => (
              <div key={index} className="flex items-center space-x-2 text-red-400 text-sm mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            ))}
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-center space-x-2 text-yellow-400 text-sm mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Composant pour l'arbre de fichiers
function FileTreeNode({ 
  node, 
  onSelect, 
  activeFile, 
  languageIcons 
}: { 
  node: FileNode; 
  onSelect: (name: string) => void; 
  activeFile: string;
  languageIcons: Record<string, string>;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (node.type === 'file') {
    return (
      <div
        className={`flex items-center space-x-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-700 rounded ${
          activeFile === node.name ? 'bg-blue-600' : ''
        }`}
        onClick={() => onSelect(node.name)}
      >
        <File className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300">{node.name}</span>
        {node.language && (
          <Badge variant="outline" className="ml-auto text-xs">
            {languageIcons[node.language] || node.language}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center space-x-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-700 rounded"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Folder className="w-4 h-4 text-blue-400" />
        <span className="text-gray-300">{node.name}</span>
      </div>
      {isExpanded && node.children && (
        <div className="ml-4">
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              activeFile={activeFile}
              languageIcons={languageIcons}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Composant Monaco Editor simplifié
function MonacoEditor({ 
  value, 
  onChange, 
  language, 
  theme, 
  options 
}: {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme: string;
  options: any;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontFamily = 'Monaco, Menlo, "Ubuntu Mono", monospace';
      textareaRef.current.style.fontSize = '14px';
      textareaRef.current.style.lineHeight = '1.5';
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full bg-gray-900 text-white p-4 resize-none outline-none"
      style={{
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: '14px',
        lineHeight: '1.5',
      }}
      spellCheck={false}
    />
  );
}
