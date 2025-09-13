# Dyad Web - Version Web de l'Application

Cette version web de Dyad a été migrée depuis l'application Electron originale pour permettre le déploiement sur Vercel et d'autres plateformes web.

## 🚀 Déploiement sur Vercel

### 1. Préparation

1. **Forkez ce repository** sur GitHub
2. **Connectez votre compte Vercel** à GitHub
3. **Configurez les variables d'environnement** dans Vercel

### 2. Variables d'environnement requises

Dans le dashboard Vercel, ajoutez ces variables :

```bash
# Base de données (optionnel - utilise SQLite par défaut)
DATABASE_URL=file:./userData/sqlite.db

# Fournisseurs d'IA
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
OPENROUTER_API_KEY=...

# Analytics (optionnel)
NEXT_PUBLIC_POSTHOG_KEY=phc_5Vxx0XT8Ug3eWROhP6mm4D6D2DgIIKT232q4AKxC2ab
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 3. Déploiement

1. **Importez le projet** dans Vercel
2. **Sélectionnez le framework** : Next.js
3. **Configurez les variables d'environnement**
4. **Déployez** !

## 🛠️ Développement local

### Prérequis

- Node.js 20+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <votre-repo>
cd dyad-web

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Configurer vos clés API dans .env.local
```

### Démarrage

```bash
# Mode développement
npm run dev

# Build de production
npm run build
npm start
```

## 📁 Structure du projet

```
├── app/                    # App Router Next.js
│   ├── api/               # API Routes (remplace IPC)
│   ├── apps/              # Pages des applications
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── ui/               # Composants UI de base
│   └── apps/             # Composants spécifiques aux apps
├── lib/                  # Utilitaires et configuration
│   ├── db/               # Configuration base de données
│   ├── api-client.ts     # Client API (remplace IpcClient)
│   └── utils.ts          # Utilitaires
├── drizzle/              # Migrations base de données
└── src/                  # Code original (référence)
```

## 🔄 Migration depuis Electron

### Changements principaux

1. **IPC → API Routes** : Le système IPC Electron a été remplacé par des API routes Next.js
2. **Base de données** : SQLite local adapté pour le web
3. **Système de fichiers** : Adapté pour les contraintes web
4. **Processus** : Les processus Node.js sont gérés différemment

### Fonctionnalités adaptées

- ✅ Gestion des applications
- ✅ Interface utilisateur
- ✅ Base de données
- ✅ API de base
- ⚠️ Chat streaming (en cours)
- ⚠️ Exécution d'applications (limité)
- ❌ Système de fichiers local
- ❌ Git local
- ❌ Processus système

## 🚧 Limitations de la version web

### Fonctionnalités non disponibles

1. **Système de fichiers local** : Pas d'accès direct au système de fichiers
2. **Processus système** : Limité par les contraintes du navigateur
3. **Git local** : Nécessite une intégration avec des services externes
4. **Exécution d'applications** : Limité aux environnements sandbox

### Solutions alternatives

1. **Stockage** : Utiliser des services cloud (Supabase, Neon)
2. **Git** : Intégration GitHub/GitLab
3. **Déploiement** : Vercel, Netlify, etc.
4. **Base de données** : PostgreSQL, MySQL via services cloud

## 🔧 Configuration avancée

### Base de données externe

Pour utiliser une base de données externe (PostgreSQL, MySQL) :

1. **Modifiez `lib/db/index.ts`** pour utiliser le driver approprié
2. **Configurez `DATABASE_URL`** avec votre chaîne de connexion
3. **Adaptez les migrations** Drizzle

### Intégrations

- **GitHub** : Pour la gestion des repositories
- **Vercel** : Pour le déploiement automatique
- **Supabase** : Pour la base de données et l'authentification
- **Neon** : Pour PostgreSQL serverless

## 📝 Notes importantes

1. **Sécurité** : Les clés API sont stockées côté serveur
2. **Performance** : Optimisé pour Vercel Edge Functions
3. **Scalabilité** : Conçu pour gérer plusieurs utilisateurs
4. **Compatibilité** : Compatible avec l'API originale

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

MIT - Voir le fichier LICENSE original
