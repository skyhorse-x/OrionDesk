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

interface Filter {
  name: string
  extensions: string[]
}

interface OpenDialogOptions {
  title?: string
  multiSelections?: boolean
  filters?: Filter[]
  defaultPath?: string
  directory?: boolean
}

interface FolderDialogOptions {
  title?: string
  defaultPath?: string
}

interface SaveDialogOptions {
  title?: string
  forceOverwrite?: boolean
  filters?: Filter[]
  defaultPath?: string
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

interface MessageBoxChoice {
  OK: string
  OK_CANCEL: string
  YES_NO: string
  YES_NO_CANCEL: string
  RETRY_CANCEL: string
  ABORT_RETRY_IGNORE: string
}

interface Icon {
  WARNING: string
  ERROR: string
  INFO: string
  QUESTION: string
}

interface NeutralinoDialog {
  showOpenDialog(title: string, options?: OpenDialogOptions): Promise<string[]>
  showSaveDialog(title: string, options?: SaveDialogOptions): Promise<string>
  showFolderDialog(title: string, options?: FolderDialogOptions): Promise<string>
  showMessageBox(title: string, content: string, choice?: MessageBoxChoice, icon?: Icon): Promise<string>
}

interface NeutralinoOs {
  showNotification(title: string, body: string): Promise<void>
  spawnProcess(command: string, options?: SpawnedProcessOptions): Promise<SpawnedProcess>
  execCommand(command: string, options?: SpawnOptions): Promise<{ output: string }>
  getEnv(key: string): Promise<string>
  getEnvs(): Promise<Record<string, string>>
  getPath(name: string): Promise<string>
  getSpawnedProcesses(): Promise<SpawnedProcess[]>
  open(url: string): Promise<void>
}

interface NeutralinoUpdater {
  checkForUpdates(): Promise<{ available: boolean; version?: string }>
  install(): Promise<void>
}

interface NeutralinoWindow {
  minimize(): Promise<void>
  maximize(): Promise<void>
  restore(): Promise<void>
  close(): Promise<void>
  setAlwaysOnTop(flag: boolean): Promise<void>
  setSize(options: { width: number; height: number; resizable?: boolean }): Promise<void>
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
  dialog: NeutralinoDialog
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
