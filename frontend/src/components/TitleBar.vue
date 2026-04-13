<template>
  <div class="title-bar" @mousedown="handleDragStart" v-if="showTitleBar">
    <div class="title-bar-drag">
      <span class="title-bar-icon">◆</span>
      <span class="title-bar-title">{{ title }}</span>
    </div>
    <div class="title-bar-controls">
      <button class="title-btn minimize" @click.stop="minimize" title="Minimize">
        <span>➖</span>
      </button>
      <button class="title-btn maximize" @click.stop="toggleMaximize" :title="isMaximized ? 'Restore' : 'Maximize'">
        <span>{{ isMaximized ? '❐' : '⬜' }}</span>
      </button>
      <button class="title-btn close" @click.stop="close" title="Close">
        <span>✕</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingStore } from '@/stores'

const settingStore = useSettingStore()

const showTitleBar = ref(false)
const isMaximized = ref(false)
const title = ref('OrionDesk')

const isNeutralino = () => typeof window !== 'undefined' && !!window.Neutralino

let nlReady = false

const ensureNeutralinoReady = async (): Promise<boolean> => {
  if (!isNeutralino()) return false
  if (nlReady) return true

  return new Promise((resolve) => {
    const checkReady = () => {
      if (window.Neutralino?.computer?.getOSInfo) {
        nlReady = true
        resolve(true)
        return true
      }
      return false
    }
    if (checkReady()) return
    window.addEventListener('Neutralino.ready', () => {
      nlReady = true
      resolve(true)
    })
    setTimeout(() => resolve(false), 5000)
  })
}

const getNeutralino = () => {
  if (!window.Neutralino) throw new Error('Neutralino is not available')
  return window.Neutralino
}

const loadSettings = async () => {
  await settingStore.fetchAll()
  const customTitleBar = settingStore.getValue<boolean>('app.window.customTitleBar', false)
  showTitleBar.value = customTitleBar
}

const minimize = async () => {
  const ready = await ensureNeutralinoReady()
  if (ready) {
    try {
      await getNeutralino().window.minimize()
    } catch (error) {
      console.error('Minimize failed:', error)
    }
  }
}

const toggleMaximize = async () => {
  const ready = await ensureNeutralinoReady()
  if (ready) {
    try {
      if (isMaximized.value) {
        await getNeutralino().window.unmaximize()
      } else {
        await getNeutralino().window.maximize()
      }
      isMaximized.value = !isMaximized.value
    } catch (error) {
      console.error('Maximize/Restore failed:', error)
    }
  }
}

const close = async () => {
  const ready = await ensureNeutralinoReady()
  if (ready) {
    try {
      await getNeutralino().app.exit()
    } catch (error) {
      console.error('Close failed:', error)
    }
  }
}

const handleDragStart = async (event: MouseEvent) => {
  if ((event.target as HTMLElement).closest('.title-bar-controls')) {
    return
  }

  const ready = await ensureNeutralinoReady()
  if (ready) {
    try {
      await getNeutralino().window.maximize()
      isMaximized.value = true
    } catch (error) {
      console.error('Drag maximize failed:', error)
    }
  }
}

onMounted(async () => {
  await loadSettings()
  if (isNeutralino() && window.Neutralino) {
    window.Neutralino.init()
  }
})
</script>

<style scoped>
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  background: linear-gradient(135deg, var(--od-bg-sidebar) 0%, #1e293b 100%);
  color: white;
  user-select: none;
  -webkit-app-region: drag;
}

.title-bar-drag {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 14px;
  gap: 10px;
  height: 100%;
}

.title-bar-icon {
  font-size: 14px;
  color: var(--od-primary);
}

.title-bar-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.title-bar-controls {
  display: flex;
  height: 100%;
  -webkit-app-region: no-drag;
}

.title-btn {
  width: 48px;
  height: 100%;
  border: none;
  background: transparent;
  color: white;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.title-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.title-btn.close:hover {
  background-color: #ef4444;
}
</style>
