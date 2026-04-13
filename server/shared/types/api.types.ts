export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ErrorResponse {
  success: false
  error: {
    message: string
    stack?: string
  }
}

export interface HealthCheckResponse {
  status: string
  timestamp: string
  uptime: number
}

export interface SystemInfoResponse {
  platform: string
  nodeVersion: string
  memoryUsage: NodeJS.MemoryUsage
  cpuUsage: NodeJS.CpuUsage
}