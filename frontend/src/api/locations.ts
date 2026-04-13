import { get, post, put, del } from '@/utils/request'

export interface LocationData {
  name: string
  path: string
  description?: string
  icon?: string
  color?: string
}

export const locationsApi = {
  list: () => get('/api/locations'),
  get: (id: number) => get(`/api/locations/${id}`),
  create: (data: LocationData) => post('/api/locations', data),
  update: (id: number, data: Partial<LocationData>) => put(`/api/locations/${id}`, data),
  delete: (id: number) => del(`/api/locations/${id}`)
}

export default locationsApi
