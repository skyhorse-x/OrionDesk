<template>
  <div class="home-view">
    <el-card class="welcome-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="card-icon"><MagicStick /></el-icon>
          <span>{{ t('home.welcome') }}</span>
        </div>
      </template>
      <p class="welcome-text">{{ t('home.subtitle') }}</p>
    </el-card>

    <el-card class="github-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="card-icon"><Link /></el-icon>
          <span>{{ t('home.githubDoc') }}</span>
        </div>
      </template>
      <div class="card-content">
        <p class="github-desc">{{ t('home.githubDocDesc') }}</p>
        <el-button type="primary" @click="openGitHubDoc">
          <el-icon><Position /></el-icon>
          {{ t('home.viewDoc') }}
        </el-button>
      </div>
    </el-card>

    <div class="demo-grid">
      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Monitor /></el-icon>
            <span>{{ t('home.systemInfo') }}</span>
          </div>
        </template>
        <div class="card-content">
          <el-button type="primary" @click="getSystemInfo" :loading="sysLoading">
            <el-icon><Search /></el-icon>
            {{ t('home.getSystemInfo') }}
          </el-button>
          <pre v-if="systemInfo" class="output-pre">{{ systemInfo }}</pre>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><FolderOpened /></el-icon>
            <span>{{ t('home.fileDialogs') }}</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="primary" @click="openFileDialog">
            <el-icon><Document /></el-icon>
            {{ t('home.openFile') }}
          </el-button>
          <el-button type="success" @click="openFolderDialog">
            <el-icon><FolderOpened /></el-icon>
            {{ t('home.openFolder') }}
          </el-button>
          <el-button type="warning" @click="saveFileDialog">
            <el-icon><Download /></el-icon>
            {{ t('home.saveFile') }}
          </el-button>
        </div>
        <p v-if="fileResult" class="result-text">{{ fileResult }}</p>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Bell /></el-icon>
            <span>{{ t('home.notifications') }}</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="notificationText" :placeholder="t('home.enterNotification')" />
          <el-button type="primary" @click="showNotification" :loading="notifLoading">
            <el-icon><Bell /></el-icon>
            {{ t('home.send') }}
          </el-button>
          <p v-if="notifResult" :class="notifResultClass">{{ notifResult }}</p>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><DocumentCopy /></el-icon>
            <span>{{ t('home.clipboard') }}</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="clipboardText" :placeholder="t('home.enterToCopy')" />
          <div class="button-group">
            <el-button type="info" @click="copyToClipboard">
              <el-icon><CopyDocument /></el-icon>
              {{ t('home.copy') }}
            </el-button>
            <el-button type="info" @click="pasteFromClipboard">
              <el-icon><Document /></el-icon>
              {{ t('home.paste') }}
            </el-button>
          </div>
          <p v-if="clipboardResult" :class="clipboardResultClass">{{ clipboardResult }}</p>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><FullScreen /></el-icon>
            <span>{{ t('home.windowControl') }}</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button @click="minimizeWindow">
            <el-icon><Minus /></el-icon>
            {{ t('home.minimize') }}
          </el-button>
          <el-button type="primary" @click="maximizeWindow">
            <el-icon><ZoomOut /></el-icon>
            {{ t('home.maximize') }}
          </el-button>
          <el-button type="warning" @click="restoreWindow">
            <el-icon><RefreshLeft /></el-icon>
            {{ t('home.restore') }}
          </el-button>
          <el-button type="danger" @click="closeApp">
            <el-icon><Close /></el-icon>
            {{ t('home.close') }}
          </el-button>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><ChatLineSquare /></el-icon>
            <span>{{ t('home.messageBox') }}</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="primary" @click="showAlert">{{ t('home.alert') }}</el-button>
          <el-button type="warning" @click="showConfirm">{{ t('home.confirm') }}</el-button>
          <el-button type="info" @click="showPrompt">{{ t('home.prompt') }}</el-button>
        </div>
        <p v-if="dialogResult" class="result-text">{{ dialogResult }}</p>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><FolderOpened /></el-icon>
            <span>{{ t('home.openDirectory') }}</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="directoryPath" :placeholder="t('home.enterDirectoryPath')" />
          <el-button type="primary" @click="openDirectory" :loading="dirLoading">
            <el-icon><FolderOpened /></el-icon>
            {{ t('home.open') }}
          </el-button>
          <p v-if="dirMessage" :class="dirMessageClass">{{ dirMessage }}</p>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Operation /></el-icon>
            <span>{{ t('home.executeCommand') }}</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="commandText" :placeholder="t('home.enterCommand')" />
          <el-button type="danger" @click="executeCommand" :loading="cmdLoading">
            <el-icon><VideoPlay /></el-icon>
            {{ t('home.execute') }}
          </el-button>
          <pre v-if="commandOutput" class="output-pre">{{ commandOutput }}</pre>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Crop /></el-icon>
            <span>{{ t('home.subWindow') }}</span>
          </div>
        </template>
        <div class="card-content">
          <p class="subwindow-desc">{{ t('home.subWindowDesc') }}</p>
          <el-button type="primary" @click="openSubWindow">
            <el-icon><Crop /></el-icon>
            {{ t('home.openSubWindow') }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  MagicStick, Monitor, Search, FolderOpened, Document, Download, Bell,
  DocumentCopy, CopyDocument, FullScreen, Minus, ZoomOut, RefreshLeft, Close,
  ChatLineSquare, Operation, VideoPlay, Link, Position, Crop
} from '@element-plus/icons-vue'
import { systemApi } from '@/api/system'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isNeutralino = () => typeof window !== 'undefined' && !!window.Neutralino

const ensureNeutralinoReady = async (): Promise<boolean> => {
  if (!isNeutralino()) return false
  return new Promise((resolve) => {
    if (window.Neutralino && typeof window.Neutralino.computer?.getOSInfo === 'function') {
      resolve(true)
      return
    }
    window.addEventListener('Neutralino.ready', () => resolve(true))
    setTimeout(() => resolve(false), 5000)
  })
}

const getNeutralino = () => {
  if (!window.Neutralino) throw new Error('Neutralino is not available')
  return window.Neutralino
}

const sysLoading = ref(false)
const systemInfo = ref('')
const getSystemInfo = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    ElMessage.warning(t('home.runInApp'))
    return
  }
  sysLoading.value = true
  systemInfo.value = ''
  try {
    const nl = getNeutralino()
    const [osInfo, cpuInfo, memoryInfo] = await Promise.all([
      nl.computer.getOSInfo(),
      nl.computer.getCPUInfo(),
      nl.computer.getMemoryInfo()
    ])
    systemInfo.value = `OS: ${osInfo.name}\nVersion: ${osInfo.version}\nCPU: ${cpuInfo.model}\nMemory: ${(memoryInfo.physical.total / 1024 / 1024 / 1024).toFixed(2)} GB`
  } catch (error: any) {
    systemInfo.value = `Error: ${error.message}`
  } finally {
    sysLoading.value = false
  }
}

const fileResult = ref('')
const openFileDialog = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { fileResult.value = t('home.runInApp'); return }
  try {
    const response = await getNeutralino().os.showOpenDialog('Open File', { multiSelections: false })
    if (response.length > 0) fileResult.value = `Selected: ${response.join(', ')}`
  } catch (error: any) { fileResult.value = `Error: ${error.message}` }
}
const openFolderDialog = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { fileResult.value = t('home.runInApp'); return }
  try {
    const response = await getNeutralino().os.showFolderDialog('Open Directory')
    if (response) fileResult.value = `Selected: ${response}`
  } catch (error: any) { fileResult.value = `Error: ${error.message}` }
}
const saveFileDialog = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { fileResult.value = t('home.runInApp'); return }
  try {
    const response = await getNeutralino().os.showSaveDialog('Save File', { defaultPath: 'untitled.txt' })
    if (response) fileResult.value = `Saved: ${response}`
  } catch (error: any) { fileResult.value = `Error: ${error.message}` }
}

const notificationText = ref('This is a notification!')
const notifLoading = ref(false)
const notifResult = ref('')
const notifResultType = ref<'success' | 'error'>('success')
const notifResultClass = computed(() => ({
  'success-message': notifResultType.value === 'success',
  'error-message': notifResultType.value === 'error'
}))
const showNotification = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { notifResult.value = t('home.runInApp'); notifResultType.value = 'error'; return }
  if (!notificationText.value.trim()) { notifResult.value = 'Enter notification text'; notifResultType.value = 'error'; return }
  notifLoading.value = true
  notifResult.value = ''
  try {
    await getNeutralino().os.showNotification('OrionDesk', notificationText.value, 'INFO')
    notifResult.value = 'Notification sent!'
    notifResultType.value = 'success'
  } catch (error: any) { notifResult.value = error.message; notifResultType.value = 'error' }
  finally { notifLoading.value = false }
}

const clipboardText = ref('')
const clipboardResult = ref('')
const clipboardResultType = ref<'success' | 'error'>('success')
const clipboardResultClass = computed(() => ({
  'success-message': clipboardResultType.value === 'success',
  'error-message': clipboardResultType.value === 'error'
}))
const copyToClipboard = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { clipboardResult.value = t('home.runInApp'); clipboardResultType.value = 'error'; return }
  if (!clipboardText.value.trim()) { clipboardResult.value = 'Enter text to copy'; clipboardResultType.value = 'error'; return }
  try {
    await getNeutralino().clipboard.writeText(clipboardText.value)
    clipboardResult.value = 'Copied!'
    clipboardResultType.value = 'success'
  } catch (error: any) { clipboardResult.value = error.message; clipboardResultType.value = 'error' }
}
const pasteFromClipboard = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { clipboardResult.value = t('home.runInApp'); clipboardResultType.value = 'error'; return }
  clipboardText.value = ''
  try {
    clipboardText.value = await getNeutralino().clipboard.readText()
    clipboardResult.value = 'Pasted!'
    clipboardResultType.value = 'success'
  } catch (error: any) { clipboardResult.value = error.message; clipboardResultType.value = 'error' }
}

const minimizeWindow = async () => { const ready = await ensureNeutralinoReady(); if (!ready) return; try { await getNeutralino().window.minimize() } catch (error) { console.error(error) } }
const maximizeWindow = async () => { const ready = await ensureNeutralinoReady(); if (!ready) return; try { await getNeutralino().window.maximize() } catch (error) { console.error(error) } }
const restoreWindow = async () => { const ready = await ensureNeutralinoReady(); if (!ready) return; try { await getNeutralino().window.unmaximize() } catch (error) { console.error(error) } }
const closeApp = async () => { const ready = await ensureNeutralinoReady(); if (!ready) return; try { await getNeutralino().app.exit() } catch (error) { console.error(error) } }

const dialogResult = ref('')
const showAlert = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { dialogResult.value = t('home.runInApp'); return }
  try { await getNeutralino().os.showMessageBox('Alert', 'This is an alert dialog', 'OK', 'INFO'); dialogResult.value = 'OK clicked' } catch (error: any) { dialogResult.value = error.message }
}
const showConfirm = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { dialogResult.value = t('home.runInApp'); return }
  try {
    const response = await getNeutralino().os.showMessageBox('Confirm', 'Are you sure?', 'YES_NO', 'QUESTION')
    dialogResult.value = response === 'YES' ? 'YES clicked' : 'NO clicked'
  } catch (error: any) { dialogResult.value = error.message }
}
const showPrompt = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { const input = prompt('Enter something:'); dialogResult.value = input ? `You entered: ${input}` : 'Cancelled'; return }
  const input = prompt('Enter something:')
  if (input) dialogResult.value = `You entered: ${input}`
}

const directoryPath = ref('')
const dirLoading = ref(false)
const dirMessage = ref('')
const dirMessageType = ref<'success' | 'error'>('success')
const dirMessageClass = computed(() => ({
  'success-message': dirMessageType.value === 'success',
  'error-message': dirMessageType.value === 'error'
}))
const openDirectory = async () => {
  if (!directoryPath.value.trim()) { dirMessage.value = 'Enter directory path'; dirMessageType.value = 'error'; return }
  dirLoading.value = true
  dirMessage.value = ''
  try {
    const response = await systemApi.openDirectory(directoryPath.value)
    dirMessage.value = response.data.message
    dirMessageType.value = 'success'
  } catch (error: any) { dirMessage.value = error.response?.data?.error || 'Failed'; dirMessageType.value = 'error' }
  finally { dirLoading.value = false }
}

const commandText = ref('')
const cmdLoading = ref(false)
const commandOutput = ref('')
const executeCommand = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) { commandOutput.value = t('home.runInApp'); return }
  if (!commandText.value.trim()) { commandOutput.value = 'Enter a command'; return }
  cmdLoading.value = true
  commandOutput.value = ''
  try {
    const response = await getNeutralino().os.execCommand(commandText.value, { stdOut: true, stdErr: true })
    commandOutput.value = response.output || 'Command executed'
  } catch (error: any) { commandOutput.value = error.message }
  finally { cmdLoading.value = false }
}

const openGitHubDoc = () => {
  window.open('https://github.com/skyhorse-x/OrionDesk', '_blank')
}

const openSubWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    ElMessage.warning(t('home.runInApp'))
    return
  }
  try {
    await getNeutralino().window.create('/index.html', {
      width: 600,
      height: 400,
      title: 'New Window',
      maximizable: true,
      resizable: true
    })
    ElMessage.success(t('home.subWindowOpened'))
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

onMounted(() => {
  if (isNeutralino() && window.Neutralino) window.Neutralino.init()
})
</script>

<style scoped>
.home-view { max-width: 1000px; }
.welcome-card { margin-bottom: 24px; border-radius: 16px; border: none; }
.welcome-card :deep(.el-card__header) { background: linear-gradient(135deg, var(--od-primary) 0%, #818cf8 100%); color: white; border-radius: 16px 16px 0 0; padding: 16px 20px; }
.github-card { margin-bottom: 24px; border-radius: 16px; border: none; }
.github-card :deep(.el-card__header) { background: white; border-bottom: 1px solid var(--od-border); padding: 14px 18px; }
.github-desc { font-size: 14px; color: var(--od-text-secondary); margin: 0; }
.card-header { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; }
.card-icon { font-size: 18px; }
.welcome-text { color: var(--od-text-secondary); font-size: 14px; margin: 0; }
.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 20px; }
.demo-card { border-radius: 16px; border: none; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.demo-card:hover { transform: translateY(-2px); }
.demo-card :deep(.el-card__header) { background: white; border-bottom: 1px solid var(--od-border); padding: 14px 18px; }
.card-content { display: flex; flex-direction: column; gap: 14px; }
.button-group { display: flex; flex-wrap: wrap; gap: 10px; }
.output-pre { background: #f8fafc; border: 1px solid var(--od-border); border-radius: 8px; padding: 12px; margin: 0; font-size: 12px; max-height: 150px; overflow-y: auto; }
.result-text { font-size: 13px; color: var(--od-text-secondary); margin: 0; }
.success-message { color: #10b981; font-size: 13px; margin: 0; }
.error-message { color: #ef4444; font-size: 13px; margin: 0; }
.command-card { grid-column: span 2; }
@media (max-width: 900px) { .command-card { grid-column: span 1; } }
</style>
