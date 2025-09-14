'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Save, 
  FileText, 
  Plus, 
  Trash2, 
  Eye, 
  Code,
  Folder,
  File,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

interface MonacoEditorProps {
  project: {
    id: string;
    name: string;
    description: string;
    files: Record<string, string>;
  };
  onFileChange: (path: string, content: string) => void;
  onProjectUpdate: (project: any) => void;
}

export default function MonacoEditor({ project, onFileChange, onProjectUpdate }: MonacoEditorProps) {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const editorRef = useRef<any>(null);

  // Convertir les fichiers en structure d'arbre
  const buildFileTree = (files: Record<string, string>): FileNode[] => {
    const tree: FileNode[] = [];
    const pathMap = new Map<string, FileNode>();

    Object.entries(files).forEach(([path, content]) => {
      const parts = path.split('/');
      let currentPath = '';
      
      parts.forEach((part, index) => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!pathMap.has(currentPath)) {
          const isFile = index === parts.length - 1;
          const node: FileNode = {
            name: part,
            type: isFile ? 'file' : 'folder',
            content: isFile ? content : undefined,
            children: isFile ? undefined : [],
            path: currentPath
          };
          
          pathMap.set(currentPath, node);
          
          if (parentPath) {
            const parent = pathMap.get(parentPath);
            if (parent && parent.children) {
              parent.children.push(node);
            }
          } else {
            tree.push(node);
          }
        }
      });
    });

    return tree;
  };

  const fileTree = buildFileTree(project.files);

  // Sélectionner le premier fichier au chargement
  useEffect(() => {
    if (!selectedFile && Object.keys(project.files).length > 0) {
      const firstFile = Object.keys(project.files)[0];
      setSelectedFile(firstFile);
      setFileContent(project.files[firstFile]);
    }
  }, [project.files, selectedFile]);

  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
    setFileContent(project.files[filePath] || '');
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && selectedFile) {
      setFileContent(value);
      onFileChange(selectedFile, value);
    }
  };

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const addNewFile = () => {
    const fileName = prompt('Nom du fichier (ex: components/Button.tsx):');
    if (fileName && !project.files[fileName]) {
      const newProject = {
        ...project,
        files: {
          ...project.files,
          [fileName]: '// Nouveau fichier\n'
        }
      };
      onProjectUpdate(newProject);
    }
  };

  const deleteFile = (filePath: string) => {
    if (confirm(`Supprimer ${filePath} ?`)) {
      const newFiles = { ...project.files };
      delete newFiles[filePath];
      const newProject = {
        ...project,
        files: newFiles
      };
      onProjectUpdate(newProject);
      
      if (selectedFile === filePath) {
        const remainingFiles = Object.keys(newFiles);
        if (remainingFiles.length > 0) {
          handleFileSelect(remainingFiles[0]);
        } else {
          setSelectedFile('');
          setFileContent('');
        }
      }
    }
  };

  const generatePreview = () => {
    // Créer un HTML complet avec le code généré
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${project.files['src/App.tsx'] || project.files['App.tsx'] || `
        function App() {
            return (
                <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            ${project.name}
                        </h1>
                        <p className="text-gray-600">
                            ${project.description}
                        </p>
                        <div className="mt-6">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Commencer
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        
        ReactDOM.render(<App />, document.getElementById('root'));
        `}
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setIsPreviewMode(true);
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path} style={{ marginLeft: level * 20 }}>
        <div 
          className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded"
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              handleFileSelect(node.path);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {expandedFolders.has(node.path) ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              <Folder className="w-4 h-4 mr-2 text-blue-400" />
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <File className="w-4 h-4 mr-2 text-gray-400" />
            </>
          )}
          <span className={`text-sm ${selectedFile === node.path ? 'text-blue-400' : 'text-gray-300'}`}>
            {node.name}
          </span>
          {node.type === 'file' && (
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto p-1 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(node.path);
              }}
            >
              <Trash2 className="w-3 h-3 text-red-400" />
            </Button>
          )}
        </div>
        {node.type === 'folder' && expandedFolders.has(node.path) && node.children && (
          <div>
            {renderFileTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const getFileLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'js':
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
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">{project.name}</h1>
            <Badge variant="secondary" className="text-xs">
              {Object.keys(project.files).length} fichiers
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={addNewFile} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau fichier
            </Button>
            <Button onClick={generatePreview} size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-400">EXPLORATEUR</h3>
            <Button onClick={addNewFile} size="sm" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Editor Header */}
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">
                {selectedFile || 'Sélectionnez un fichier'}
              </span>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            {selectedFile ? (
              <Editor
                height="100%"
                language={getFileLanguage(selectedFile)}
                value={fileContent}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on'
                }}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Sélectionnez un fichier pour commencer l'édition</p>
                  <p className="text-sm mt-2">Ou créez un nouveau fichier</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {isPreviewMode && (
          <div className="w-1/2 border-l border-gray-700 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">Preview</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setIsPreviewMode(false)}
              >
                ✕
              </Button>
            </div>
            <div className="flex-1">
              {previewUrl && (
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title="Preview"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
