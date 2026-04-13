/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface DisplayInfo {
  id: number
  resolution: { width: number; height: number }
  dpi: number
  bpp: number
  refreshRate: number
}

interface SpawnedProcess {
  id: number
  pid: number
  action?: string
}

interface SpawnedProcessOptions {
  cwd?: string
  env?: Record<string, string>
}

interface SpawnOptions {
  stdOut?: boolean
  stdErr?: boolean
  background?: boolean
  stdIn?: string
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
    physicalCores?: number
    physicalUnits?: number
  }>
  getArch(): Promise<string>
  getKernelInfo(): Promise<{
    variant: string
    version: string
  }>
  getDisplays(): Promise<DisplayInfo[]>
  getMousePosition(): Promise<{ x: number; y: number }>
  setMousePosition(x: number, y: number): Promise<void>
  setMouseGrabbing(grabbing: boolean): Promise<void>
  sendKey(key: number, state?: 'press' | 'down' | 'up'): Promise<void>
}

interface MessageBoxChoice {
  type: 'OK' | 'OK_CANCEL' | 'YES_NO' | 'YES_NO_CANCEL' | 'RETRY_CANCEL' | 'ABORT_RETRY_IGNORE'
}

type MessageBoxIcon = 'WARNING' | 'ERROR' | 'INFO' | 'QUESTION'

interface TrayMenuItem {
  id?: string
  text?: string
  isDisabled?: boolean
  isChecked?: boolean
}

interface NeutralinoOs {
  showOpenDialog(title?: string, options?: {
    filters?: Array<{ name: string; extensions: string[] }>
    multiSelections?: boolean
    defaultPath?: string
    directory?: boolean
  }): Promise<string[]>
  showSaveDialog(title?: string, options?: {
    filters?: Array<{ name: string; extensions: string[] }>
    forceOverwrite?: boolean
    defaultPath?: string
  }): Promise<string>
  showFolderDialog(title?: string, options?: { defaultPath?: string }): Promise<string>
  showMessageBox(title: string, content: string, choice?: MessageBoxChoice | string, icon?: MessageBoxIcon | string): Promise<string>
  showNotification(title: string, body: string, icon?: MessageBoxIcon | string): Promise<void>
  execCommand(command: string, options?: SpawnOptions): Promise<{ stdOut?: string; stdErr?: string; exitCode?: number; pid?: number; output?: string; stderr?: string; error?: string }>
  spawnProcess(command: string, options?: SpawnedProcessOptions): Promise<SpawnedProcess>
  updateSpawnedProcess(id: number, action: string, data?: any): Promise<void>
  getSpawnedProcesses(): Promise<SpawnedProcess[]>
  getEnv(key: string): Promise<string>
  getEnvs(): Promise<Record<string, string>>
  getPath(name: string): Promise<string>
  open(url: string): Promise<void>
  setTray(options: { icon?: string; menuItems?: TrayMenuItem[]; useTemplateIcon?: boolean }): Promise<void>
}

interface NeutralinoUpdater {
  checkForUpdates(url: string): Promise<{ applicationId: string; version: string; resourcesURL: string; [key: string]: unknown }>
  install(): Promise<{ success: boolean; message: string }>
}

interface NeutralinoWindow {
  setTitle(title?: string): Promise<void>
  getTitle(): Promise<string>
  minimize(): Promise<void>
  unminimize(): Promise<void>
  isMinimized(): Promise<boolean>
  maximize(): Promise<void>
  unmaximize(): Promise<void>
  isMaximized(): Promise<boolean>
  setFullScreen(): Promise<void>
  exitFullScreen(): Promise<void>
  isFullScreen(): Promise<boolean>
  show(): Promise<void>
  hide(): Promise<void>
  isVisible(): Promise<boolean>
  focus(): Promise<void>
  setAlwaysOnTop(onTop?: boolean): Promise<void>
  setBorderless(borderless?: boolean): Promise<void>
  move(x: number, y: number): Promise<void>
  center(): Promise<void>
  setIcon(icon: string): Promise<void>
  setDraggableRegion(domId: string, options?: { exclusions?: string[] }): Promise<{ exclusions: { add: (...ids: string[]) => void; remove: (...ids: string[]) => void; removeAll: () => void } }>
  unsetDraggableRegion(domId: string): Promise<void>
  setSize(options: { width?: number; height?: number; minWidth?: number; minHeight?: number; maxWidth?: number; maxHeight?: number; resizable?: boolean }): Promise<void>
  getSize(): Promise<{ width: number; height: number; minWidth: number; minHeight: number; maxWidth: number; maxHeight: number; resizable: boolean }>
  getPosition(): Promise<{ x: number; y: number }>
  snapshot(path: string): Promise<void>
  create(url: string, options?: any): Promise<{ pid: number; stdOut: string; stdErr: string; exitCode: number }>
  setMainMenu(menu: NeutralinoMenu): Promise<void>
  print(): Promise<void>
  beginDrag(): Promise<void>
}

interface WindowMenuItem {
  id?: string
  text?: string
  isDisabled?: boolean
  isChecked?: boolean
  menuItems?: WindowMenuItem[]
  shortcut?: string
  action?: string
}

interface NeutralinoMenu {
  label: string
  submenu?: WindowMenuItem[]
}

interface NeutralinoApp {
  exit(exitCode?: number): Promise<void>
  killProcess(): Promise<void>
  restartProcess(options?: { args?: string }): Promise<void>
  getConfig(): Promise<any>
  broadcast(event: string, data?: any): Promise<void>
  readProcessInput(readAll?: boolean): Promise<string>
  writeProcessOutput(data: string): Promise<void>
  writeProcessError(data: string): Promise<void>
}

interface NeutralinoClipboard {
  getFormat(): Promise<string>
  writeText(text: string): Promise<void>
  writeHTML(html: string): Promise<void>
  writeImage(image: any): Promise<void>
  readText(): Promise<string>
  readHTML(): Promise<string>
  readImage(format?: string): Promise<any>
}

interface NeutralinoFilesystem {
  createDirectory(path: string): Promise<void>
  remove(path: string): Promise<void>
  writeFile(filename: string, data: string): Promise<void>
  appendFile(filename: string, data: string): Promise<void>
  writeBinaryFile(filename: string, data: ArrayBuffer): Promise<void>
  appendBinaryFile(filename: string, data: ArrayBuffer): Promise<void>
  readFile(filename: string, options?: { pos?: number; size?: number }): Promise<string>
  readBinaryFile(filename: string, options?: { pos?: number; size?: number }): Promise<ArrayBuffer>
  openFile(filename: string): Promise<number>
  updateOpenedFile(id: number, action: string, data?: any): Promise<void>
  getOpenedFileInfo(id: number): Promise<{ id: number; eof: boolean; pos: number; lastRead: number }>
  createWatcher(path: string): Promise<number>
  removeWatcher(watcherId: number): Promise<void>
  getWatchers(): Promise<Array<{ id: number; path: string }>>
  readDirectory(path: string, options?: { recursive?: boolean }): Promise<Array<{ entry: string; type: string }>>
  copy(source: string, destination: string, options?: { recursive?: boolean; overwrite?: boolean; skip?: boolean }): Promise<void>
  move(source: string, destination: string): Promise<void>
  getStats(path: string): Promise<{ size: number; isFile: boolean; isDirectory: boolean; createdAt: number; modifiedAt: number }>
  getAbsolutePath(path: string): Promise<string>
  getRelativePath(path: string, base?: string): Promise<string>
  getPathParts(path: string): Promise<{ rootName: string; rootDirectory: string; rootPath: string; relativePath: string; parentPath: string; filename: string; extension: string; stem: string }>
  setPermissions(path: string, permissions: any, mode?: string): Promise<void>
  getPermissions(path: string): Promise<any>
  getJoinedPath(...paths: string[]): Promise<string>
  getNormalizedPath(path: string): Promise<string>
  getUnnormalizedPath(path: string): Promise<string>
}

interface NeutralinoStorage {
  setData(key: string, data?: string | null): Promise<void>
  getData(key: string): Promise<string>
  removeData(key: string): Promise<void>
  clear(): Promise<void>
  getKeys(): Promise<string[]>
}

interface Neutralino {
  init(): void
  computer: NeutralinoComputer
  os: NeutralinoOs
  updater: NeutralinoUpdater
  window: NeutralinoWindow
  app: NeutralinoApp
  clipboard: NeutralinoClipboard
  filesystem: NeutralinoFilesystem
  storage: NeutralinoStorage
}

declare global {
  interface Window {
    Neutralino: Neutralino
  }
}

export {}
