#!/bin/bash

echo "🚀 Configuration de Dyad Web..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 20+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ requis. Version actuelle: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Créer le fichier .env.local
if [ ! -f ".env.local" ]; then
    echo "📝 Création du fichier .env.local..."
    cp .env.example .env.local
    echo "✅ Fichier .env.local créé"
    echo "⚠️  N'oubliez pas de configurer vos clés API dans .env.local"
else
    echo "✅ Fichier .env.local existe déjà"
fi

# Créer le dossier userData
if [ ! -d "userData" ]; then
    echo "📁 Création du dossier userData..."
    mkdir -p userData
    echo "✅ Dossier userData créé"
else
    echo "✅ Dossier userData existe déjà"
fi

# Initialiser la base de données
echo "🗄️  Initialisation de la base de données..."
npm run db:push

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Éditez .env.local et ajoutez vos clés API"
echo "2. Lancez le serveur de développement: npm run dev"
echo "3. Ouvrez http://localhost:3000 dans votre navigateur"
echo ""
echo "📖 Consultez README-NEXTJS.md pour plus d'informations"
echo "📖 Consultez MIGRATION-GUIDE.md pour le guide complet"
