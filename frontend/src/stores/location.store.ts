import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api/client'

export interface Location {
  id?: number
  name: string
  path: string
  description?: string
  icon?: string
  color?: string
  created_at?: string
  updated_at?: string
}

export const useLocationStore = defineStore('locations', () => {
  const locations = ref<Location[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const response = await api.locations.list()
      locations.value = response.data.data
    } catch (err: any) {
      error.value = err.message
      console.error('[Store] Failed to fetch locations:', err)
    } finally {
      loading.value = false
    }
  }

  async function create(location: Omit<Location, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const response = await api.locations.create(location)
      locations.value.unshift(response.data)
      return response.data
    } catch (err: any) {
      console.error('[Store] Failed to create location:', err)
      throw err
    }
  }

  async function update(id: number, data: Partial<Location>) {
    try {
      const response = await api.locations.update(id, data)
      const index = locations.value.findIndex((l: Location) => l.id === id)
      if (index !== -1) {
        locations.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      console.error('[Store] Failed to update location:', err)
      throw err
    }
  }

  async function remove(id: number) {
    try {
      await api.locations.delete(id)
      locations.value = locations.value.filter((l: Location) => l.id !== id)
    } catch (err: any) {
      console.error('[Store] Failed to delete location:', err)
      throw err
    }
  }

  return {
    locations,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove
  }
})