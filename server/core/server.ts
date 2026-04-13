import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from '../services/logger.service'
import { healthRoutes } from '../routes/health.routes'
import { systemRoutes } from '../routes/system.routes'
import { locationsRoutes } from '../routes/locations.routes'
import { settingsRoutes } from '../routes/settings.routes'

export function createApp() {
  const app = new Hono()

  app.use('*', cors())
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
