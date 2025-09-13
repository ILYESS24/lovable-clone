'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  GitBranch,
  Globe,
  Clock,
  Users,
  Code,
  Palette,
  Database,
  Smartphone,
  Laptop,
  Zap,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Share,
  Download,
  Settings
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
  thumbnail: string;
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Plateforme de vente en ligne complète avec panier, paiement et gestion des commandes',
      status: 'deployed',
      template: 'E-commerce',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      lastModified: 'Il y a 2 heures',
      collaborators: 3,
      stars: 12,
      views: 156,
      progress: 100,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Application de gestion de tâches avec équipes et tableaux Kanban',
      status: 'active',
      template: 'Productivity',
      tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
      lastModified: 'Il y a 1 jour',
      collaborators: 5,
      stars: 8,
      views: 89,
      progress: 85,
      thumbnail: '/api/placeholder/400/300'
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
      progress: 60,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '4',
      name: 'Social Media Dashboard',
      description: 'Tableau de bord pour gérer les réseaux sociaux avec analytics',
      status: 'active',
      template: 'Dashboard',
      tech: ['Vue.js', 'Chart.js', 'Firebase', 'Material UI'],
      lastModified: 'Il y a 4 heures',
      collaborators: 2,
      stars: 15,
      views: 234,
      progress: 75,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '5',
      name: 'Mobile Banking App',
      description: 'Application mobile de banque avec authentification et transactions',
      status: 'draft',
      template: 'Mobile App',
      tech: ['React Native', 'Node.js', 'MongoDB', 'JWT'],
      lastModified: 'Il y a 1 semaine',
      collaborators: 4,
      stars: 6,
      views: 45,
      progress: 40,
      thumbnail: '/api/placeholder/400/300'
    },
    {
      id: '6',
      name: 'AI Chat Platform',
      description: 'Plateforme de chat avec IA intégrée et personnalisation',
      status: 'deployed',
      template: 'AI Chat',
      tech: ['Next.js', 'OpenAI', 'WebSocket', 'Redis'],
      lastModified: 'Il y a 5 heures',
      collaborators: 6,
      stars: 28,
      views: 567,
      progress: 100,
      thumbnail: '/api/placeholder/400/300'
    }
  ];

  const templates = [
    {
      name: 'E-commerce',
      description: 'Boutique en ligne complète',
      icon: Globe,
      color: 'bg-blue-500',
      features: ['Panier', 'Paiement', 'Gestion produits']
    },
    {
      name: 'Dashboard',
      description: 'Tableau de bord admin',
      icon: TrendingUp,
      color: 'bg-green-500',
      features: ['Graphiques', 'Analytics', 'Gestion utilisateurs']
    },
    {
      name: 'Portfolio',
      description: 'Site portfolio personnel',
      icon: Palette,
      color: 'bg-purple-500',
      features: ['Galerie', 'Animations', 'Contact']
    },
    {
      name: 'Blog',
      description: 'Plateforme de blog',
      icon: Code,
      color: 'bg-orange-500',
      features: ['Articles', 'Commentaires', 'SEO']
    },
    {
      name: 'Mobile App',
      description: 'Application mobile',
      icon: Smartphone,
      color: 'bg-pink-500',
      features: ['Responsive', 'PWA', 'Notifications']
    },
    {
      name: 'AI Chat',
      description: 'Chat avec IA',
      icon: Zap,
      color: 'bg-yellow-500',
      features: ['IA intégrée', 'Temps réel', 'Personnalisation']
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Mes Projets
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Projet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des projets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="draft">Brouillons</option>
              <option value="active">Actifs</option>
              <option value="deployed">Déployés</option>
              <option value="archived">Archivés</option>
            </select>
            
            <div className="flex items-center space-x-1 border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-all duration-200 group">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-600">Aperçu du projet</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{project.template}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{project.collaborators}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{project.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{project.lastModified}</span>
                      </span>
                    </div>
                  </div>
                  
                  {project.progress < 100 && (
                    <div className="mb-4">
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
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Ouvrir
                    </Button>
                    {project.status === 'deployed' && (
                      <Button size="sm" variant="outline">
                        <Globe className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusText(project.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{project.collaborators} collaborateurs</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{project.lastModified}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{project.stars} étoiles</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {project.tech.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Ouvrir
                      </Button>
                      {project.status === 'deployed' && (
                        <Button size="sm" variant="outline">
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>Créer un Nouveau Projet</CardTitle>
                <CardDescription>
                  Choisissez un template ou créez un projet vide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.name}
                      className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-3`}>
                        <template.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                      <div className="space-y-1">
                        {template.features.map((feature, index) => (
                          <div key={index} className="text-xs text-gray-500">• {feature}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Créer le Projet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
