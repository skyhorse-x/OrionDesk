import axios from 'axios'

const API_PORT = 17870
const isDev = import.meta.env.DEV

const apiClient = axios.create({
  baseURL: isDev ? '' : `http://127.0.0.1:${API_PORT}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`[API Error] ${error.config?.url}:`, error.message)
    return Promise.reject(error)
  }
)

export const api = {
  health: {
    status: () => apiClient.get('/health'),
    check: () => apiClient.get('/api/health')
  },

  system: {
    info: () => apiClient.get('/api/system/info'),
    openDirectory: (directory: string) =>
      apiClient.post('/api/system/open-directory', { directory }),
    sendNotification: (title: string, content: string) =>
      apiClient.post('/api/system/notification', { title, content }),
    clipboard: {
      read: () => apiClient.post('/api/system/clipboard', { action: 'read' }),
      write: (text: string) => apiClient.post('/api/system/clipboard', { action: 'write', text })
    },
    execCommand: (command: string) =>
      apiClient.post('/api/system/exec-command', { command }),
    dialog: {
      message: (type: string, title: string, message: string) =>
        apiClient.post('/api/system/dialog/message', { type, title, message }),
      open: (title?: string, directory?: boolean) =>
        apiClient.post('/api/system/dialog/open', { title, directory }),
      save: (title?: string, defaultPath?: string) =>
        apiClient.post('/api/system/dialog/save', { title, defaultPath })
    }
  },

  locations: {
    list: () => apiClient.get('/api/locations'),
    get: (id: number) => apiClient.get(`/api/locations/${id}`),
    create: (data: { name: string; path: string; description?: string; icon?: string; color?: string }) =>
      apiClient.post('/api/locations', data),
    update: (id: number, data: Partial<{ name: string; path: string; description?: string; icon?: string; color?: string }>) =>
      apiClient.put(`/api/locations/${id}`, data),
    delete: (id: number) => apiClient.delete(`/api/locations/${id}`)
  },

  settings: {
    list: () => apiClient.get('/api/settings'),
    get: (key: string) => apiClient.get(`/api/settings/${encodeURIComponent(key)}`),
    getByPrefix: (prefix: string) => apiClient.get(`/api/settings/prefix/${encodeURIComponent(prefix)}`),
    set: (key: string, value: string, type?: string, description?: string) =>
      apiClient.post('/api/settings', { key, value, type, description }),
    update: (key: string, value: string, type?: string, description?: string) =>
      apiClient.put(`/api/settings/${encodeURIComponent(key)}`, { value, type, description }),
    delete: (key: string) => apiClient.delete(`/api/settings/${encodeURIComponent(key)}`)
  }
}

export default apiClient
