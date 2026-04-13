import { Hono } from 'hono'
import { locationService } from '../services/location.service'

export const locationsRoutes = new Hono()

locationsRoutes.get('/', (c) => {
  const locations = locationService.getAll()
  return c.json({ data: locations, total: locations.length })
})

locationsRoutes.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    c.status(400)
    return c.json({ error: 'Invalid location ID' })
  }

  const location = locationService.getById(id)
  if (!location) {
    c.status(404)
    return c.json({ error: 'Location not found' })
  }
  return c.json(location)
})

locationsRoutes.post('/', async (c) => {
  const body = await c.req.json()
  const { name, path, description, icon, color } = body

  if (!name || !path) {
    c.status(400)
    return c.json({ error: 'Name and path are required' })
  }

  if (locationService.existsByPath(path)) {
    c.status(409)
    return c.json({ error: 'Location path already exists' })
  }

  const location = locationService.create({ name, path, description, icon, color })
  if (location) {
    c.status(201)
    return c.json(location)
  } else {
    c.status(500)
    return c.json({ error: 'Failed to create location' })
  }
})

locationsRoutes.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    c.status(400)
    return c.json({ error: 'Invalid location ID' })
  }

  const body = await c.req.json()
  const { name, path, description, icon, color } = body
  const location = locationService.update(id, { name, path, description, icon, color })

  if (location) {
    return c.json(location)
  } else {
    c.status(404)
    return c.json({ error: 'Location not found' })
  }
})

locationsRoutes.delete('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    c.status(400)
    return c.json({ error: 'Invalid location ID' })
  }

  if (locationService.delete(id)) {
    return c.json({ message: 'Location deleted successfully' })
  } else {
    c.status(404)
    return c.json({ error: 'Location not found' })
  }
})