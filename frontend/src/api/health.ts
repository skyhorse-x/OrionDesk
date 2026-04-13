import { get, post, del } from '@/utils/request'

export const healthApi = {
  status: () => get('/health'),
  check: () => get('/api/health')
}

export default healthApi
