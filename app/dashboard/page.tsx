'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Shield,
  Eye,
  Edit,
  Trash2,
  Share,
  Download,
  Activity,
  BarChart3
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'deployed' | 'archived';
  template: string;
  tech: string[];
  lastModified: string;
  collaborators: number;
  stars: number;
  views: number;
  progress: number;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setProjects([
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Plateforme de vente en ligne complète avec panier et paiement',
          status: 'active',
          template: 'E-commerce',
          tech: ['React', 'Node.js', 'PostgreSQL'],
          lastModified: 'Il y a 2 heures',
          collaborators: 3,
          stars: 12,
          views: 156,
          progress: 85
        },
        {
          id: '2',
          name: 'Task Management App',
          description: 'Application de gestion de tâches avec équipes et tableaux Kanban',
          status: 'deployed',
          template: 'Productivity',
          tech: ['Next.js', 'TypeScript', 'Supabase'],
          lastModified: 'Il y a 1 jour',
          collaborators: 5,
          stars: 8,
          views: 89,
          progress: 100
        },
        {
          id: '3',
          name: 'Portfolio Website',
          description: 'Site portfolio personnel avec animations et galerie de projets',
          status: 'draft',
          template: 'Portfolio',
          tech: ['React', 'Framer Motion', 'Tailwind CSS'],
          lastModified: 'Il y a 3 jours',
          collaborators: 1,
          stars: 3,
          views: 23,
          progress: 60
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { title: 'Projets Actifs', value: '12', icon: Code, change: '+2 cette semaine', color: 'text-blue-600' },
    { title: 'Générations IA', value: '1,247', icon: Zap, change: '+15% ce mois', color: 'text-purple-600' },
    { title: 'Collaborateurs', value: '8', icon: Users, change: '+1 nouveau', color: 'text-green-600' },
    { title: 'Déploiements', value: '45', icon: Globe, change: '+5 cette semaine', color: 'text-orange-600' },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'deployed': return 'Déployé';
      case 'active': return 'Actif';
      case 'draft': return 'Brouillon';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold gradient-text">BuilderAI</h1>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bonjour ! 👋</h2>
          <p className="text-gray-600">Voici un aperçu de vos projets et de votre activité récente.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
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
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group border-0 shadow-md">
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
        <Card className="border-0 shadow-md">
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
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
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
                      <Edit className="w-4 h-4 mr-1" />
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
