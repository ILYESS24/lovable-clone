# Configuration de Dyad Web pour Windows
Write-Host "🚀 Configuration de Dyad Web..." -ForegroundColor Green
Write-Host ""

# Vérifier Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Veuillez installer Node.js 20+" -ForegroundColor Red
    exit 1
}

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

# Créer le fichier .env.local
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Création du fichier .env.local..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Fichier .env.local créé" -ForegroundColor Green
    Write-Host "⚠️  N'oubliez pas de configurer vos clés API dans .env.local" -ForegroundColor Yellow
} else {
    Write-Host "✅ Fichier .env.local existe déjà" -ForegroundColor Green
}

# Créer le dossier userData
if (-not (Test-Path "userData")) {
    Write-Host "📁 Création du dossier userData..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "userData" -Force
    Write-Host "✅ Dossier userData créé" -ForegroundColor Green
} else {
    Write-Host "✅ Dossier userData existe déjà" -ForegroundColor Green
}

# Initialiser la base de données
Write-Host "🗄️  Initialisation de la base de données..." -ForegroundColor Yellow
npm run db:push

Write-Host ""
Write-Host "🎉 Configuration terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Éditez .env.local et ajoutez vos clés API" -ForegroundColor White
Write-Host "2. Lancez le serveur de développement: npm run dev" -ForegroundColor White
Write-Host "3. Ouvrez http://localhost:3000 dans votre navigateur" -ForegroundColor White
Write-Host ""
Write-Host "📖 Consultez README-NEXTJS.md pour plus d'informations" -ForegroundColor Cyan
Write-Host "📖 Consultez MIGRATION-GUIDE.md pour le guide complet" -ForegroundColor Cyan
