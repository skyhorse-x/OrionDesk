/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface NeutralinoComputer {
  getOSInfo(): Promise<{
    name: string
    description: string
    version: string
  }>
  getMemoryInfo(): Promise<{
    physical: { total: number; available: number }
    virtual: { total: number; available: number }
  }>
  getCPUInfo(): Promise<{
    vendor: string
    model: string
    frequency: number
    architecture: string
    logicalThreads: number
  }>
}

interface SpawnedProcess {
  id: string
  pid: number
  action: string
}

interface SpawnedProcessOptions {
  cwd?: string
  env?: Record<string, string>
}

interface SpawnOptions {
  stdOut?: boolean
  stdErr?: boolean
}

type MessageBoxChoice = 'OK' | 'OK_CANCEL' | 'YES_NO' | 'YES_NO_CANCEL' | 'RETRY_CANCEL' | 'ABORT_RETRY_IGNORE'
type MessageBoxIcon = 'WARNING' | 'ERROR' | 'INFO' | 'QUESTION'

interface NeutralinoOs {
  showOpenDialog(title: string, options?: { multiSelections?: boolean; filters?: Array<{ name: string; extensions: string[] }>; defaultPath?: string; directory?: boolean }): Promise<string[]>
  showSaveDialog(title: string, options?: { forceOverwrite?: boolean; filters?: Array<{ name: string; extensions: string[] }>; defaultPath?: string }): Promise<string>
  showFolderDialog(title: string, options?: { defaultPath?: string }): Promise<string>
  showMessageBox(title: string, content: string, choice?: MessageBoxChoice, icon?: MessageBoxIcon): Promise<string>
  showNotification(title: string, body: string, icon?: MessageBoxIcon): Promise<void>
  spawnProcess(command: string, options?: SpawnedProcessOptions): Promise<SpawnedProcess>
  execCommand(command: string, options?: SpawnOptions): Promise<{ output: string; stderr?: string; error?: string }>
  getEnv(key: string): Promise<string>
  getEnvs(): Promise<Record<string, string>>
  getPath(name: string): Promise<string>
  getSpawnedProcesses(): Promise<SpawnedProcess[]>
  open(url: string): Promise<void>
  setTray(tray: any): Promise<void>
}

interface NeutralinoUpdater {
  checkForUpdates(url: string): Promise<{ applicationId: string; version: string; resourcesURL: string; [key: string]: unknown }>
  install(): Promise<{ success: boolean; message: string }>
}

interface NeutralinoWindow {
  minimize(): Promise<void>
  maximize(): Promise<void>
  unminimize(): Promise<void>
  unmaximize(): Promise<void>
  show(): Promise<void>
  hide(): Promise<void>
  setAlwaysOnTop(flag: boolean): Promise<void>
  setSize(options: { width: number; height: number; resizable?: boolean }): Promise<void>
  setMainMenu(menu: NeutralinoMenu): Promise<void>
}

interface NeutralinoMenu {
  label: string
  submenu?: NeutralinoMenuItem[]
}

interface NeutralinoMenuItem {
  label?: string
  accelerator?: string
  handler?: () => void
  isEnabled?: boolean
  submenu?: NeutralinoMenuItem[]
}

interface NeutralinoApp {
  exit(): Promise<void>
  killProcess(): Promise<void>
  getConfig(): Promise<any>
}

interface NeutralinoClipboard {
  writeText(text: string): Promise<void>
  readText(): Promise<string>
}

interface Neutralino {
  init(): void
  computer: NeutralinoComputer
  os: NeutralinoOs
  updater: NeutralinoUpdater
  window: NeutralinoWindow
  app: NeutralinoApp
  clipboard: NeutralinoClipboard
}

declare global {
  interface Window {
    Neutralino: Neutralino
  }
}

export {}
