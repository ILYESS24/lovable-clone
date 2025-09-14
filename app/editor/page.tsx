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
import MonacoEditor from '@/components/editor/MonacoEditor';

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

  const handleFileChange = (path: string, content: string) => {
    const updatedProject = {
      ...project,
      files: {
        ...project.files,
        [path]: content
      },
      updatedAt: new Date().toISOString()
    };
    setProject(updatedProject);
  };

  const handleProjectUpdate = (updatedProject: any) => {
    setProject(updatedProject);
  };

  return (
    <div className="h-screen">
      <MonacoEditor
        project={project}
        onFileChange={handleFileChange}
        onProjectUpdate={handleProjectUpdate}
      />
    </div>
  );
}
