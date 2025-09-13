'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  GitBranch,
  ExternalLink,
  Copy,
  RefreshCw,
  Settings,
  BarChart3,
  Activity,
  Users,
  Eye,
  Download,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Shield,
  Database,
  Server,
  Cpu,
  HardDrive
} from 'lucide-react';

interface Deployment {
  id: string;
  project: string;
  url: string;
  status: 'success' | 'building' | 'failed' | 'cancelled';
  branch: string;
  commit: string;
  createdAt: string;
  buildTime: number;
  size: string;
  visitors: number;
  performance: number;
  uptime: number;
}

export default function DeployPage() {
  const [activeTab, setActiveTab] = useState('deployments');
  const [selectedProject, setSelectedProject] = useState('');

  const deployments: Deployment[] = [
    {
      id: '1',
      project: 'E-commerce Platform',
      url: 'https://ecommerce-demo.vercel.app',
      status: 'success',
      branch: 'main',
      commit: 'a1b2c3d',
      createdAt: 'Il y a 2 heures',
      buildTime: 45,
      size: '2.3 MB',
      visitors: 1247,
      performance: 95,
      uptime: 99.9
    },
    {
      id: '2',
      project: 'Task Management App',
      url: 'https://tasks-app.vercel.app',
      status: 'building',
      branch: 'feature/dashboard',
      commit: 'e4f5g6h',
      createdAt: 'Il y a 5 minutes',
      buildTime: 0,
      size: '1.8 MB',
      visitors: 892,
      performance: 88,
      uptime: 99.7
    },
    {
      id: '3',
      project: 'Portfolio Website',
      url: 'https://portfolio-demo.vercel.app',
      status: 'success',
      branch: 'main',
      commit: 'i7j8k9l',
      createdAt: 'Il y a 1 jour',
      buildTime: 32,
      size: '1.2 MB',
      visitors: 456,
      performance: 92,
      uptime: 100
    },
    {
      id: '4',
      project: 'AI Chat Platform',
      url: 'https://ai-chat.vercel.app',
      status: 'failed',
      branch: 'main',
      commit: 'm1n2o3p',
      createdAt: 'Il y a 3 heures',
      buildTime: 0,
      size: '0 MB',
      visitors: 0,
      performance: 0,
      uptime: 0
    }
  ];

  const projects = [
    { id: '1', name: 'E-commerce Platform', status: 'deployed' },
    { id: '2', name: 'Task Management App', status: 'building' },
    { id: '3', name: 'Portfolio Website', status: 'deployed' },
    { id: '4', name: 'AI Chat Platform', status: 'failed' },
    { id: '5', name: 'Social Media Dashboard', status: 'draft' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'building': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Déployé';
      case 'building': return 'En cours';
      case 'failed': return 'Échec';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'building': return RefreshCw;
      case 'failed': return AlertCircle;
      case 'cancelled': return Clock;
      default: return Clock;
    }
  };

  const tabs = [
    { id: 'deployments', label: 'Déploiements', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'domains', label: 'Domaines', icon: Server },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Déploiements
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Zap className="w-4 h-4 mr-2" />
                Déployer
              </Button>
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
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'deployments' && (
          <>
            {/* Quick Deploy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Déploiement Rapide</span>
                </CardTitle>
                <CardDescription>
                  Déployez votre projet en quelques clics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Projet
                    </label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Sélectionner un projet</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branche
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option value="main">main</option>
                      <option value="develop">develop</option>
                      <option value="staging">staging</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      className="w-full"
                      disabled={!selectedProject}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Déployer Maintenant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deployments List */}
            <div className="space-y-4">
              {deployments.map((deployment) => {
                const StatusIcon = getStatusIcon(deployment.status);
                return (
                  <Card key={deployment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-5 h-5 ${
                              deployment.status === 'success' ? 'text-green-600' :
                              deployment.status === 'building' ? 'text-blue-600 animate-spin' :
                              deployment.status === 'failed' ? 'text-red-600' :
                              'text-gray-600'
                            }`} />
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">
                                {deployment.project}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getStatusColor(deployment.status)}>
                                  {getStatusText(deployment.status)}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                  {deployment.createdAt}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {deployment.visitors} visiteurs
                            </div>
                            <div className="text-sm text-gray-600">
                              {deployment.performance}% performance
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {deployment.status === 'success' && (
                              <>
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Ouvrir
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {deployment.status === 'building' && (
                              <Button size="sm" variant="outline">
                                <Pause className="w-4 h-4 mr-1" />
                                Annuler
                              </Button>
                            )}
                            {deployment.status === 'failed' && (
                              <Button size="sm" variant="outline">
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Redéployer
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {deployment.status === 'success' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                {deployment.uptime}%
                              </div>
                              <div className="text-sm text-gray-600">Uptime</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {deployment.performance}%
                              </div>
                              <div className="text-sm text-gray-600">Performance</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                {deployment.buildTime}s
                              </div>
                              <div className="text-sm text-gray-600">Build Time</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">
                                {deployment.size}
                              </div>
                              <div className="text-sm text-gray-600">Taille</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Visiteurs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Graphique des visiteurs</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Métriques de performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'domains' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5" />
                <span>Domaines Personnalisés</span>
              </CardTitle>
              <CardDescription>
                Gérez vos domaines personnalisés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">monapp.com</h3>
                    <p className="text-sm text-gray-600">Domaine principal</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Domaine
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Sécurité</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">HTTPS</h3>
                    <p className="text-sm text-gray-600">Certificat SSL automatique</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Protection DDoS</h3>
                    <p className="text-sm text-gray-600">Protection contre les attaques</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Base de Données</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">PostgreSQL</h3>
                    <p className="text-sm text-gray-600">Base de données principale</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Actif</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Redis</h3>
                    <p className="text-sm text-gray-600">Cache et sessions</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Actif</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
