import { Database } from 'bun:sqlite'
import { logger } from './logger.service'
import path from 'path'
import fs from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'data.db')

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  logger.info(`Created data directory: ${DATA_DIR}`)
}

export const db = new Database(DB_PATH)

export function initDatabase() {
  logger.info(`Initializing database at: ${DB_PATH}`)
  logger.info('Database initialized successfully')
}

export function closeDatabase() {
  db.close()
  logger.info('Database connection closed')
}