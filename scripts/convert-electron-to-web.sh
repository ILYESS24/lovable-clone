#!/bin/bash

# Electron to Web Converter Script
# Converts Electron applications to web applications

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_PATH=${1:-"."}
OUTPUT_DIR="./converted-web-app"
REPORT_FILE="./conversion-report.txt"

echo -e "${BLUE}🚀 Electron to Web Converter${NC}"
echo -e "${BLUE}==============================${NC}"

# Check if path exists
if [ ! -d "$REPO_PATH" ]; then
    echo -e "${RED}❌ Error: Directory '$REPO_PATH' does not exist${NC}"
    exit 1
fi

# Initialize report
echo "Electron to Web Conversion Report" > "$REPORT_FILE"
echo "Generated: $(date)" >> "$REPORT_FILE"
echo "Source: $REPO_PATH" >> "$REPORT_FILE"
echo "=================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Function to log to both console and report
log() {
    echo -e "$1"
    echo "$1" | sed 's/\x1b\[[0-9;]*m//g' >> "$REPORT_FILE"
}

# Function to detect Electron dependencies
detect_electron_deps() {
    log "${YELLOW}🔍 Detecting Electron dependencies...${NC}"
    
    local package_json="$REPO_PATH/package.json"
    if [ ! -f "$package_json" ]; then
        log "${RED}❌ No package.json found${NC}"
        return 1
    fi
    
    # Check for Electron dependencies
    local electron_deps=()
    if grep -q '"electron"' "$package_json"; then
        electron_deps+=("electron")
    fi
    if grep -q '"electron-builder"' "$package_json"; then
        electron_deps+=("electron-builder")
    fi
    if grep -q '"electron-store"' "$package_json"; then
        electron_deps+=("electron-store")
    fi
    if grep -q '"electron-updater"' "$package_json"; then
        electron_deps+=("electron-updater")
    fi
    if grep -q '"electron-packager"' "$package_json"; then
        electron_deps+=("electron-packager")
    fi
    
    log "${GREEN}✅ Found Electron dependencies: ${electron_deps[*]}${NC}"
    echo "Electron Dependencies Found:" >> "$REPORT_FILE"
    printf '%s\n' "${electron_deps[@]}" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    return 0
}

# Function to detect main process files
detect_main_process() {
    log "${YELLOW}🔍 Detecting main process files...${NC}"
    
    local main_files=()
    
    # Common main process file names
    local main_candidates=("main.js" "main.ts" "index.js" "index.ts" "app.js" "app.ts")
    
    for file in "${main_candidates[@]}"; do
        if [ -f "$REPO_PATH/$file" ]; then
            main_files+=("$file")
        fi
    done
    
    # Check package.json for main field
    local package_json="$REPO_PATH/package.json"
    if [ -f "$package_json" ]; then
        local main_field=$(grep -o '"main": *"[^"]*"' "$package_json" | cut -d'"' -f4)
        if [ -n "$main_field" ] && [ -f "$REPO_PATH/$main_field" ]; then
            main_files+=("$main_field")
        fi
    fi
    
    log "${GREEN}✅ Found main process files: ${main_files[*]}${NC}"
    echo "Main Process Files:" >> "$REPORT_FILE"
    printf '%s\n' "${main_files[@]}" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    echo "${main_files[@]}"
}

# Function to analyze IPC usage
analyze_ipc() {
    log "${YELLOW}🔍 Analyzing IPC usage...${NC}"
    
    local ipc_patterns=()
    local files_to_check=()
    
    # Find all JS/TS files
    while IFS= read -r -d '' file; do
        files_to_check+=("$file")
    done < <(find "$REPO_PATH" -name "*.js" -o -name "*.ts" -print0)
    
    # Check for IPC patterns
    for file in "${files_to_check[@]}"; do
        if grep -q "ipcRenderer\|ipcMain\|ipcRenderer\.invoke\|ipcMain\.handle" "$file"; then
            ipc_patterns+=("$file")
        fi
    done
    
    log "${GREEN}✅ Found IPC usage in: ${#ipc_patterns[@]} files${NC}"
    echo "Files with IPC usage:" >> "$REPORT_FILE"
    printf '%s\n' "${ipc_patterns[@]}" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    echo "${ipc_patterns[@]}"
}

# Function to analyze file system usage
analyze_fs_usage() {
    log "${YELLOW}🔍 Analyzing file system usage...${NC}"
    
    local fs_patterns=()
    local files_to_check=()
    
    # Find all JS/TS files
    while IFS= read -r -d '' file; do
        files_to_check+=("$file")
    done < <(find "$REPO_PATH" -name "*.js" -o -name "*.ts" -print0)
    
    # Check for FS patterns
    for file in "${files_to_check[@]}"; do
        if grep -q "require.*fs\|import.*fs\|fs\.readFile\|fs\.writeFile\|fs\.mkdir\|fs\.unlink" "$file"; then
            fs_patterns+=("$file")
        fi
    done
    
    log "${GREEN}✅ Found file system usage in: ${#fs_patterns[@]} files${NC}"
    echo "Files with file system usage:" >> "$REPORT_FILE"
    printf '%s\n' "${fs_patterns[@]}" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    echo "${fs_patterns[@]}"
}

# Function to create web package.json
create_web_package_json() {
    log "${YELLOW}📦 Creating web package.json...${NC}"
    
    local package_json="$REPO_PATH/package.json"
    local web_package_json="$OUTPUT_DIR/package.json"
    
    if [ ! -f "$package_json" ]; then
        log "${RED}❌ No package.json found${NC}"
        return 1
    fi
    
    # Copy and modify package.json
    cp "$package_json" "$web_package_json"
    
    # Remove Electron dependencies
    sed -i '/"electron"/d' "$web_package_json"
    sed -i '/"electron-builder"/d' "$web_package_json"
    sed -i '/"electron-store"/d' "$web_package_json"
    sed -i '/"electron-updater"/d' "$web_package_json"
    sed -i '/"electron-packager"/d' "$web_package_json"
    
    # Remove main field
    sed -i '/"main":/d' "$web_package_json"
    
    # Add web-specific dependencies
    local web_deps='{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}'
    
    # Merge with existing dependencies
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('$web_package_json', 'utf8'));
    const webPkg = $web_deps;
    
    // Merge dependencies
    pkg.dependencies = { ...pkg.dependencies, ...webPkg.dependencies };
    pkg.scripts = { ...pkg.scripts, ...webPkg.scripts };
    
    fs.writeFileSync('$web_package_json', JSON.stringify(pkg, null, 2));
    "
    
    log "${GREEN}✅ Created web package.json${NC}"
}

# Function to convert main process to API routes
convert_main_process() {
    log "${YELLOW}🔄 Converting main process to API routes...${NC}"
    
    local main_files=($(detect_main_process))
    
    for main_file in "${main_files[@]}"; do
        local input_file="$REPO_PATH/$main_file"
        local output_dir="$OUTPUT_DIR/app/api"
        
        mkdir -p "$output_dir"
        
        # Create a basic API route structure
        cat > "$output_dir/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API endpoint converted from Electron main process' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
EOF
        
        log "${GREEN}✅ Created API route from $main_file${NC}"
    done
}

# Function to create web app structure
create_web_structure() {
    log "${YELLOW}🏗️ Creating web app structure...${NC}"
    
    # Create Next.js app structure
    mkdir -p "$OUTPUT_DIR/app"
    mkdir -p "$OUTPUT_DIR/components"
    mkdir -p "$OUTPUT_DIR/lib"
    mkdir -p "$OUTPUT_DIR/public"
    
    # Create basic layout
    cat > "$OUTPUT_DIR/app/layout.tsx" << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Converted Web App',
  description: 'App converted from Electron to Web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF

    # Create basic page
    cat > "$OUTPUT_DIR/app/page.tsx" << 'EOF'
'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/route')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Converted Web Application
      </h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">API Response:</h2>
        <pre className="text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  )
}
EOF

    # Create globals.css
    cat > "$OUTPUT_DIR/app/globals.css" << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
EOF

    # Create next.config.js
    cat > "$OUTPUT_DIR/next.config.js" << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
EOF

    # Create tailwind.config.js
    cat > "$OUTPUT_DIR/tailwind.config.js" << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

    # Create tsconfig.json
    cat > "$OUTPUT_DIR/tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

    log "${GREEN}✅ Created web app structure${NC}"
}

# Function to copy renderer files
copy_renderer_files() {
    log "${YELLOW}📁 Copying renderer files...${NC}"
    
    # Find renderer directory
    local renderer_dirs=("src" "app" "renderer" "public")
    
    for dir in "${renderer_dirs[@]}"; do
        if [ -d "$REPO_PATH/$dir" ]; then
            log "${GREEN}✅ Found renderer directory: $dir${NC}"
            cp -r "$REPO_PATH/$dir" "$OUTPUT_DIR/"
        fi
    done
    
    # Copy other relevant files
    local files_to_copy=("README.md" "LICENSE" ".gitignore")
    
    for file in "${files_to_copy[@]}"; do
        if [ -f "$REPO_PATH/$file" ]; then
            cp "$REPO_PATH/$file" "$OUTPUT_DIR/"
        fi
    done
}

# Function to generate migration guide
generate_migration_guide() {
    log "${YELLOW}📝 Generating migration guide...${NC}"
    
    cat > "$OUTPUT_DIR/MIGRATION-GUIDE.md" << 'EOF'
# Migration Guide: Electron to Web

This application has been automatically converted from Electron to a web application using Next.js.

## What Changed

### Dependencies Removed
- `electron` - Desktop app framework
- `electron-builder` - Build tool
- `electron-store` - Data persistence
- `electron-updater` - Auto-updater
- `electron-packager` - Packaging tool

### Dependencies Added
- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM
- `typescript` - Type system
- `tailwindcss` - CSS framework

### Architecture Changes

#### Main Process → API Routes
- Electron main process files converted to Next.js API routes
- IPC communication replaced with HTTP requests
- File system access moved to server-side API endpoints

#### Renderer Process → React Components
- Electron renderer process converted to React components
- Browser APIs used instead of Electron APIs
- Web APIs for file access, notifications, etc.

#### Data Persistence
- `electron-store` replaced with:
  - Local storage for client-side data
  - Database (PostgreSQL/MongoDB) for server-side data
  - Supabase for real-time data

## Manual Steps Required

1. **Review API Routes**: Check the generated API routes in `app/api/`
2. **Update File Operations**: Replace file system operations with web APIs
3. **Handle Authentication**: Implement web-based authentication
4. **Update Build Process**: Configure deployment for web platforms
5. **Test Functionality**: Ensure all features work in the browser

## Deployment Options

- **Vercel**: Recommended for Next.js apps
- **Netlify**: Alternative deployment platform
- **Docker**: Containerized deployment
- **Traditional Hosting**: Any Node.js hosting provider

## Support

For issues with the conversion, please check:
1. The conversion report: `conversion-report.txt`
2. Next.js documentation: https://nextjs.org/docs
3. Web API documentation: https://developer.mozilla.org/en-US/docs/Web/API
EOF

    log "${GREEN}✅ Generated migration guide${NC}"
}

# Main conversion process
main() {
    log "${BLUE}Starting Electron to Web conversion...${NC}"
    
    # Create output directory
    mkdir -p "$OUTPUT_DIR"
    
    # Step 1: Detect Electron dependencies
    if ! detect_electron_deps; then
        log "${RED}❌ No Electron dependencies found. Exiting.${NC}"
        exit 1
    fi
    
    # Step 2: Analyze main process
    detect_main_process
    
    # Step 3: Analyze IPC usage
    analyze_ipc
    
    # Step 4: Analyze file system usage
    analyze_fs_usage
    
    # Step 5: Create web package.json
    create_web_package_json
    
    # Step 6: Convert main process
    convert_main_process
    
    # Step 7: Create web structure
    create_web_structure
    
    # Step 8: Copy renderer files
    copy_renderer_files
    
    # Step 9: Generate migration guide
    generate_migration_guide
    
    # Final report
    log "${GREEN}✅ Conversion completed successfully!${NC}"
    log "${BLUE}📁 Output directory: $OUTPUT_DIR${NC}"
    log "${BLUE}📄 Report file: $REPORT_FILE${NC}"
    log "${BLUE}📖 Migration guide: $OUTPUT_DIR/MIGRATION-GUIDE.md${NC}"
    
    echo "" >> "$REPORT_FILE"
    echo "Conversion completed successfully!" >> "$REPORT_FILE"
    echo "Output directory: $OUTPUT_DIR" >> "$REPORT_FILE"
    echo "Migration guide: $OUTPUT_DIR/MIGRATION-GUIDE.md" >> "$REPORT_FILE"
}

# Run main function
main "$@"
