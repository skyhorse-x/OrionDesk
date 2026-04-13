import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { settingsApi } from '../api/settings'

export interface Setting {
  key: string
  value: string
  type: 'string' | 'number' | 'boolean'
  description?: string
  updated_at?: string
}

export const useSettingStore = defineStore('settings', () => {
  const settings = ref<Record<string, Setting>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const get = computed(() => (key: string): Setting | undefined => {
    return settings.value[key]
  })

  const getValue = computed(() => <T = string>(key: string, defaultValue: T): T => {
    const setting = settings.value[key]
    if (!setting) return defaultValue

    switch (setting.type) {
      case 'number':
        return Number(setting.value) as T
      case 'boolean':
        return (setting.value === 'true') as T
      default:
        return setting.value as T
    }
  })

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const response = await settingsApi.list()
      const settingsMap: Record<string, Setting> = {}
      for (const s of response.data.data) {
        settingsMap[s.key] = s
      }
      settings.value = settingsMap
    } catch (err: any) {
      error.value = err.message
      console.error('[Store] Failed to fetch settings:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchByPrefix(prefix: string) {
    try {
      const response = await settingsApi.getByPrefix(prefix)
      for (const s of response.data.data) {
        settings.value[s.key] = s
      }
    } catch (err: any) {
      console.error(`[Store] Failed to fetch settings with prefix ${prefix}:`, err)
      throw err
    }
  }

  async function update(key: string, value: string) {
    try {
      const response = await settingsApi.update(key, value)
      settings.value[key] = response.data
      return response.data
    } catch (err: any) {
      console.error(`[Store] Failed to update setting ${key}:`, err)
      throw err
    }
  }

  return {
    settings,
    loading,
    error,
    get,
    getValue,
    fetchAll,
    fetchByPrefix,
    update
  }
})