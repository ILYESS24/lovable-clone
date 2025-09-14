# Comment Utiliser Bolt Builder

## 🚀 Démarrage Rapide

### 1. Installation

```bash
# Cloner le repository
git clone https://github.com/bolt-builder/bolt-builder.git
cd bolt-builder

# Installer les dépendances
pnpm bootstrap

# Démarrer les services
pnpm dev
```

### 2. Configuration des Variables d'Environnement

Créez un fichier `.env.local` dans le dossier `webapp/` :

```env
# Providers LLM (au moins un requis)
ANTHROPIC_API_KEY=sk-ant-api03-...
OPENAI_API_KEY=sk-...

# Base de données (optionnel)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cache Redis (optionnel)
REDIS_URL=redis://localhost:6379

# Paiements (optionnel)
STRIPE_SECRET_KEY=sk_test_...

# Authentification (optionnel)
CLERK_SECRET_KEY=sk_test_...
```

### 3. Obtenir les Clés API

#### Anthropic Claude (Recommandé)
1. Allez sur [console.anthropic.com](https://console.anthropic.com)
2. Créez un compte ou connectez-vous
3. Générez une clé API
4. Ajoutez-la à votre `.env.local`

#### OpenAI (Alternative)
1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Créez un compte ou connectez-vous
3. Générez une clé API
4. Ajoutez-la à votre `.env.local`

## 🎯 Utilisation

### Interface Web

1. **Ouvrez** http://localhost:3000
2. **Tapez** votre prompt dans le champ de saisie
3. **Cliquez** sur "Générer" ou appuyez sur Entrée
4. **Attendez** la génération (2-5 secondes)
5. **Éditez** le code dans l'éditeur Monaco
6. **Prévisualisez** en temps réel
7. **Déployez** avec un clic

### Exemples de Prompts

```
# Application de gestion de tâches
"Crée une application de gestion de tâches avec React et TypeScript"

# Blog moderne
"Crée un blog moderne avec Next.js, Tailwind CSS et un système de commentaires"

# Dashboard analytique
"Crée un dashboard analytique avec des graphiques et des métriques en temps réel"

# E-commerce
"Crée une boutique en ligne avec panier, paiement et gestion des commandes"

# Portfolio
"Crée un portfolio personnel avec animations et sections pour projets"
```

### Ligne de Commande

```bash
# Générer une application
pnpm generate "Crée une application de gestion de tâches"

# Générer avec un framework spécifique
pnpm generate "Crée un blog" nextjs

# Convertir une app Electron
pnpm convert-electron /chemin/vers/app-electron
```

## 🔧 Configuration Avancée

### Templates Personnalisés

Créez vos propres templates dans `agent/templates/` :

```typescript
// agent/templates/custom-template.ts
export const customTemplate = {
  name: 'Custom Template',
  description: 'Template personnalisé pour mes projets',
  files: {
    'package.json': '...',
    'src/App.tsx': '...'
  }
};
```

### Frameworks Supportés

- **Next.js** - Framework React full-stack
- **Vite** - Outil de build rapide
- **Svelte** - Framework compilé
- **Astro** - Générateur de sites statiques

### Personnalisation de l'Éditeur

L'éditeur Monaco peut être personnalisé :

```typescript
// Configuration de l'éditeur
const editorOptions = {
  theme: 'vs-dark',
  fontSize: 14,
  minimap: { enabled: false },
  wordWrap: 'on',
  automaticLayout: true
};
```

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Netlify

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod
```

### Docker

```bash
# Construire l'image
docker build -t bolt-builder .

# Lancer le conteneur
docker run -p 3000:3000 bolt-builder
```

## 🧪 Tests

### Tests Unitaires

```bash
# Lancer tous les tests
pnpm test

# Tests avec couverture
pnpm test:coverage

# Tests en mode watch
pnpm test:watch
```

### Tests d'Intégration

```bash
# Tests d'API
pnpm test:integration

# Tests E2E avec Playwright
pnpm test:e2e
```

## 🔍 Débogage

### Logs de Développement

```bash
# Activer les logs détaillés
DEBUG=bolt-builder:* pnpm dev

# Logs spécifiques
DEBUG=bolt-builder:agent pnpm dev:agent
```

### Problèmes Courants

#### Erreur "No LLM providers available"
- Vérifiez que vos clés API sont correctes
- Assurez-vous que les variables d'environnement sont chargées

#### Erreur "Build failed"
- Vérifiez la syntaxe du code généré
- Consultez les logs du runner

#### Erreur "Preview not loading"
- Vérifiez que le runner est démarré
- Consultez les logs WebSocket

## 📊 Monitoring

### Métriques de Performance

- **Temps de génération** - Mesuré automatiquement
- **Taux de succès** - Suivi des builds réussis/échoués
- **Utilisation des tokens** - Coût des appels LLM

### Alertes

Configurez des alertes pour :
- Échecs de génération
- Dépassement de budget
- Erreurs critiques

## 🔒 Sécurité

### Limitation de Taux

```typescript
// Configuration du rate limiting
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 10, // 10 requêtes
  duration: 60, // par minute
});
```

### Sanitisation des Entrées

Tous les prompts sont automatiquement nettoyés :
- Suppression des scripts malveillants
- Validation des types de données
- Échappement des caractères spéciaux

## 💰 Gestion des Coûts

### Budget de Tokens

```typescript
// Limite par utilisateur
const tokenBudget = {
  daily: 10000,    // 10k tokens/jour
  monthly: 100000, // 100k tokens/mois
  perRequest: 1000 // 1k tokens/requête
};
```

### Mode Trial

Pour les utilisateurs gratuits :
- Limite de 5 générations/jour
- Templates de base uniquement
- Pas de déploiement automatique

## 🆘 Support

### Ressources

- **Documentation** - [docs.bolt-builder.com](https://docs.bolt-builder.com)
- **GitHub Issues** - [github.com/bolt-builder/bolt-builder/issues](https://github.com/bolt-builder/bolt-builder/issues)
- **Discord** - [discord.gg/bolt-builder](https://discord.gg/bolt-builder)

### Contact

- **Email** - support@bolt-builder.com
- **Twitter** - [@bolt_builder](https://twitter.com/bolt_builder)

## 📈 Prochaines Étapes

1. **Explorez** les templates disponibles
2. **Créez** vos premiers projets
3. **Personnalisez** l'éditeur selon vos besoins
4. **Déployez** vos applications
5. **Partagez** vos créations avec la communauté

---

**Besoin d'aide ?** Rejoignez notre [Discord](https://discord.gg/bolt-builder) ou consultez la [documentation complète](https://docs.bolt-builder.com).
