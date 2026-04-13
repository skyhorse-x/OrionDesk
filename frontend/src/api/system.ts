import { get, post } from '@/utils/request'

export const systemApi = {
  info: () => get('/api/system/info'),
  openDirectory: (directory: string) => post('/api/system/open-directory', { directory }),
  sendNotification: (title: string, content: string) =>
    post('/api/system/notification', { title, content }),
  clipboard: {
    read: () => post('/api/system/clipboard', { action: 'read' }),
    write: (text: string) => post('/api/system/clipboard', { action: 'write', text })
  },
  execCommand: (command: string) => post('/api/system/exec-command', { command }),
  dialog: {
    message: (type: string, title: string, message: string) =>
      post('/api/system/dialog/message', { type, title, message }),
    open: (title?: string, directory?: boolean) =>
      post('/api/system/dialog/open', { title, directory }),
    save: (title?: string, defaultPath?: string) =>
      post('/api/system/dialog/save', { title, defaultPath })
  }
}

export default systemApi
