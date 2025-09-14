# 🚀 Bolt Builder

> **AI App Builder** - Generate, edit, preview and deploy web applications from natural language prompts

[![CI/CD](https://github.com/bolt-builder/bolt-builder/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/bolt-builder/bolt-builder/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

## ✨ Features

- 🤖 **AI Code Generation** - Generate complete web applications from natural language prompts
- 🎨 **Visual Editor** - Monaco Editor with syntax highlighting and IntelliSense
- 🔄 **Live Preview** - Real-time preview with WebContainers integration
- 🚀 **One-Click Deploy** - Deploy to Vercel, Netlify, or GitHub Pages
- 🔧 **Framework Support** - Next.js, Vite, Svelte, Astro
- 📱 **Responsive Design** - Mobile-first, modern UI components
- 🔒 **Secure** - Rate limiting, input sanitization, and secure defaults
- 💰 **Cost Control** - Token budgeting and usage monitoring

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Agent LLM     │    │   Runner        │
│   (Web UI)      │◄──►│   (Code Gen)    │◄──►│   (Preview)     │
│                 │    │                 │    │                 │
│ • Monaco Editor │    │ • Anthropic     │    │ • WebContainers │
│ • File Tree     │    │ • OpenAI        │    │ • Docker        │
│ • Preview Pane  │    │ • Templates     │    │ • Live Reload   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

### One-Click Setup

```bash
# Clone the repository
git clone https://github.com/bolt-builder/bolt-builder.git
cd bolt-builder

# Bootstrap the monorepo
pnpm bootstrap

# Start development servers
pnpm dev
```

### Manual Setup

```bash
# Install dependencies
pnpm install

# Start individual services
pnpm dev:web      # Web UI (http://localhost:3000)
pnpm dev:agent    # LLM Agent (http://localhost:3001)
pnpm dev:runner   # Preview Runner (http://localhost:3002)
```

## 🎯 Usage

### Generate from Prompt

```bash
# Generate a todo app
pnpm generate "Create a todo app with React and TypeScript"

# Generate with specific framework
pnpm generate "Create a blog" nextjs
```

### Convert Electron to Web

```bash
# Convert an existing Electron app
pnpm convert-electron /path/to/electron-app
```

### Web UI

1. Open http://localhost:3000
2. Enter your prompt in the input field
3. Click "Generate" to create your app
4. Edit code in the Monaco Editor
5. Preview in real-time
6. Deploy with one click

## 📁 Project Structure

```
bolt-builder/
├── webapp/           # Next.js frontend
│   ├── app/         # App Router pages
│   ├── components/  # React components
│   └── lib/         # Utilities
├── agent/           # LLM Agent service
│   ├── src/         # TypeScript source
│   └── templates/   # Code templates
├── runner/          # Preview runner
│   ├── src/         # Execution engine
│   └── docker/      # Docker configs
├── infra/           # Infrastructure
│   ├── .github/     # GitHub Actions
│   ├── vercel.json  # Vercel config
│   └── netlify.toml # Netlify config
├── scripts/         # Utility scripts
└── docs/           # Documentation
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the webapp directory:

```env
# LLM Providers
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Storage
REDIS_URL=your_redis_url

# Payments
STRIPE_SECRET_KEY=your_stripe_key

# Authentication
CLERK_SECRET_KEY=your_clerk_key
```

### Framework Templates

Supported frameworks:
- **Next.js** - Full-stack React framework
- **Vite** - Fast build tool and dev server
- **Svelte** - Compile-time optimized framework
- **Astro** - Content-focused static site generator

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod

# Or use GitHub integration
git push origin main
```

### Netlify

```bash
# Deploy to Netlify
netlify deploy --prod

# Or use GitHub integration
git push origin main
```

### Docker

```bash
# Build and run with Docker
docker-compose up --build
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# Run with coverage
pnpm test:coverage
```

## 📊 Monitoring

- **Sentry** - Error tracking and performance monitoring
- **Analytics** - Usage metrics and user behavior
- **Billing** - Cost tracking and alerts
- **Health Checks** - Service status monitoring

## 🔒 Security

- **Rate Limiting** - API request throttling
- **Input Sanitization** - Prompt and output cleaning
- **CORS** - Cross-origin resource sharing
- **Authentication** - User management and authorization
- **Secrets Management** - Secure environment variables

## 💰 Cost Control

- **Token Budgeting** - Per-user token limits
- **Caching** - Response caching to reduce API calls
- **Usage Tracking** - Monitor API usage and costs
- **Trial Mode** - Limited features for free users

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Write tests for new features
- Update documentation
- Use conventional commits

## 📚 Documentation

- [Architecture Guide](docs/architecture.md)
- [API Reference](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Security Guide](docs/security.md)
- [Contributing Guide](docs/contributing.md)

## 🆘 Support

- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Community support and discussions
- **Email** - support@bolt-builder.com
- **Documentation** - [docs.bolt-builder.com](https://docs.bolt-builder.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [WebContainers](https://webcontainers.io/) - Browser-based Node.js runtime
- [Anthropic](https://anthropic.com/) - Claude AI model
- [OpenAI](https://openai.com/) - GPT models
- [Vercel](https://vercel.com/) - Deployment platform
- [Next.js](https://nextjs.org/) - React framework

## 🗺️ Roadmap

- [ ] **Q1 2024** - Plugin system and marketplace
- [ ] **Q2 2024** - Visual prompt composer
- [ ] **Q3 2024** - GitHub integration and auto-deploy
- [ ] **Q4 2024** - Mobile app and offline support

---

<div align="center">
  <strong>Built with ❤️ by the Bolt Builder team</strong>
  <br>
  <a href="https://bolt-builder.com">Website</a> •
  <a href="https://docs.bolt-builder.com">Docs</a> •
  <a href="https://discord.gg/bolt-builder">Discord</a> •
  <a href="https://twitter.com/bolt_builder">Twitter</a>
</div>