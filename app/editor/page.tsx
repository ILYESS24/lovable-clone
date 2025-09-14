'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play,
  Save,
  Download,
  MessageCircle,
  Code,
  FileText,
  Settings,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  files: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function EditorPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'chat'>('editor');

  // Charger le projet depuis l'API
  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success && data.projects.length > 0) {
        const project = data.projects[0];
        setProject(project);
        const firstFile = Object.keys(project.files)[0];
        if (firstFile) {
          setSelectedFile(firstFile);
          setFileContent(project.files[firstFile]);
        }
      }
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  const handleFileSelect = (filename: string) => {
    if (project) {
      setSelectedFile(filename);
      setFileContent(project.files[filename] || '');
    }
  };

  const handleFileContentChange = (content: string) => {
    setFileContent(content);
    if (project) {
      setProject({
        ...project,
        files: {
          ...project.files,
          [selectedFile]: content
        },
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleSaveProject = async () => {
    if (!project) return;
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      
      if (response.ok) {
        // Afficher une notification de succès
        console.log('Projet sauvegardé avec succès');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: chatInput,
          context: project ? `Projet: ${project.name} - ${project.description}` : ''
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const generateNewApp = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Crée une application web moderne avec React et Tailwind CSS',
          projectType: 'web-app'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const newProject: Project = {
          id: Date.now().toString(),
          name: 'Application Générée',
          description: data.project.description,
          files: data.project.files,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setProject(newProject);
        const firstFile = Object.keys(newProject.files)[0];
        if (firstFile) {
          setSelectedFile(firstFile);
          setFileContent(newProject.files[firstFile]);
        }
      }
    } catch (error) {
      console.error('Error generating app:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Chargement du projet...</h1>
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-xl font-bold">{project.name}</h1>
            <Badge variant="secondary">{project.description}</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={generateNewApp} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              Générer
            </Button>
            <Button onClick={handleSaveProject}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">FICHIERS</h3>
          <div className="space-y-1">
            {Object.keys(project.files).map((filename) => (
              <button
                key={filename}
                onClick={() => handleFileSelect(filename)}
                className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors ${
                  selectedFile === filename ? 'bg-blue-600 text-white' : 'text-gray-300'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                {filename}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'editor'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                Éditeur
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Chat IA
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex">
            <AnimatePresence mode="wait">
              {activeTab === 'editor' ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Editor Header */}
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">{selectedFile}</span>
                    </div>
                  </div>

                  {/* Monaco Editor Placeholder */}
                  <div className="flex-1 p-4">
                    <textarea
                      value={fileContent}
                      onChange={(e) => handleFileContentChange(e.target.value)}
                      className="w-full h-full bg-gray-900 text-white p-4 rounded-lg border border-gray-700 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre code ici..."
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-400 mt-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Commencez une conversation avec l'IA</p>
                        <p className="text-sm">Posez des questions sur votre code ou demandez des améliorations</p>
                      </div>
                    ) : (
                      chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-100'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">L'IA réfléchit...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-gray-700 p-4">
                    <form onSubmit={handleChatSubmit} className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Posez une question à l'IA..."
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isChatLoading}
                      />
                      <Button type="submit" disabled={isChatLoading || !chatInput.trim()}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
