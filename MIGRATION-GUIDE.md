# 🚀 Guide de Migration : Dyad Electron → Next.js Web

Ce guide détaille la migration complète de l'application Dyad d'Electron vers Next.js pour le déploiement web.

## 📋 Résumé de la Migration

### ✅ Fonctionnalités Migrées

1. **Interface Utilisateur**
   - Composants React adaptés pour Next.js
   - Système de routage avec App Router
   - Composants UI avec Radix UI et Tailwind CSS

2. **Base de Données**
   - SQLite avec Drizzle ORM
   - Migrations adaptées pour le web
   - Schéma de données préservé

3. **API Backend**
   - IPC Electron → API Routes Next.js
   - Client API unifié
   - Gestion des erreurs et validation

4. **Configuration**
   - Variables d'environnement
   - Configuration Vercel
   - TypeScript et ESLint

### ⚠️ Limitations de la Version Web

1. **Système de Fichiers**
   - Pas d'accès direct au système de fichiers local
   - Stockage limité aux contraintes du navigateur

2. **Processus Système**
   - Pas d'exécution de processus Node.js côté client
   - Limité par les contraintes de sécurité du navigateur

3. **Git Local**
   - Nécessite une intégration avec des services externes
   - GitHub/GitLab pour la gestion des repositories

## 🛠️ Architecture de la Migration

### Avant (Electron)
```
┌─────────────────┐    IPC    ┌─────────────────┐
│   Renderer      │ ←──────→  │   Main Process  │
│   (React)       │           │   (Node.js)     │
└─────────────────┘           └─────────────────┘
                                      │
                                      ▼
                               ┌─────────────────┐
                               │   SQLite DB     │
                               │   File System   │
                               │   Git           │
                               └─────────────────┘
```

### Après (Next.js)
```
┌─────────────────┐   HTTP    ┌─────────────────┐
│   Frontend      │ ←──────→  │   API Routes    │
│   (React)       │           │   (Next.js)     │
└─────────────────┘           └─────────────────┘
                                      │
                                      ▼
                               ┌─────────────────┐
                               │   SQLite DB     │
                               │   (Web)         │
                               └─────────────────┘
```

## 📁 Structure des Fichiers

### Nouveaux Fichiers Créés

```
├── app/                          # App Router Next.js
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── globals.css              # Styles globaux
│   ├── providers.tsx            # Providers React
│   ├── apps/                    # Pages des applications
│   │   ├── page.tsx            # Liste des apps
│   │   └── [id]/page.tsx       # Détail d'une app
│   └── api/                     # API Routes
│       ├── apps/               # API des applications
│       └── chats/              # API des chats
├── components/                   # Composants React
│   ├── ui/                     # Composants UI de base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── apps/                   # Composants spécifiques
│       ├── AppsList.tsx
│       ├── AppCard.tsx
│       ├── CreateAppButton.tsx
│       └── AppDetail.tsx
├── lib/                         # Utilitaires
│   ├── db/                     # Configuration DB
│   │   ├── index.ts           # Connexion DB
│   │   └── schema.ts          # Schéma (référence)
│   ├── api-client.ts          # Client API
│   ├── toast.ts               # Notifications
│   └── utils.ts               # Utilitaires
├── hooks/                      # Hooks React
│   └── use-toast.ts
├── next.config.js             # Configuration Next.js
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
├── drizzle.config.ts          # Configuration Drizzle
├── vercel.json                # Configuration Vercel
├── .env.example               # Variables d'environnement
└── README-NEXTJS.md           # Documentation
```

## 🔄 Mapping des Fonctionnalités

### IPC → API Routes

| IPC Channel | API Route | Description |
|-------------|-----------|-------------|
| `list-apps` | `GET /api/apps` | Lister les applications |
| `create-app` | `POST /api/apps` | Créer une application |
| `get-app` | `GET /api/apps/[id]` | Récupérer une app |
| `delete-app` | `DELETE /api/apps/[id]` | Supprimer une app |
| `get-chats` | `GET /api/chats` | Lister les chats |
| `create-chat` | `POST /api/chats` | Créer un chat |
| `get-user-settings` | `GET /api/settings` | Paramètres utilisateur |
| `set-user-settings` | `POST /api/settings` | Modifier paramètres |

### Composants Migrés

| Composant Original | Composant Next.js | Changements |
|-------------------|-------------------|-------------|
| `IpcClient` | `ApiClient` | HTTP au lieu d'IPC |
| `useQuery` hooks | `useQuery` hooks | Même logique, nouvelle source |
| UI Components | UI Components | Adaptés pour Next.js |
| Router (TanStack) | App Router | Migration vers Next.js Router |

## 🚀 Instructions de Déploiement

### 1. Préparation Locale

```bash
# 1. Cloner le repository
git clone <votre-repo>
cd dyad-web

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API

# 4. Initialiser la base de données
npm run db:push

# 5. Démarrer en développement
npm run dev
```

### 2. Déploiement Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter à Vercel
vercel login

# 3. Déployer
vercel

# 4. Configurer les variables d'environnement
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
# ... autres clés API
```

### 3. Configuration Vercel

Dans le dashboard Vercel :

1. **Variables d'environnement** :
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_API_KEY`
   - `OPENROUTER_API_KEY`
   - `DATABASE_URL` (optionnel)

2. **Build Settings** :
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

## 🔧 Personnalisation Avancée

### Base de Données Externe

Pour utiliser PostgreSQL ou MySQL :

```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
```

### Intégrations Externes

1. **GitHub** : Pour la gestion des repositories
2. **Supabase** : Pour l'authentification et la base de données
3. **Vercel** : Pour le déploiement automatique
4. **Neon** : Pour PostgreSQL serverless

### Streaming Chat

Pour implémenter le chat streaming :

```typescript
// app/api/chat/stream/route.ts
export async function GET(request: Request) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Logique de streaming
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

## 🐛 Résolution de Problèmes

### Erreurs Communes

1. **Base de données** :
   ```bash
   # Réinitialiser la base de données
   rm -rf userData/sqlite.db
   npm run db:push
   ```

2. **Dépendances** :
   ```bash
   # Nettoyer et réinstaller
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build** :
   ```bash
   # Vérifier les types
   npm run type-check
   
   # Build en mode debug
   DEBUG=* npm run build
   ```

### Logs et Debug

```typescript
// Ajouter des logs dans les API routes
console.log('API Request:', { method, url, body });

// Utiliser les DevTools du navigateur
// Network tab pour voir les requêtes API
```

## 📊 Performance et Optimisation

### Optimisations Implémentées

1. **Code Splitting** : Automatique avec Next.js
2. **Image Optimization** : Next.js Image component
3. **API Caching** : TanStack Query
4. **Bundle Analysis** : `npm run build` avec analyse

### Métriques à Surveiller

1. **Core Web Vitals** : LCP, FID, CLS
2. **API Response Times** : < 200ms pour les requêtes simples
3. **Database Queries** : Optimisation des requêtes Drizzle
4. **Bundle Size** : < 1MB pour le JavaScript initial

## 🔒 Sécurité

### Mesures Implémentées

1. **Variables d'environnement** : Clés API côté serveur uniquement
2. **Validation** : Zod pour la validation des données
3. **CORS** : Configuration appropriée
4. **Rate Limiting** : À implémenter selon les besoins

### Recommandations

1. **HTTPS** : Obligatoire en production
2. **Secrets** : Rotation régulière des clés API
3. **Monitoring** : Surveillance des erreurs et performances
4. **Backup** : Sauvegarde régulière de la base de données

## 📈 Évolutions Futures

### Fonctionnalités à Ajouter

1. **Authentification** : Supabase Auth ou NextAuth.js
2. **Collaboration** : Partage d'applications entre utilisateurs
3. **Templates** : Marketplace de templates
4. **Analytics** : Métriques d'utilisation
5. **Mobile** : PWA ou application mobile

### Améliorations Techniques

1. **Real-time** : WebSockets pour les mises à jour en temps réel
2. **Offline** : Support du mode hors ligne
3. **Caching** : Cache Redis pour les performances
4. **CDN** : Distribution globale du contenu

## 📞 Support

Pour toute question ou problème :

1. **Documentation** : Consultez README-NEXTJS.md
2. **Issues** : Ouvrez une issue sur GitHub
3. **Discussions** : Utilisez les discussions GitHub
4. **Email** : Contactez l'équipe de développement

---

**🎉 Félicitations !** Votre application Dyad est maintenant prête pour le web et peut être déployée sur Vercel ou toute autre plateforme Next.js.
