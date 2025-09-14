import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import chokidar from 'chokidar';
import { nanoid } from 'nanoid';
import compression from 'compression';
import helmet from 'helmet';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Types
export interface Project {
  id: string;
  name: string;
  files: Record<string, string>;
  framework: 'nextjs' | 'vite' | 'svelte' | 'astro';
  status: 'building' | 'running' | 'error' | 'stopped';
  url?: string;
  port?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BuildResult {
  success: boolean;
  output?: string;
  error?: string;
  url?: string;
  port?: number;
}

// Configuration
const config = {
  port: process.env.PORT || 3001,
  maxProjects: 100,
  buildTimeout: 300000, // 5 minutes
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};

// Rate Limiter
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: config.rateLimit.max,
  duration: config.rateLimit.windowMs / 1000
});

// In-memory storage (in production, use Redis or database)
const projects = new Map<string, Project>();
const activeBuilds = new Map<string, any>();

// Express App
const app = express();
const server = createServer(app);

// WebSocket Server
const wss = new WebSocketServer({ server });

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting middleware
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rej) {
    res.status(429).json({ error: 'Too many requests' });
  }
});

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    projects: projects.size,
    activeBuilds: activeBuilds.size
  });
});

// Create new project
app.post('/projects', async (req, res) => {
  try {
    const { name, files, framework = 'nextjs' } = req.body;
    
    if (!name || !files) {
      return res.status(400).json({ error: 'Name and files are required' });
    }

    if (projects.size >= config.maxProjects) {
      return res.status(429).json({ error: 'Maximum number of projects reached' });
    }

    const project: Project = {
      id: nanoid(),
      name,
      files,
      framework,
      status: 'building',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.set(project.id, project);

    // Start build process
    const buildResult = await buildProject(project);
    
    if (buildResult.success) {
      project.status = 'running';
      project.url = buildResult.url;
      project.port = buildResult.port;
    } else {
      project.status = 'error';
    }

    project.updatedAt = new Date().toISOString();
    projects.set(project.id, project);

    // Notify WebSocket clients
    broadcastProjectUpdate(project);

    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get project
app.get('/projects/:id', (req, res) => {
  const project = projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Update project files
app.put('/projects/:id/files', async (req, res) => {
  try {
    const project = projects.get(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { files } = req.body;
    if (!files) {
      return res.status(400).json({ error: 'Files are required' });
    }

    project.files = files;
    project.updatedAt = new Date().toISOString();
    projects.set(project.id, project);

    // Trigger rebuild
    project.status = 'building';
    const buildResult = await buildProject(project);
    
    if (buildResult.success) {
      project.status = 'running';
      project.url = buildResult.url;
      project.port = buildResult.port;
    } else {
      project.status = 'error';
    }

    project.updatedAt = new Date().toISOString();
    projects.set(project.id, project);

    // Notify WebSocket clients
    broadcastProjectUpdate(project);

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
app.delete('/projects/:id', (req, res) => {
  const project = projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  // Stop the project if running
  if (project.status === 'running') {
    stopProject(project);
  }

  projects.delete(req.params.id);
  activeBuilds.delete(req.params.id);

  res.json({ success: true });
});

// Get all projects
app.get('/projects', (req, res) => {
  const projectList = Array.from(projects.values());
  res.json(projectList);
});

// Build project
async function buildProject(project: Project): Promise<BuildResult> {
  try {
    // Simulate build process
    // In a real implementation, this would:
    // 1. Create a temporary directory
    // 2. Write files to disk
    // 3. Install dependencies
    // 4. Build the project
    // 5. Start the development server
    // 6. Return the URL and port

    const buildId = nanoid();
    activeBuilds.set(project.id, { buildId, startTime: Date.now() });

    // Simulate build time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a random port
    const port = 3000 + Math.floor(Math.random() * 1000);
    const url = `http://localhost:${port}`;

    activeBuilds.delete(project.id);

    return {
      success: true,
      output: 'Build completed successfully',
      url,
      port
    };
  } catch (error) {
    console.error('Build error:', error);
    activeBuilds.delete(project.id);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown build error'
    };
  }
}

// Stop project
function stopProject(project: Project): void {
  // In a real implementation, this would:
  // 1. Stop the development server
  // 2. Clean up temporary files
  // 3. Release the port
  
  console.log(`Stopping project ${project.id}`);
}

// WebSocket handling
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      switch (data.type) {
        case 'subscribe':
          // Subscribe to project updates
          ws.projectId = data.projectId;
          break;
        case 'ping':
          ws.send(JSON.stringify({ type: 'pong' }));
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Broadcast project update to subscribed clients
function broadcastProjectUpdate(project: Project): void {
  const message = JSON.stringify({
    type: 'projectUpdate',
    project
  });

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN && client.projectId === project.id) {
      client.send(message);
    }
  });
}

// File watching for live reload
function setupFileWatcher(project: Project): void {
  // In a real implementation, this would watch for file changes
  // and trigger rebuilds automatically
}

// Cleanup old projects
setInterval(() => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const [id, project] of projects.entries()) {
    const projectAge = now - new Date(project.createdAt).getTime();
    if (projectAge > maxAge) {
      console.log(`Cleaning up old project: ${id}`);
      if (project.status === 'running') {
        stopProject(project);
      }
      projects.delete(id);
      activeBuilds.delete(id);
    }
  }
}, 60 * 60 * 1000); // Run every hour

// Start server
server.listen(config.port, () => {
  console.log(`🚀 Bolt Runner server running on port ${config.port}`);
  console.log(`📊 Health check: http://localhost:${config.port}/health`);
  console.log(`🔌 WebSocket: ws://localhost:${config.port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  
  // Stop all running projects
  for (const project of projects.values()) {
    if (project.status === 'running') {
      stopProject(project);
    }
  }
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app, server, wss };
