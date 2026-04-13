import { db } from './database.service'
import { logger } from './logger.service'

export interface Setting {
  key: string
  value: string
  type: 'string' | 'number' | 'boolean'
  description?: string
  updated_at?: string
}

export const settingService = {
  getAll(): Setting[] {
    try {
      const stmt = db.prepare('SELECT * FROM settings ORDER BY key')
      return stmt.all() as Setting[]
    } catch (error) {
      logger.error('Failed to get all settings:', error)
      return []
    }
  },

  getByKey(key: string): Setting | null {
    try {
      const stmt = db.prepare('SELECT * FROM settings WHERE key = ?')
      return stmt.get(key) as Setting | null
    } catch (error) {
      logger.error(`Failed to get setting ${key}:`, error)
      return null
    }
  },

  getValue<T = string>(key: string, defaultValue: T): T {
    const setting = this.getByKey(key)
    if (!setting) return defaultValue

    switch (setting.type) {
      case 'number':
        return Number(setting.value) as T
      case 'boolean':
        return (setting.value === 'true') as T
      default:
        return setting.value as T
    }
  },

  set(key: string, value: string, type: 'string' | 'number' | 'boolean' = 'string', description?: string): boolean {
    try {
      const stmt = db.prepare(`
        INSERT INTO settings (key, value, type, description, updated_at)
        VALUES (?, ?, ?, ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET
          value = excluded.value,
          type = excluded.type,
          description = COALESCE(excluded.description, settings.description),
          updated_at = datetime('now')
      `)
      stmt.run(key, String(value), type, description || null)
      logger.info(`Setting ${key} updated`)
      return true
    } catch (error) {
      logger.error(`Failed to set setting ${key}:`, error)
      return false
    }
  },

  delete(key: string): boolean {
    try {
      const stmt = db.prepare('DELETE FROM settings WHERE key = ?')
      stmt.run(key)
      logger.info(`Setting ${key} deleted`)
      return true
    } catch (error) {
      logger.error(`Failed to delete setting ${key}:`, error)
      return false
    }
  },

  getByPrefix(prefix: string): Setting[] {
    try {
      const stmt = db.prepare('SELECT * FROM settings WHERE key LIKE ? ORDER BY key')
      return stmt.all(`${prefix}%`) as Setting[]
    } catch (error) {
      logger.error(`Failed to get settings with prefix ${prefix}:`, error)
      return []
    }
  }
}