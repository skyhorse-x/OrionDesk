import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'server'),
      '@shared': path.resolve(__dirname, 'server/shared'),
      '@services': path.resolve(__dirname, 'server/services'),
      '@routes': path.resolve(__dirname, 'server/routes'),
      '@middleware': path.resolve(__dirname, 'server/middleware'),
      '@core': path.resolve(__dirname, 'server/core')
    }
  }
})