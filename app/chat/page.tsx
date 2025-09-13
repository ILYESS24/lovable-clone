'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Code, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCw,
  Settings,
  Zap,
  Sparkles,
  FileText,
  Image,
  Link,
  Download,
  Share,
  Plus,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isCode?: boolean;
  language?: string;
  suggestions?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Bonjour ! Je suis votre assistant IA pour le développement d\'applications. Je peux vous aider à créer des applications web complètes, générer du code, résoudre des problèmes et bien plus encore. Que souhaitez-vous construire aujourd\'hui ?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Le plus puissant', icon: Sparkles },
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Rapide et efficace', icon: Zap },
    { id: 'claude', name: 'Claude', description: 'Excellent pour le code', icon: Code },
  ];

  const quickPrompts = [
    'Créer une application de todo list',
    'Générer un dashboard admin',
    'Construire un site e-commerce',
    'Créer une API REST',
    'Développer une app mobile',
    'Générer des composants React',
    'Créer un système d\'authentification',
    'Construire un blog moderne',
    'Développer une application de chat',
    'Créer un portfolio interactif'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          model: selectedModel
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.data.message,
          timestamp: new Date(),
          isCode: data.data.message.includes('```'),
          language: 'jsx',
          suggestions: data.data.suggestions
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold gradient-text">Chat IA</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {models.map((model) => (
                  <Button
                    key={model.id}
                    variant={selectedModel === model.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedModel(model.id)}
                    className="flex items-center space-x-1"
                  >
                    <model.icon className="w-4 h-4" />
                    <span>{model.name}</span>
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Prompts Rapides
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPrompts(!showPrompts)}
                  >
                    {showPrompts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showPrompts && (
                <CardContent className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{prompt}</span>
                    </Button>
                  ))}
                </CardContent>
              )}
            </Card>

            <Card className="mt-6 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Modèles IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedModel === model.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <model.icon className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-sm">{model.name}</p>
                        <p className="text-xs text-gray-600">{model.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col border-0 shadow-md">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Conversation avec l'IA</span>
                  <Badge variant="secondary" className="ml-auto">
                    {selectedModel.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        } rounded-lg p-4`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="prose prose-sm max-w-none">
                          {message.isCode ? (
                            <div className="relative">
                              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                <code>{message.content}</code>
                              </pre>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(message.content)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>

                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium opacity-70">Suggestions :</p>
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-6"
                                  onClick={() => setInput(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {message.type === 'assistant' && (
                          <div className="flex items-center space-x-2 mt-3">
                            <Button size="sm" variant="ghost">
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Décrivez votre application ou posez une question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading}
                    className="px-6"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
