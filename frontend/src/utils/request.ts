import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const API_PORT = 17870
const isDev = import.meta.env.DEV

const request: AxiosInstance = axios.create({
  baseURL: isDev ? '' : `http://127.0.0.1:${API_PORT}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(`[API Error] ${(error.config as AxiosRequestConfig)?.url}:`, error.message)
    return Promise.reject(error)
  }
)

export interface RequestConfig extends AxiosRequestConfig {}

export const get = <T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>> => {
  return request.get<T>(url, config)
}

export const post = <T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> => {
  return request.post<T>(url, data, config)
}

export const put = <T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> => {
  return request.put<T>(url, data, config)
}

export const del = <T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>> => {
  return request.delete<T>(url, config)
}

export default request
