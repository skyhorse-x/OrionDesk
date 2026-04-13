import { get, post, put, del } from '@/utils/request'

export interface SettingData {
  key: string
  value: string
  type?: string
  description?: string
}

export const settingsApi = {
  list: () => get('/api/settings'),
  get: (key: string) => get(`/api/settings/${encodeURIComponent(key)}`),
  getByPrefix: (prefix: string) => get(`/api/settings/prefix/${encodeURIComponent(prefix)}`),
  set: (data: SettingData) => post('/api/settings', data),
  update: (key: string, value: string, type?: string) =>
    put(`/api/settings/${encodeURIComponent(key)}`, { value, type }),
  delete: (key: string) => del(`/api/settings/${encodeURIComponent(key)}`)
}

export default settingsApi
