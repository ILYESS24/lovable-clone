'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Code, 
  Zap, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  GitBranch,
  Globe,
  Settings,
  MessageSquare,
  Palette,
  Database,
  Shield
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Projets Actifs', value: '12', icon: Code, change: '+2 cette semaine', color: 'text-blue-600' },
    { title: 'Générations IA', value: '1,247', icon: Zap, change: '+15% ce mois', color: 'text-purple-600' },
    { title: 'Collaborateurs', value: '8', icon: Users, change: '+1 nouveau', color: 'text-green-600' },
    { title: 'Déploiements', value: '45', icon: Globe, change: '+5 cette semaine', color: 'text-orange-600' },
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Plateforme de vente en ligne avec panier et paiement',
      status: 'active',
      lastModified: 'Il y a 2 heures',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      progress: 85
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Application de gestion de tâches avec équipes',
      status: 'deployed',
      lastModified: 'Il y a 1 jour',
      tech: ['Next.js', 'TypeScript', 'Supabase'],
      progress: 100
    },
    {
      id: 3,
      name: 'Portfolio Website',
      description: 'Site portfolio personnel avec animations',
      status: 'draft',
      lastModified: 'Il y a 3 jours',
      tech: ['React', 'Framer Motion', 'Tailwind'],
      progress: 60
    }
  ];

  const quickActions = [
    {
      title: 'Nouveau Projet',
      description: 'Créer une nouvelle application',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Nouveau projet')
    },
    {
      title: 'Chat IA',
      description: 'Discuter avec l\'assistant IA',
      icon: MessageSquare,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Chat IA')
    },
    {
      title: 'Templates',
      description: 'Parcourir les modèles',
      icon: Palette,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Templates')
    },
    {
      title: 'Déploiement',
      description: 'Déployer un projet',
      icon: Globe,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Déploiement')
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'projects', label: 'Projets', icon: Code },
    { id: 'ai', label: 'IA', icon: Zap },
    { id: 'deploy', label: 'Déploiements', icon: Globe },
    { id: 'team', label: 'Équipe', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BuilderAI
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg text-white ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Projets Récents</span>
            </CardTitle>
            <CardDescription>
              Vos projets les plus récents et leur statut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <Badge 
                        variant={project.status === 'deployed' ? 'default' : project.status === 'active' ? 'secondary' : 'outline'}
                      >
                        {project.status === 'deployed' ? 'Déployé' : project.status === 'active' ? 'Actif' : 'Brouillon'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{project.lastModified}</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        {project.tech.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {project.progress < 100 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progression</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <GitBranch className="w-4 h-4 mr-1" />
                      Ouvrir
                    </Button>
                    {project.status === 'deployed' && (
                      <Button variant="outline" size="sm">
                        <Globe className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
