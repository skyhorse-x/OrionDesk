import { createApp } from './server'
import { logger } from '../services/logger.service'
import { initDatabase, closeDatabase } from '../services/database.service'
import { runMigrations } from '../services/migration.service'
import fs from 'fs'
import path from 'path'

export async function bootstrap() {
  logger.info('Starting OrionDesk backend server...')

  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
    logger.info(`Created data directory: ${dataDir}`)
  }

  initDatabase()
  runMigrations()

  const port = process.env.PORT ? parseInt(process.env.PORT) : 17870
  const host = process.env.HOST || '127.0.0.1'

  const app = createApp()

  Bun.serve({
    port,
    hostname: host,
    fetch: app.fetch,
    error: (error) => {
      logger.error(`Server error: ${error.message}`, error)
      return new Response('Internal Server Error', { status: 500 })
    }
  })

  logger.info(`Server running at http://${host}:${port}`)

  process.on('SIGINT', () => {
    logger.info('Shutting down...')
    closeDatabase()
    process.exit(0)
  })
}
