# 🚀 Builder AI Ultime

**Version Web de Dyad** - Constructeur d'applications IA open-source migré vers Next.js pour le déploiement web.

## ✨ Fonctionnalités

- 🎯 **Création d'applications** avec IA
- 💬 **Chat intelligent** pour le développement
- 🎨 **Interface moderne** avec Next.js 15
- 🗄️ **Base de données** SQLite avec Drizzle ORM
- 📱 **Responsive design** pour tous les appareils
- 🌐 **Déploiement Vercel** prêt à l'emploi

## 🚀 Déploiement Rapide

### Sur Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ILYESS24/builder-ai-ultime)

1. **Cliquez sur le bouton "Deploy"** ci-dessus
2. **Configurez vos clés API** dans les variables d'environnement :
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_API_KEY`
   - `OPENROUTER_API_KEY`
3. **Déployez !** 🎉

### Développement Local

```bash
# Cloner le repository
git clone https://github.com/ILYESS24/builder-ai-ultime.git
cd builder-ai-ultime

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API

# Démarrer le serveur de développement
npm run dev
```

## 📚 Documentation

- 📖 **[Guide de démarrage](README-NEXTJS.md)** - Instructions détaillées
- 🔄 **[Guide de migration](MIGRATION-GUIDE.md)** - Migration Electron → Next.js
- 📊 **[Résumé de migration](MIGRATION-SUMMARY.md)** - Vue d'ensemble

## 🛠️ Technologies

- **Frontend** : Next.js 15, React 19, TypeScript
- **UI** : Tailwind CSS, Radix UI, Framer Motion
- **Backend** : API Routes Next.js
- **Base de données** : SQLite + Drizzle ORM
- **Déploiement** : Vercel, Netlify
- **IA** : OpenAI, Anthropic, Google, OpenRouter

## 🎯 Fonctionnalités Principales

### ✅ Migrées avec Succès
- Interface utilisateur complète
- Gestion des applications
- Système de chat
- Base de données
- API REST
- Templates d'applications
- Configuration utilisateur

### 🔄 Adaptées pour le Web
- Stockage cloud (au lieu du système de fichiers local)
- Intégration GitHub/GitLab (au lieu de Git local)
- Services cloud (au lieu de processus système)

## 🚧 Limitations de la Version Web

Certaines fonctionnalités Electron ne peuvent pas être migrées vers le web :
- ❌ Système de fichiers local
- ❌ Processus système
- ❌ Git local
- ❌ Chiffrement système

**Solutions alternatives** : Services cloud, intégrations externes

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Dyad** - Application originale Electron
- **Next.js** - Framework React
- **Vercel** - Plateforme de déploiement
- **Communauté open-source** - Pour tous les packages utilisés

---

**🎊 Fait avec ❤️ par ILYESS24**

[![GitHub stars](https://img.shields.io/github/stars/ILYESS24/builder-ai-ultime?style=social)](https://github.com/ILYESS24/builder-ai-ultime)
[![GitHub forks](https://img.shields.io/github/forks/ILYESS24/builder-ai-ultime?style=social)](https://github.com/ILYESS24/builder-ai-ultime)
[![GitHub issues](https://img.shields.io/github/issues/ILYESS24/builder-ai-ultime)](https://github.com/ILYESS24/builder-ai-ultime/issues)