'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Code, 
  Globe, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Github,
  Chrome,
  Play,
  Sparkles,
  Bot,
  Palette,
  Database,
  Shield,
  Rocket,
  TrendingUp,
  MessageSquare,
  FileText,
  Smartphone,
  Laptop
} from 'lucide-react';

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Bot,
      title: 'IA Intégrée',
      description: 'Générez du code avec GPT-4, Claude et d\'autres modèles IA avancés',
      color: 'text-purple-600'
    },
    {
      icon: Code,
      title: 'Éditeur de Code',
      description: 'Monaco Editor avec auto-complétion IA et débogage intégré',
      color: 'text-blue-600'
    },
    {
      icon: Globe,
      title: 'Déploiement Auto',
      description: 'Déployez sur Vercel, Netlify avec un seul clic',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travaillez en équipe avec partage en temps réel',
      color: 'text-orange-600'
    },
    {
      icon: Palette,
      title: 'Design System',
      description: 'Composants UI modernes avec Tailwind CSS',
      color: 'text-pink-600'
    },
    {
      icon: Database,
      title: 'Base de Données',
      description: 'PostgreSQL, MongoDB, Supabase intégrés',
      color: 'text-indigo-600'
    }
  ];

  const templates = [
    {
      name: 'E-commerce',
      description: 'Boutique en ligne complète',
      icon: Globe,
      color: 'bg-blue-500',
      features: ['Panier', 'Paiement', 'Admin']
    },
    {
      name: 'Dashboard',
      description: 'Tableau de bord admin',
      icon: TrendingUp,
      color: 'bg-green-500',
      features: ['Graphiques', 'Analytics', 'Gestion']
    },
    {
      name: 'Portfolio',
      description: 'Site portfolio',
      icon: Palette,
      color: 'bg-purple-500',
      features: ['Galerie', 'Animations', 'Contact']
    },
    {
      name: 'Blog',
      description: 'Plateforme de blog',
      icon: FileText,
      color: 'bg-orange-500',
      features: ['Articles', 'Commentaires', 'SEO']
    }
  ];

  const stats = [
    { label: 'Projets Créés', value: '10,000+' },
    { label: 'Développeurs Actifs', value: '5,000+' },
    { label: 'Déploiements', value: '50,000+' },
    { label: 'Satisfaction', value: '98%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BuilderAI
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Fonctionnalités</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Tarifs</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900">Documentation</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">Se connecter</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Commencer gratuitement
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-blue-100 text-blue-800 mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Nouveau : IA GPT-4 intégrée
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Créez des applications web avec{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                l'IA
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              BuilderAI est la plateforme de développement d'applications la plus avancée. 
              Générez du code, déployez automatiquement et collaborez en temps réel avec votre équipe.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 px-8"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Commencer maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Voir la démo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Demo Video Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Démo en direct</h3>
                <p className="text-gray-300">Voyez BuilderAI en action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour développer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme complète avec tous les outils modernes pour créer, 
              déployer et gérer vos applications web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Templates prêts à l'emploi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Commencez rapidement avec nos templates professionnels, 
              personnalisables avec l'IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${template.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <template.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="space-y-1">
                    {template.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à créer votre première application ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de développeurs qui utilisent BuilderAI 
            pour créer des applications incroyables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-8"
            >
              <Github className="w-5 h-5 mr-2" />
              Commencer gratuitement
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 h-14 px-8"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Voir les exemples
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">BuilderAI</h3>
              </div>
              <p className="text-gray-400">
                La plateforme de développement d'applications avec IA.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Aide</a></li>
                <li><a href="#" className="hover:text-white">Communauté</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carrières</a></li>
                <li><a href="#" className="hover:text-white">Presse</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuilderAI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}