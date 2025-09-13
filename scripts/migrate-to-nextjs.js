#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Migration de Dyad Electron vers Next.js...\n');

// 1. Sauvegarder l'ancien package.json
const oldPackageJson = require('../package.json');
fs.writeFileSync('package-electron-backup.json', JSON.stringify(oldPackageJson, null, 2));
console.log('✅ Sauvegarde de package.json créée (package-electron-backup.json)');

// 2. Remplacer package.json par la version Next.js
const nextjsPackageJson = require('../package-nextjs.json');
fs.writeFileSync('package.json', JSON.stringify(nextjsPackageJson, null, 2));
console.log('✅ package.json mis à jour pour Next.js');

// 3. Créer les dossiers nécessaires
const dirs = ['app', 'lib', 'components/ui', 'hooks'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Dossier créé: ${dir}`);
  }
});

// 4. Copier les fichiers de configuration
const configFiles = [
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'drizzle.config.ts',
  'vercel.json'
];

configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Configuration ${file} déjà présente`);
  } else {
    console.log(`⚠️  Fichier de configuration manquant: ${file}`);
  }
});

// 5. Créer le fichier .env.local
if (!fs.existsSync('.env.local')) {
  fs.copyFileSync('.env.example', '.env.local');
  console.log('✅ Fichier .env.local créé à partir de .env.example');
}

console.log('\n🎉 Migration terminée !');
console.log('\n📋 Prochaines étapes:');
console.log('1. npm install');
console.log('2. Configurer vos clés API dans .env.local');
console.log('3. npm run dev');
console.log('4. Déployer sur Vercel !');
console.log('\n📖 Consultez README-NEXTJS.md pour plus d\'informations');
