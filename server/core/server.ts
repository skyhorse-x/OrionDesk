import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from '../services/logger.service'
import { healthRoutes } from '../routes/health.routes'
import { systemRoutes } from '../routes/system.routes'
import { locationsRoutes } from '../routes/locations.routes'
import { settingsRoutes } from '../routes/settings.routes'

const isDev = process.env.NODE_ENV !== 'production'

export function createApp() {
  const app = new Hono()

  app.use(
    '*',
    cors({
      origin: isDev
        ? (origin) => {
            if (!origin) return true
            try {
              const url = new URL(origin)
              return url.hostname === '127.0.0.1' || url.hostname === 'localhost'
            } catch {
              return false
            }
          }
        : 'http://127.0.0.1',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: false
    })
  )
  app.use('*', async (c, next) => {
    const start = Date.now()
    await next()
    const duration = Date.now() - start
    logger.info(`${c.req.method} ${c.req.path} - ${c.res.status} (${duration}ms)`)
  })

  app.get('/health', (c) => {
    return c.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    })
  })

  app.route('/api/health', healthRoutes)
  app.route('/api/system', systemRoutes)
  app.route('/api/locations', locationsRoutes)
  app.route('/api/settings', settingsRoutes)

  app.onError((error, c) => {
    logger.error(`Error: ${error.message}`, error)
    return c.json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    }, 500)
  })

  return app
}
