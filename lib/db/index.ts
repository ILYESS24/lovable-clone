import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import fs from 'fs';

// Database connection factory
let _db: ReturnType<typeof drizzle> | null = null;

/**
 * Get the database path for web environment
 */
function getDatabasePath(): string {
  // In web environment, use a local database file
  const dbDir = path.join(process.cwd(), 'userData');
  const dbPath = path.join(dbDir, 'sqlite.db');
  
  // Ensure directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  return dbPath;
}

/**
 * Initialize the database connection for web
 */
export function initializeDatabase() {
  if (_db) return _db;

  const dbPath = getDatabasePath();
  console.log('Initializing database at:', dbPath);

  // Check if the database file exists and remove it if it has issues
  try {
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      if (stats.size < 100) {
        console.log('Database file exists but may be corrupted. Removing it...');
        fs.unlinkSync(dbPath);
      }
    }
  } catch (error) {
    console.error('Error checking database file:', error);
  }

  const sqlite = new Database(dbPath, { timeout: 10000 });
  sqlite.pragma('foreign_keys = ON');

  _db = drizzle(sqlite, { schema });

  try {
    const migrationsFolder = path.join(process.cwd(), 'drizzle');
    if (!fs.existsSync(migrationsFolder)) {
      console.error('Migrations folder not found:', migrationsFolder);
    } else {
      console.log('Running migrations from:', migrationsFolder);
      migrate(_db, { migrationsFolder });
    }
  } catch (error) {
    console.error('Migration error:', error);
  }

  return _db;
}

/**
 * Get the database instance (throws if not initialized)
 */
export function getDb() {
  if (!_db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return _db;
}

// Export the database instance
export const db = new Proxy({} as any, {
  get(target, prop) {
    const database = getDb();
    return database[prop as keyof typeof database];
  },
}) as ReturnType<typeof drizzle<typeof schema>>;
