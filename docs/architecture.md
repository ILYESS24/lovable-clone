# Architecture du Bolt Builder

## Vue d'ensemble

Bolt Builder est un AI app builder complet qui permet de générer, éditer, prévisualiser et déployer des applications web à partir de prompts naturels.

## Architecture Générale

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Agent LLM     │    │   Runner        │
│   (Web UI)      │◄──►│   (Code Gen)    │◄──►│   (Preview)     │
│                 │    │                 │    │                 │
│ • Monaco Editor │    │ • Anthropic     │    │ • WebContainers │
│ • File Tree     │    │ • OpenAI        │    │ • Docker        │
│ • Preview Pane  │    │ • Templates     │    │ • Live Reload   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Infrastructure │
                    │                 │
                    │ • Vercel/Netlify│
                    │ • GitHub Actions│
                    │ • Supabase      │
                    │ • Stripe        │
                    └─────────────────┘
```

## Composants Principaux

### 1. Frontend (webapp/)
- **Framework**: Next.js 15 avec App Router
- **Éditeur**: Monaco Editor intégré
- **UI**: React + Tailwind CSS + Radix UI
- **État**: Zustand pour la gestion d'état
- **Preview**: Iframe avec communication sécurisée

### 2. Agent LLM (agent/)
- **Providers**: Anthropic Claude (primary), OpenAI (fallback)
- **Templates**: Système de templates modulaires
- **Cache**: Redis pour la mise en cache des réponses
- **Rate Limiting**: Limitation des appels API
- **Streaming**: Réponses en temps réel

### 3. Runner (runner/)
- **WebContainers**: Exécution dans le navigateur
- **Docker**: Fallback pour l'exécution locale
- **Live Reload**: Rechargement automatique
- **Build System**: Support Next.js, Vite, Svelte, Astro

### 4. Infrastructure (infra/)
- **Déploiement**: Vercel, Netlify, GitHub Pages
- **CI/CD**: GitHub Actions
- **Base de données**: Supabase PostgreSQL
- **Stockage**: Supabase Storage, S3
- **Paiements**: Stripe
- **Auth**: Clerk, Auth0

## Flux de Données

### 1. Génération d'Application
```
Prompt → Agent LLM → Templates → Code → Validation → Preview
```

### 2. Édition en Temps Réel
```
Monaco Editor → File System → Build → Preview Update
```

### 3. Déploiement
```
Code → Build → Deploy → URL → Monitoring
```

## Sécurité

- **Sanitisation**: Nettoyage des prompts et outputs
- **Rate Limiting**: Limitation des appels API
- **RLS**: Row Level Security sur la base de données
- **Secrets**: Gestion sécurisée des clés API
- **CORS**: Configuration stricte des CORS

## Performance

- **Caching**: Cache intelligent des réponses LLM
- **CDN**: Distribution globale du contenu
- **Lazy Loading**: Chargement à la demande
- **Bundle Splitting**: Optimisation des bundles

## Monitoring

- **Sentry**: Gestion des erreurs
- **Analytics**: Métriques d'utilisation
- **Billing**: Surveillance des coûts
- **Health Checks**: Vérification de l'état des services

## Extensibilité

- **Plugins**: Système de plugins modulaire
- **Templates**: Templates personnalisables
- **Providers**: Support de nouveaux providers LLM
- **Frameworks**: Support de nouveaux frameworks

## Coûts et Limites

- **Token Budget**: Limitation des tokens par utilisateur
- **Trial Mode**: Mode d'essai avec restrictions
- **Usage Tracking**: Suivi de l'utilisation
- **Cost Alerts**: Alertes de coût
