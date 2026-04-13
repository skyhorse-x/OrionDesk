import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api/client'

export interface UpdateInfo {
  version: string
  releaseDate: string
  releaseNotes?: string
  downloadUrl?: string
}

export const useUpdateStore = defineStore('update', () => {
  const checking = ref(false)
  const updateAvailable = ref(false)
  const updateInfo = ref<UpdateInfo | null>(null)
  const error = ref<string | null>(null)
  const lastChecked = ref<Date | null>(null)

  async function checkForUpdates(): Promise<boolean> {
    checking.value = true
    error.value = null

    try {
      const response = await api.system.info()
      const currentVersion = response.data.version || '1.0.0'

      updateInfo.value = {
        version: currentVersion,
        releaseDate: new Date().toISOString(),
        releaseNotes: 'Current version'
      }

      updateAvailable.value = false
      lastChecked.value = new Date()

      return false
    } catch (err: any) {
      error.value = err.message || 'Failed to check for updates'
      console.error('[Update] Check failed:', err)
      return false
    } finally {
      checking.value = false
    }
  }

  function reset() {
    checking.value = false
    updateAvailable.value = false
    updateInfo.value = null
    error.value = null
    lastChecked.value = null
  }

  return {
    checking,
    updateAvailable,
    updateInfo,
    error,
    lastChecked,
    checkForUpdates,
    reset
  }
})