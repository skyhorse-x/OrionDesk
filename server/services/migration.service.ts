import { db } from './database.service'
import { logger } from './logger.service'

export interface Migration {
  id: number
  name: string
  executed_at: string
}

export function runMigrations() {
  logger.info('Running database migrations...')

  db.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      executed_at TEXT DEFAULT (datetime('now'))
    )
  `)

  const migrations: { name: string; sql: string }[] = [
    {
      name: '001_create_locations',
      sql: `
        CREATE TABLE IF NOT EXISTS locations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          path TEXT NOT NULL UNIQUE,
          description TEXT,
          icon TEXT DEFAULT 'folder',
          color TEXT DEFAULT '#409EFF',
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );
        CREATE INDEX IF NOT EXISTS idx_locations_path ON locations(path);
      `
    },
    {
      name: '002_create_settings',
      sql: `
        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          type TEXT DEFAULT 'string',
          description TEXT,
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `
    },
    {
      name: '003_insert_default_settings',
      sql: `
        INSERT OR IGNORE INTO settings (key, value, type, description) VALUES
        ('app.theme', 'light', 'string', 'Application theme: light or dark'),
        ('app.language', 'zh-CN', 'string', 'Application language'),
        ('app.window.width', '1280', 'number', 'Default window width'),
        ('app.window.height', '800', 'number', 'Default window height'),
        ('app.window.maximized', 'false', 'boolean', 'Start maximized'),
        ('locations.showHidden', 'false', 'boolean', 'Show hidden files'),
        ('locations.sortBy', 'name', 'string', 'Sort locations by: name, path, created_at'),
        ('locations.sortOrder', 'asc', 'string', 'Sort order: asc or desc');
      `
    }
  ]

  for (const migration of migrations) {
    const executed = db.prepare('SELECT 1 FROM migrations WHERE name = ?').get(migration.name)

    if (!executed) {
      logger.info(`Executing migration: ${migration.name}`)
      db.run(migration.sql)
      db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name)
      logger.info(`Migration ${migration.name} completed`)
    }
  }

  logger.info('All migrations completed')
}