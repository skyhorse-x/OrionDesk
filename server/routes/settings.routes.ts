import { Hono } from 'hono'
import { settingService } from '../services/setting.service'

export const settingsRoutes = new Hono()

settingsRoutes.get('/', (c) => {
  const settings = settingService.getAll()
  return c.json({ data: settings })
})

settingsRoutes.get('/:key', (c) => {
  const key = decodeURIComponent(c.req.param('key'))
  const setting = settingService.getByKey(key)

  if (!setting) {
    c.status(404)
    return c.json({ error: 'Setting not found' })
  }
  return c.json(setting)
})

settingsRoutes.get('/prefix/:prefix', (c) => {
  const prefix = decodeURIComponent(c.req.param('prefix'))
  const settings = settingService.getByPrefix(prefix)
  return c.json({ data: settings })
})

settingsRoutes.post('/', async (c) => {
  const body = await c.req.json()
  const { key, value, type, description } = body

  if (!key || value === undefined) {
    c.status(400)
    return c.json({ error: 'Key and value are required' })
  }

  const validTypes = ['string', 'number', 'boolean']
  const settingType = type || 'string'
  if (!validTypes.includes(settingType)) {
    c.status(400)
    return c.json({ error: 'Invalid type. Must be string, number, or boolean' })
  }

  if (settingService.set(key, String(value), settingType, description)) {
    const setting = settingService.getByKey(key)
    c.status(201)
    return c.json(setting)
  } else {
    c.status(500)
    return c.json({ error: 'Failed to create setting' })
  }
})

settingsRoutes.put('/:key', async (c) => {
  const key = decodeURIComponent(c.req.param('key'))
  const body = await c.req.json()
  const { value, type, description } = body

  const existing = settingService.getByKey(key)
  if (!existing) {
    c.status(404)
    return c.json({ error: 'Setting not found' })
  }

  if (value === undefined) {
    c.status(400)
    return c.json({ error: 'Value is required' })
  }

  const validTypes = ['string', 'number', 'boolean']
  const settingType = type || existing.type
  if (!validTypes.includes(settingType)) {
    c.status(400)
    return c.json({ error: 'Invalid type' })
  }

  if (settingService.set(key, String(value), settingType, description)) {
    const setting = settingService.getByKey(key)
    return c.json(setting)
  } else {
    c.status(500)
    return c.json({ error: 'Failed to update setting' })
  }
})

settingsRoutes.delete('/:key', (c) => {
  const key = decodeURIComponent(c.req.param('key'))

  const existing = settingService.getByKey(key)
  if (!existing) {
    c.status(404)
    return c.json({ error: 'Setting not found' })
  }

  if (settingService.delete(key)) {
    return c.json({ message: 'Setting deleted successfully' })
  } else {
    c.status(500)
    return c.json({ error: 'Failed to delete setting' })
  }
})