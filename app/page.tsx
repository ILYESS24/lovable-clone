'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">⚡</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BuilderAI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">Se connecter</Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Commencer gratuitement
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-blue-100 text-blue-800 mb-6">
              ✨ Nouveau : IA GPT-4 intégrée
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Créez des applications web avec{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                l'IA
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              BuilderAI est la plateforme de développement d'applications la plus avancée. 
              Générez du code, déployez automatiquement et collaborez en temps réel avec votre équipe.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 px-8 text-lg"
            >
              🚀 Commencer maintenant →
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg border-2"
            >
              ▶️ Voir la démo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Projets Créés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">5,000+</div>
              <div className="text-gray-600">Développeurs Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Déploiements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>

          {/* Demo Video */}
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-4xl">▶️</span>
                </div>
                <h3 className="text-3xl font-semibold mb-3">Démo en direct</h3>
                <p className="text-gray-300 text-lg">Voyez BuilderAI en action</p>
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
            {[
              {
                icon: '🤖',
                title: 'IA Intégrée',
                description: 'Générez du code avec GPT-4, Claude et d\'autres modèles IA avancés',
                color: 'text-purple-600',
                bgColor: 'bg-purple-100'
              },
              {
                icon: '💻',
                title: 'Éditeur de Code',
                description: 'Monaco Editor avec auto-complétion IA et débogage intégré',
                color: 'text-blue-600',
                bgColor: 'bg-blue-100'
              },
              {
                icon: '🌐',
                title: 'Déploiement Auto',
                description: 'Déployez sur Vercel, Netlify avec un seul clic',
                color: 'text-green-600',
                bgColor: 'bg-green-100'
              },
              {
                icon: '👥',
                title: 'Collaboration',
                description: 'Travaillez en équipe avec partage en temps réel',
                color: 'text-orange-600',
                bgColor: 'bg-orange-100'
              },
              {
                icon: '🎨',
                title: 'Design System',
                description: 'Composants UI modernes avec Tailwind CSS',
                color: 'text-pink-600',
                bgColor: 'bg-pink-100'
              },
              {
                icon: '🗄️',
                title: 'Base de Données',
                description: 'PostgreSQL, MongoDB, Supabase intégrés',
                color: 'text-indigo-600',
                bgColor: 'bg-indigo-100'
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
            {[
              {
                name: 'E-commerce',
                description: 'Boutique en ligne complète',
                icon: '🛒',
                color: 'bg-blue-500',
                features: ['Panier', 'Paiement', 'Admin']
              },
              {
                name: 'Dashboard',
                description: 'Tableau de bord admin',
                icon: '📊',
                color: 'bg-green-500',
                features: ['Graphiques', 'Analytics', 'Gestion']
              },
              {
                name: 'Portfolio',
                description: 'Site portfolio',
                icon: '🎨',
                color: 'bg-purple-500',
                features: ['Galerie', 'Animations', 'Contact']
              },
              {
                name: 'Blog',
                description: 'Plateforme de blog',
                icon: '📝',
                color: 'bg-orange-500',
                features: ['Articles', 'Commentaires', 'SEO']
              }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 ${template.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-4xl">{template.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {template.description}
                  </p>
                  <div className="space-y-2">
                    {template.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="text-green-500">✓</span>
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à créer votre première application ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de développeurs qui utilisent BuilderAI 
            pour créer des applications incroyables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-8 text-lg"
            >
              🐙 Commencer gratuitement
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 h-14 px-8 text-lg"
            >
              🌐 Voir les exemples
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold">BuilderAI</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                La plateforme de développement d'applications avec IA la plus avancée.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Produit</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Entreprise</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuilderAI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}