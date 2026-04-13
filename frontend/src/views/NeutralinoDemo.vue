<template>
  <div class="neutralino-demo">
    <div class="demo-grid">
      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Monitor /></el-icon>
            <span>System Information</span>
          </div>
        </template>
        <div class="card-content">
          <el-button type="primary" @click="getSystemInfo" :loading="loading">
            <el-icon><Search /></el-icon>
            Get System Info
          </el-button>
          <pre v-if="systemInfo" class="output-pre">{{ systemInfo }}</pre>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Bell /></el-icon>
            <span>Notifications</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="notificationText" placeholder="Enter notification text" />
          <el-button type="success" @click="showNotification" :loading="notificationLoading">
            <el-icon><Bell /></el-icon>
            Send Notification
          </el-button>
          <p v-if="notificationResult" :class="notificationResultClass">{{ notificationResult }}</p>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><FullScreen /></el-icon>
            <span>Window Control</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="default" @click="minimizeWindow" :loading="windowLoading">
            <el-icon><Minus /></el-icon>
            Minimize
          </el-button>
          <el-button type="default" @click="maximizeWindow" :loading="windowLoading">
            <el-icon><ZoomOut /></el-icon>
            Maximize
          </el-button>
          <el-button type="warning" @click="restoreWindow" :loading="windowLoading">
            <el-icon><RefreshLeft /></el-icon>
            Restore
          </el-button>
          <el-button type="danger" @click="closeApp">
            <el-icon><Close /></el-icon>
            Close
          </el-button>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><DocumentCopy /></el-icon>
            <span>Clipboard</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="clipboardText" placeholder="Enter text to copy" />
          <div class="button-group">
            <el-button type="info" @click="copyToClipboard" :loading="clipboardLoading">
              <el-icon><CopyDocument /></el-icon>
              Copy
            </el-button>
            <el-button type="info" @click="pasteFromClipboard" :loading="clipboardLoading">
              <el-icon><Document /></el-icon>
              Paste
            </el-button>
          </div>
          <p v-if="clipboardResult" :class="clipboardResultClass">{{ clipboardResult }}</p>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><FolderOpened /></el-icon>
            <span>File Operations</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="primary" @click="openFileDialog">
            <el-icon><Document /></el-icon>
            Open File
          </el-button>
          <el-button type="success" @click="openDirectoryDialog">
            <el-icon><FolderOpened /></el-icon>
            Open Directory
          </el-button>
          <el-button type="warning" @click="saveFileDialog">
            <el-icon><Download /></el-icon>
            Save File
          </el-button>
        </div>
        <p v-if="selectedPath" class="result-text">{{ selectedPath }}</p>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><ChatLineSquare /></el-icon>
            <span>Native Dialogs</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="primary" @click="showAlert">
            <el-icon><Warning /></el-icon>
            Alert
          </el-button>
          <el-button type="warning" @click="showConfirm">
            <el-icon><QuestionFilled /></el-icon>
            Confirm
          </el-button>
          <el-button type="info" @click="showPrompt">
            <el-icon><Edit /></el-icon>
            Prompt
          </el-button>
        </div>
        <p v-if="dialogResult" class="result-text">{{ dialogResult }}</p>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Menu /></el-icon>
            <span>System Tray</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="success" @click="setTray">
            <el-icon><SetUp /></el-icon>
            Set Tray
          </el-button>
          <el-button type="danger" @click="removeTray">
            <el-icon><Delete /></el-icon>
            Remove Tray
          </el-button>
        </div>
        <p v-if="trayResult" class="result-text">{{ trayResult }}</p>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Grid /></el-icon>
            <span>Main Menu</span>
          </div>
        </template>
        <div class="card-content button-group">
          <el-button type="primary" @click="setMainMenu">
            <el-icon><SetUp /></el-icon>
            Set Menu
          </el-button>
          <el-button type="danger" @click="removeMainMenu">
            <el-icon><Delete /></el-icon>
            Remove Menu
          </el-button>
        </div>
        <p v-if="menuResult" class="result-text">{{ menuResult }}</p>
      </el-card>

      <el-card class="demo-card command-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Operation /></el-icon>
            <span>Execute Command</span>
          </div>
        </template>
        <div class="card-content">
          <el-input v-model="commandText" placeholder="Enter command (e.g., ls -la)" />
          <el-button type="danger" @click="executeCommand" :loading="commandLoading">
            <el-icon><VideoPlay /></el-icon>
            Execute
          </el-button>
          <pre v-if="commandOutput" class="output-pre">{{ commandOutput }}</pre>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Upload /></el-icon>
            <span>Application Update</span>
          </div>
        </template>
        <div class="card-content">
          <p class="update-info">Current version: <strong>{{ appVersion }}</strong></p>
          <p class="update-info">Demo manifest: <strong>{{ updateManifestUrl }}</strong></p>
          <el-button type="primary" @click="checkForUpdate" :loading="updateLoading">
            <el-icon><Refresh /></el-icon>
            Check for Updates
          </el-button>
          <p v-if="updateMessage" :class="updateMessageClass">{{ updateMessage }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Monitor, Search, Bell, FullScreen, Minus, ZoomOut, RefreshLeft, Close,
  DocumentCopy, CopyDocument, Document, FolderOpened, Download, ChatLineSquare,
  Warning, QuestionFilled, Operation, VideoPlay, Upload, Refresh, Edit, Menu, SetUp, Delete, Grid
} from '@element-plus/icons-vue'

const loading = ref(false)
const systemInfo = ref('')

const notificationText = ref('This is a notification from Neutralino!')
const notificationLoading = ref(false)
const notificationResult = ref('')
const notificationResultType = ref<'success' | 'error'>('success')

const windowLoading = ref(false)

const clipboardText = ref('')
const clipboardLoading = ref(false)
const clipboardResult = ref('')
const clipboardResultType = ref<'success' | 'error'>('success')

const selectedPath = ref('')

const dialogResult = ref('')

const trayResult = ref('')
const menuResult = ref('')

const commandText = ref('')
const commandLoading = ref(false)
const commandOutput = ref('')

const updateLoading = ref(false)
const updateMessage = ref('')
const updateMessageType = ref<'success' | 'error' | 'info'>('info')
const appVersion = ref('1.0.0')
const updateManifestUrl = ref('/neutralino-update.json')

const notificationResultClass = computed(() => ({
  'success-message': notificationResultType.value === 'success',
  'error-message': notificationResultType.value === 'error'
}))

const clipboardResultClass = computed(() => ({
  'success-message': clipboardResultType.value === 'success',
  'error-message': clipboardResultType.value === 'error'
}))

const updateMessageClass = computed(() => ({
  'success-message': updateMessageType.value === 'success',
  'error-message': updateMessageType.value === 'error',
  'info-message': updateMessageType.value === 'info'
}))

const isNeutralino = () => typeof window !== 'undefined' && !!window.Neutralino

const ensureNeutralinoReady = async (): Promise<boolean> => {
  if (!isNeutralino()) return false

  return new Promise((resolve) => {
    if (window.Neutralino && typeof window.Neutralino.computer?.getOSInfo === 'function') {
      resolve(true)
      return
    }
    window.addEventListener('Neutralino.ready', () => {
      resolve(true)
    })
    setTimeout(() => resolve(false), 5000)
  })
}

const getNeutralino = () => {
  if (!window.Neutralino) throw new Error('Neutralino is not available')
  return window.Neutralino
}

const getSystemInfo = async () => {
  loading.value = true
  systemInfo.value = ''
  try {
    const nl = getNeutralino()
    const [osInfo, memoryInfo, cpuInfo] = await Promise.all([
      nl.computer.getOSInfo(),
      nl.computer.getMemoryInfo(),
      nl.computer.getCPUInfo()
    ])
    systemInfo.value = JSON.stringify(
      {
        os: osInfo,
        memory: memoryInfo,
        cpu: cpuInfo
      },
      null,
      2
    )
  } catch (error: any) {
    systemInfo.value = `Error: ${error.message}`
  } finally {
    loading.value = false
  }
}

const showNotification = async () => {
  if (!notificationText.value.trim()) {
    notificationResult.value = 'Please enter notification text'
    notificationResultType.value = 'error'
    return
  }

  notificationLoading.value = true
  notificationResult.value = ''
  try {
    const title = 'OrionDesk'
    await getNeutralino().os.showNotification(title, notificationText.value, 'INFO')
    notificationResult.value = 'Native notification sent via Neutralino.'
    notificationResultType.value = 'success'
  } catch (error: any) {
    notificationResult.value = error.message
    notificationResultType.value = 'error'
  } finally {
    notificationLoading.value = false
  }
}

const minimizeWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  windowLoading.value = true
  try {
    await getNeutralino().window.minimize()
  } catch (error) {
    console.error(error)
  } finally {
    windowLoading.value = false
  }
}

const maximizeWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  windowLoading.value = true
  try {
    await getNeutralino().window.maximize()
  } catch (error) {
    console.error(error)
  } finally {
    windowLoading.value = false
  }
}

const restoreWindow = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  windowLoading.value = true
  try {
    await getNeutralino().window.unmaximize()
  } catch (error) {
    console.error(error)
  } finally {
    windowLoading.value = false
  }
}

const closeApp = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  await getNeutralino().app.exit()
}

const copyToClipboard = async () => {
  if (!clipboardText.value.trim()) {
    ElMessage.warning('Please enter text to copy')
    return
  }

  clipboardLoading.value = true
  try {
    await getNeutralino().clipboard.writeText(clipboardText.value)
    clipboardResult.value = 'Copied successfully!'
    clipboardResultType.value = 'success'
  } catch (error: any) {
    clipboardResult.value = error.message
    clipboardResultType.value = 'error'
  } finally {
    clipboardLoading.value = false
  }
}

const pasteFromClipboard = async () => {
  clipboardLoading.value = true
  clipboardText.value = ''
  try {
    clipboardText.value = await getNeutralino().clipboard.readText()
    clipboardResult.value = 'Pasted successfully!'
    clipboardResultType.value = 'success'
  } catch (error: any) {
    clipboardResult.value = error.message
    clipboardResultType.value = 'error'
  } finally {
    clipboardLoading.value = false
  }
}

const openFileDialog = async () => {
  try {
    const response = await getNeutralino().os.showOpenDialog('Open File', {
      multiSelections: false
    })
    if (response.length > 0) {
      selectedPath.value = `Selected: ${response.join(', ')}`
    }
  } catch (error: any) {
    selectedPath.value = `Error: ${error.message}`
  }
}

const openDirectoryDialog = async () => {
  try {
    const response = await getNeutralino().os.showFolderDialog('Open Directory')
    if (response) {
      selectedPath.value = `Selected: ${response}`
    }
  } catch (error: any) {
    selectedPath.value = `Error: ${error.message}`
  }
}

const saveFileDialog = async () => {
  try {
    const response = await getNeutralino().os.showSaveDialog('Save File', {
      defaultPath: 'untitled.txt'
    })
    if (response) {
      selectedPath.value = `Saved: ${response}`
    }
  } catch (error: any) {
    selectedPath.value = `Error: ${error.message}`
  }
}

const showAlert = async () => {
  try {
    const response = await getNeutralino().os.showMessageBox(
      'Alert',
      'This is an alert dialog',
      'OK',
      'INFO'
    )
    dialogResult.value = `Button clicked: ${response}`
  } catch (error: any) {
    dialogResult.value = `Error: ${error.message}`
  }
}

const showConfirm = async () => {
  try {
    const response = await getNeutralino().os.showMessageBox(
      'Confirm',
      'Are you sure?',
      'YES_NO',
      'QUESTION'
    )
    dialogResult.value = response === 'YES' ? 'User clicked YES' : 'User clicked NO'
  } catch (error: any) {
    dialogResult.value = `Error: ${error.message}`
  }
}

const showPrompt = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    const input = prompt('Enter something:')
    dialogResult.value = input ? `User entered: ${input}` : 'User cancelled'
    return
  }
  const input = prompt('Enter something:')
  if (input) {
    dialogResult.value = `User entered: ${input}`
  }
}

const setTray = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    trayResult.value = 'Run this feature in Neutralino desktop app'
    return
  }
  try {
    await getNeutralino().os.setTray({
      icon: '/resources/icons/tray.png',
      menuItems: [
        { label: 'Show', handler: () => getNeutralino().window.show() },
        { label: 'Hide', handler: () => getNeutralino().window.hide() },
        { label: 'separator' },
        { label: 'Quit', handler: () => getNeutralino().app.exit() }
      ]
    })
    trayResult.value = 'Tray icon set successfully'
  } catch (error: any) {
    trayResult.value = `Error: ${error.message}`
  }
}

const removeTray = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  try {
    await getNeutralino().os.setTray({ icon: '', menuItems: [] })
    trayResult.value = 'Tray icon removed'
  } catch (error: any) {
    trayResult.value = `Error: ${error.message}`
  }
}

const setMainMenu = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    menuResult.value = 'Run this feature in Neutralino desktop app'
    return
  }
  try {
    await getNeutralino().window.setMainMenu({
      label: 'OrionDesk',
      submenu: [
        {
          label: 'File',
          submenu: [
            { label: 'New', accelerator: 'CmdOrCtrl+N', handler: () => ElMessage.success('New clicked') },
            { label: 'Open', accelerator: 'CmdOrCtrl+O', handler: () => ElMessage.success('Open clicked') },
            { label: 'separator' },
            { label: 'Exit', accelerator: 'CmdOrCtrl+Q', handler: () => getNeutralino().app.exit() }
          ]
        },
        {
          label: 'Edit',
          submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', handler: () => ElMessage.success('Undo clicked') },
            { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z', handler: () => ElMessage.success('Redo clicked') }
          ]
        },
        {
          label: 'Help',
          submenu: [
            { label: 'About', handler: () => ElMessage.info('OrionDesk v1.0.0') }
          ]
        }
      ]
    })
    menuResult.value = 'Main menu set successfully'
  } catch (error: any) {
    menuResult.value = `Error: ${error.message}`
  }
}

const removeMainMenu = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) return
  try {
    await getNeutralino().window.setMainMenu({ label: '', submenu: [] })
    menuResult.value = 'Main menu removed'
  } catch (error: any) {
    menuResult.value = `Error: ${error.message}`
  }
}

const executeCommand = async () => {
  if (!commandText.value.trim()) {
    commandOutput.value = 'Please enter a command'
    return
  }

  commandLoading.value = true
  commandOutput.value = ''
  try {
    const response = await getNeutralino().os.execCommand(commandText.value, {
      stdOut: true,
      stdErr: true
    })
    commandOutput.value = response.output || 'Command executed'
  } catch (error: any) {
    commandOutput.value = error.message
  } finally {
    commandLoading.value = false
  }
}

const checkForUpdate = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    updateMessage.value = 'Run this feature in Neutralino desktop app'
    updateMessageType.value = 'error'
    return
  }

  updateLoading.value = true
  updateMessage.value = ''
  try {
    const updateInfo = await getNeutralino().updater.checkForUpdates(updateManifestUrl.value)
    updateMessage.value = `Manifest loaded: ${updateInfo.version}`
    updateMessageType.value = 'success'
    ElMessage.success(`Loaded update manifest for version ${updateInfo.version}`)
  } catch (error: any) {
    updateMessage.value = `Check failed: ${error.message}`
    updateMessageType.value = 'error'
  } finally {
    updateLoading.value = false
  }
}

onMounted(() => {
  if (isNeutralino() && window.Neutralino) {
    window.Neutralino.init()
  }
})
</script>

<style scoped>
.neutralino-demo {
  max-width: 1000px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 20px;
}

.demo-card {
  border-radius: 16px;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 15px;
}

.card-icon {
  font-size: 18px;
  color: var(--od-primary);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.output-pre {
  background: #f8fafc;
  border: 1px solid var(--od-border);
  border-radius: 8px;
  padding: 12px;
  margin: 0;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.result-text {
  font-size: 13px;
  color: var(--od-text-secondary);
  margin: 0;
}

.success-message {
  color: #10b981;
  font-size: 13px;
  margin: 0;
}

.error-message {
  color: #ef4444;
  font-size: 13px;
  margin: 0;
}

.info-message {
  color: var(--od-primary);
  font-size: 13px;
  margin: 0;
}

.update-info {
  font-size: 14px;
  color: var(--od-text-secondary);
  margin: 0 0 8px 0;
}

.command-card {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .command-card {
    grid-column: span 1;
  }
}
</style>
