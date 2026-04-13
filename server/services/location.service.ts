import { db } from './database.service'
import { logger } from './logger.service'

export interface Location {
  id?: number
  name: string
  path: string
  description?: string
  icon?: string
  color?: string
  created_at?: string
  updated_at?: string
}

export const locationService = {
  getAll(): Location[] {
    try {
      const stmt = db.prepare('SELECT * FROM locations ORDER BY created_at DESC')
      return stmt.all() as Location[]
    } catch (error) {
      logger.error('Failed to get all locations:', error)
      return []
    }
  },

  getById(id: number): Location | null {
    try {
      const stmt = db.prepare('SELECT * FROM locations WHERE id = ?')
      return stmt.get(id) as Location | null
    } catch (error) {
      logger.error(`Failed to get location ${id}:`, error)
      return null
    }
  },

  create(location: Omit<Location, 'id' | 'created_at' | 'updated_at'>): Location | null {
    try {
      const stmt = db.prepare(`
        INSERT INTO locations (name, path, description, icon, color)
        VALUES (?, ?, ?, ?, ?)
      `)
      const result = stmt.run(
        location.name,
        location.path,
        location.description || null,
        location.icon || 'folder',
        location.color || '#409EFF'
      )
      logger.info(`Location created with id: ${result.lastInsertRowid}`)
      return this.getById(Number(result.lastInsertRowid))
    } catch (error) {
      logger.error('Failed to create location:', error)
      return null
    }
  },

  update(id: number, location: Partial<Location>): Location | null {
    try {
      const existing = this.getById(id)
      if (!existing) return null

      const stmt = db.prepare(`
        UPDATE locations
        SET name = ?, path = ?, description = ?, icon = ?, color = ?,
            updated_at = datetime('now')
        WHERE id = ?
      `)
      stmt.run(
        location.name ?? existing.name,
        location.path ?? existing.path,
        location.description ?? existing.description,
        location.icon ?? existing.icon,
        location.color ?? existing.color,
        id
      )
      logger.info(`Location ${id} updated`)
      return this.getById(id)
    } catch (error) {
      logger.error(`Failed to update location ${id}:`, error)
      return null
    }
  },

  delete(id: number): boolean {
    try {
      const stmt = db.prepare('DELETE FROM locations WHERE id = ?')
      stmt.run(id)
      logger.info(`Location ${id} deleted`)
      return true
    } catch (error) {
      logger.error(`Failed to delete location ${id}:`, error)
      return false
    }
  },

  existsByPath(path: string): boolean {
    try {
      const stmt = db.prepare('SELECT 1 FROM locations WHERE path = ?')
      return stmt.get(path) !== undefined
    } catch (error) {
      logger.error('Failed to check location path:', error)
      return false
    }
  }
}