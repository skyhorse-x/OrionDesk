<template>
  <div class="window-control-demo">
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">🪟</span>
          <span>Custom Window Title Bar</span>
        </div>
      </template>
      <div class="demo-tip">
        <span class="tip-icon">💡</span>
        <span>After enabling, the custom title bar will replace the native window frame</span>
      </div>

      <el-form label-width="140px" class="control-form">
        <el-form-item label="Hide Native Frame">
          <el-switch
            v-model="customTitleBar"
            @change="onTitleBarChange"
            :disabled="changing"
          />
        </el-form-item>

        <el-form-item label="Drag Area">
          <div class="drag-area">
            <span class="drag-text">Drag Area - Custom Title Bar</span>
            <div class="window-controls">
              <el-button circle size="small" @click="minimizeWindow" :disabled="!customTitleBar">
                <span class="btn-icon">➖</span>
              </el-button>
              <el-button circle size="small" @click="maximizeWindow" :disabled="!customTitleBar">
                <span class="btn-icon">⬜</span>
              </el-button>
              <el-button circle size="small" @click="closeApp" type="danger" :disabled="!customTitleBar">
                <span class="btn-icon">✕</span>
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="Window State">
          <el-tag :type="isMaximized ? 'success' : 'info'">
            {{ isMaximized ? 'Maximized' : 'Normal' }}
          </el-tag>
        </el-form-item>
      </el-form>

      <div class="demo-actions">
        <el-button type="primary" @click="saveSettings" :loading="saving">
          <span class="btn-icon">💾</span>
          Save Settings
        </el-button>
        <el-button @click="resetSettings">
          Reset
        </el-button>
      </div>
    </el-card>

    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">🎛️</span>
          <span>Window Control</span>
        </div>
      </template>
      <div class="button-group">
        <el-button type="default" @click="minimizeWindow" :disabled="!customTitleBar">
          <span class="btn-icon">➖</span>
          Minimize
        </el-button>
        <el-button type="default" @click="maximizeWindow" :disabled="!customTitleBar">
          <span class="btn-icon">⬜</span>
          Maximize
        </el-button>
        <el-button type="warning" @click="restoreWindow" :disabled="!customTitleBar">
          <span class="btn-icon">↩️</span>
          Restore
        </el-button>
        <el-button type="danger" @click="closeApp">
          <span class="btn-icon">✕</span>
          Close App
        </el-button>
      </div>
    </el-card>

    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">ℹ️</span>
          <span>Tips</span>
        </div>
      </template>
      <div class="tips-content">
        <p>1. After hiding native window frame, you need to implement window dragging and control buttons yourself</p>
        <p>2. Set <code>window.frame: false</code> in <code>neutralino.config.json</code> to hide native frame</p>
        <p>3. Custom title bar needs to listen for window state changes to keep maximize/restore in sync</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useSettingStore } from '@/stores'

const settingStore = useSettingStore()

const customTitleBar = ref(false)
const isMaximized = ref(false)
const changing = ref(false)
const saving = ref(false)

const isNeutralino = () => typeof window !== 'undefined' && !!window.Neutralino

let nlReady = false

const ensureNeutralinoReady = async (): Promise<boolean> => {
  if (!isNeutralino()) return false
  if (nlReady) return true

  return new Promise((resolve) => {
    if (window.Neutralino && typeof window.Neutralino.computer?.getOSInfo === 'function') {
      nlReady = true
      resolve(true)
      return
    }
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
  const saved = settingStore.getValue<boolean>('window.customTitleBar', false)
  customTitleBar.value = saved
}

const saveSettings = async () => {
  saving.value = true
  try {
    await settingStore.update('window.customTitleBar', String(customTitleBar.value))
    ElMessage.success('Settings saved')
  } catch (error) {
    ElMessage.error('Save failed')
  } finally {
    saving.value = false
  }
}

const resetSettings = () => {
  customTitleBar.value = false
  saveSettings()
}

const onTitleBarChange = async (value: boolean) => {
  changing.value = true
  const ready = await ensureNeutralinoReady()
  if (ready) {
    try {
      ElMessage.success(value ? 'Settings recorded, effective after restart: Enable custom title bar' : 'Settings recorded, effective after restart: Restore native frame')
    } catch (error) {
      console.error('Setting failed:', error)
      customTitleBar.value = !value
    }
  } else {
    ElMessage.warning('Only available in Neutralino desktop app, settings will be saved and effective after restart')
  }
  changing.value = false
}

const minimizeWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  try {
    await getNeutralino().window.minimize()
  } catch (error) {
    console.error(error)
  }
}

const maximizeWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  try {
    await getNeutralino().window.maximize()
    isMaximized.value = true
  } catch (error) {
    console.error(error)
  }
}

const restoreWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  try {
    await getNeutralino().window.restore()
    isMaximized.value = false
  } catch (error) {
    console.error(error)
  }
}

const closeApp = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  try {
    await getNeutralino().app.exit()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadSettings()
  if (isNeutralino() && window.Neutralino) {
    window.Neutralino.init()
  }
})
</script>

<style scoped>
.window-control-demo {
  max-width: 700px;
}

.demo-card {
  border-radius: 16px;
  border: none;
  margin-bottom: 20px;
}

.demo-card :deep(.el-card__header) {
  background: white;
  border-bottom: 1px solid var(--od-border);
  padding: 14px 18px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 14px;
}

.card-icon {
  font-size: 17px;
}

.demo-tip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--od-primary-light);
  border-radius: 10px;
  margin-bottom: 20px;
  color: var(--od-primary);
  font-size: 13px;
}

.tip-icon {
  font-size: 16px;
}

.control-form {
  padding: 10px 0;
}

.drag-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, var(--od-primary) 0%, #818cf8 100%);
  border-radius: 10px;
  padding: 0 14px;
  box-sizing: border-box;
  -webkit-app-region: drag;
}

.drag-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.window-controls {
  display: flex;
  gap: 8px;
  -webkit-app-region: no-drag;
}

.btn-icon {
  font-size: 12px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--od-border);
}

.tips-content {
  font-size: 13px;
  line-height: 1.8;
  color: var(--od-text-secondary);
}

.tips-content p {
  margin: 0 0 8px 0;
}

.tips-content code {
  background: var(--od-hover);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--od-primary);
}
</style>
