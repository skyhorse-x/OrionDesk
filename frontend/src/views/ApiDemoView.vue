<template>
  <div class="api-demo">
    <div class="demo-header">
      <h2>Neutralino.js Native API</h2>
      <p>Complete API Reference with Copyable Code</p>
    </div>

    <el-tabs v-model="activeCategory" class="api-tabs">
      <el-tab-pane label="App" name="app">
        <template #label>
          <span class="tab-label"><el-icon><Monitor /></el-icon> App</span>
        </template>
        <div class="api-section">
          <ApiDemo title="app.exit(exitCode)" description="Terminates the running application" :code="appExitCode">
            <el-button type="danger" @click="runAppExit">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="app.getConfig()" description="Returns the current application configuration" :code="appGetConfigCode">
            <el-button type="primary" @click="runAppGetConfig">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="app.broadcast(event, data)" description="Dispatches a new event to all app instances" :code="appBroadcastCode">
            <el-button type="primary" @click="runAppBroadcast">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="app.restartProcess()" description="Restarts the current application instance" :code="appRestartCode">
            <el-button type="warning" @click="runAppRestart">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="app.killProcess()" description="Kills the application process" :code="appKillCode">
            <el-button type="danger" @click="runAppKill">Execute</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Window" name="window">
        <template #label>
          <span class="tab-label"><el-icon><FullScreen /></el-icon> Window</span>
        </template>
        <div class="api-section">
          <ApiDemo title="window.setTitle(title)" description="Sets the title of the native window" :code="windowSetTitleCode">
            <el-input v-model="windowTitle" placeholder="Enter window title" style="width: 200px; margin-right: 10px;" />
            <el-button type="primary" @click="runWindowSetTitle">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="window.getTitle()" description="Returns the title of the native window" :code="windowGetTitleCode">
            <el-button type="primary" @click="runWindowGetTitle">Execute</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.minimize() / unminimize()" description="Minimizes or restores the window" :code="windowMinimizeCode">
            <el-button @click="runWindowMinimize">Minimize</el-button>
            <el-button @click="runWindowUnminimize">Restore</el-button>
          </ApiDemo>

          <ApiDemo title="window.maximize() / unmaximize()" description="Maximizes or restores the window" :code="windowMaximizeCode">
            <el-button type="primary" @click="runWindowMaximize">Maximize</el-button>
            <el-button type="warning" @click="runWindowUnmaximize">Restore</el-button>
          </ApiDemo>

          <ApiDemo title="window.isMaximized()" description="Returns true if window is maximized" :code="windowIsMaximizedCode">
            <el-button type="info" @click="runWindowIsMaximized">Check</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.setFullScreen() / exitFullScreen()" description="Enables or exits full screen mode" :code="windowFullScreenCode">
            <el-button type="primary" @click="runWindowSetFullScreen">Full Screen</el-button>
            <el-button type="warning" @click="runWindowExitFullScreen">Exit Full Screen</el-button>
          </ApiDemo>

          <ApiDemo title="window.show() / hide()" description="Shows or hides the window" :code="windowShowHideCode">
            <el-button type="success" @click="runWindowShow">Show</el-button>
            <el-button type="warning" @click="runWindowHide">Hide</el-button>
          </ApiDemo>

          <ApiDemo title="window.center()" description="Centers the window on screen" :code="windowCenterCode">
            <el-button type="primary" @click="runWindowCenter">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="window.move(x, y)" description="Moves the window to given coordinates" :code="windowMoveCode">
            <el-input-number v-model="moveX" :min="0" style="width: 100px; margin-right: 5px;" />
            <el-input-number v-model="moveY" :min="0" style="width: 100px; margin-right: 10px;" />
            <el-button type="primary" @click="runWindowMove">Move</el-button>
          </ApiDemo>

          <ApiDemo title="window.setSize(options)" description="Sets window size" :code="windowSetSizeCode">
            <el-button type="primary" @click="runWindowSetSize">Set Size (500x400)</el-button>
          </ApiDemo>

          <ApiDemo title="window.getSize()" description="Returns window size information" :code="windowGetSizeCode">
            <el-button type="info" @click="runWindowGetSize">Execute</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.getPosition()" description="Returns window position coordinates" :code="windowGetPositionCode">
            <el-button type="info" @click="runWindowGetPosition">Execute</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.setAlwaysOnTop(onTop)" description="Activates or deactivates always on top mode" :code="windowAlwaysOnTopCode">
            <el-button type="primary" @click="runWindowAlwaysOnTop(true)">On Top</el-button>
            <el-button type="warning" @click="runWindowAlwaysOnTop(false)">Normal</el-button>
          </ApiDemo>

          <ApiDemo title="window.focus()" description="Focuses the native window" :code="windowFocusCode">
            <el-button type="primary" @click="runWindowFocus">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="window.print()" description="Displays the native print dialog" :code="windowPrintCode">
            <el-button type="primary" @click="runWindowPrint">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="window.isMinimized()" description="Returns true if window is minimized" :code="windowIsMinimizedCode">
            <el-button type="info" @click="runWindowIsMinimized">Check</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.isVisible()" description="Returns true if window is visible" :code="windowIsVisibleCode">
            <el-button type="info" @click="runWindowIsVisible">Check</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.isFullScreen()" description="Returns true if window is in full screen mode" :code="windowIsFullScreenCode">
            <el-button type="info" @click="runWindowIsFullScreen">Check</el-button>
            <span v-if="windowResult" class="result-inline">{{ windowResult }}</span>
          </ApiDemo>

          <ApiDemo title="window.setBorderless(borderless)" description="Enables or disables borderless mode" :code="windowBorderlessCode">
            <el-button type="primary" @click="runWindowBorderless(true)">Borderless</el-button>
            <el-button type="warning" @click="runWindowBorderless(false)">Normal</el-button>
          </ApiDemo>

          <ApiDemo title="window.setIcon(icon)" description="Sets the window icon" :code="windowSetIconCode">
            <el-button type="primary" @click="runWindowSetIcon">Set Icon</el-button>
          </ApiDemo>

          <ApiDemo title="window.setDraggableRegion(elementId)" description="Makes an element the draggable region" :code="windowDraggableCode">
            <el-button type="primary" @click="runWindowDraggable('draggable-header')">Set Draggable</el-button>
          </ApiDemo>

          <ApiDemo title="window.snapshot()" description="Captures a screenshot of the window" :code="windowSnapshotCode">
            <el-button type="primary" @click="runWindowSnapshot">Capture</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Computer" name="computer">
        <template #label>
          <span class="tab-label"><el-icon><Cpu /></el-icon> Computer</span>
        </template>
        <div class="api-section">
          <ApiDemo title="computer.getOSInfo()" description="Returns operating system information" :code="computerOSInfoCode">
            <el-button type="primary" @click="runComputerOSInfo">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.getMemoryInfo()" description="Returns system memory statistics" :code="computerMemoryCode">
            <el-button type="primary" @click="runComputerMemory">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.getCPUInfo()" description="Returns CPU information" :code="computerCPUCode">
            <el-button type="primary" @click="runComputerCPU">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.getArch()" description="Returns the CPU architecture identifier" :code="computerArchCode">
            <el-button type="primary" @click="runComputerArch">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.getKernelInfo()" description="Returns kernel information" :code="computerKernelCode">
            <el-button type="primary" @click="runComputerKernel">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.getDisplays()" description="Returns information about all connected displays" :code="computerDisplaysCode">
            <el-button type="primary" @click="runComputerDisplays">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.getMousePosition()" description="Returns current mouse cursor position" :code="computerMousePosCode">
            <el-button type="primary" @click="runComputerMousePos">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="computer.setMousePosition(x, y)" description="Updates mouse cursor position" :code="computerSetMouseCode">
            <el-button type="primary" @click="runComputerSetMouse">Execute</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="OS" name="os">
        <template #label>
          <span class="tab-label"><el-icon><Setting /></el-icon> OS</span>
        </template>
        <div class="api-section">
          <ApiDemo title="os.execCommand(command, options)" description="Executes a command and returns the output" :code="osExecCode">
            <el-input v-model="commandText" placeholder="Enter command" style="width: 300px; margin-right: 10px;" />
            <el-button type="primary" @click="runOsExec">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="os.getEnv(key)" description="Returns value of an environment variable" :code="osGetEnvCode">
            <el-input v-model="envKey" placeholder="Variable name" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runOsGetEnv">Get</el-button>
            <span v-if="osResult" class="result-inline">{{ osResult }}</span>
          </ApiDemo>

          <ApiDemo title="os.getEnvs()" description="Returns all environment variables" :code="osGetEnvsCode">
            <el-button type="primary" @click="runOsGetEnvs">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="os.getPath(name)" description="Returns platform-specific folder paths" :code="osGetPathCode">
            <el-select v-model="pathName" style="width: 150px; margin-right: 10px;">
              <el-option label="config" value="config" />
              <el-option label="data" value="data" />
              <el-option label="documents" value="documents" />
              <el-option label="downloads" value="downloads" />
              <el-option label="temp" value="temp" />
            </el-select>
            <el-button type="primary" @click="runOsGetPath">Get Path</el-button>
            <span v-if="osResult" class="result-inline">{{ osResult }}</span>
          </ApiDemo>

          <ApiDemo title="os.open(url)" description="Opens URL in default browser" :code="osOpenCode">
            <el-input v-model="openUrl" placeholder="https://..." style="width: 300px; margin-right: 10px;" />
            <el-button type="primary" @click="runOsOpen">Open</el-button>
          </ApiDemo>

          <ApiDemo title="os.showOpenDialog(title, options)" description="Shows file open dialog" :code="osShowOpenDialogCode">
            <el-button type="primary" @click="runOsShowOpenDialog">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="os.showSaveDialog(title, options)" description="Shows file save dialog" :code="osShowSaveDialogCode">
            <el-button type="primary" @click="runOsShowSaveDialog">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="os.showFolderDialog(title)" description="Shows folder open dialog" :code="osShowFolderDialogCode">
            <el-button type="primary" @click="runOsShowFolderDialog">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="os.showNotification(title, content, icon)" description="Displays a notification" :code="osNotificationCode">
            <el-input v-model="notifTitle" placeholder="Title" style="width: 120px; margin-right: 5px;" />
            <el-input v-model="notifContent" placeholder="Content" style="width: 200px; margin-right: 10px;" />
            <el-button type="primary" @click="runOsNotification('INFO')">Info</el-button>
            <el-button type="warning" @click="runOsNotification('WARNING')">Warning</el-button>
            <el-button type="danger" @click="runOsNotification('ERROR')">Error</el-button>
          </ApiDemo>

          <ApiDemo title="os.showMessageBox(title, content, choice, icon)" description="Displays a message box" :code="osMessageBoxCode">
            <el-button type="primary" @click="runOsMessageBox('OK', 'INFO')">Alert</el-button>
            <el-button type="warning" @click="runOsMessageBox('YES_NO', 'QUESTION')">Confirm</el-button>
          </ApiDemo>

          <ApiDemo title="os.spawnProcess(command)" description="Spawns a process in background" :code="osSpawnProcessCode">
            <el-button type="primary" @click="runOsSpawnProcess">Execute</el-button>
          </ApiDemo>

          <ApiDemo title="os.getSpawnedProcesses()" description="Returns all spawned processes" :code="osGetProcessesCode">
            <el-button type="primary" @click="runOsGetProcesses">Execute</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Clipboard" name="clipboard">
        <template #label>
          <span class="tab-label"><el-icon><DocumentCopy /></el-icon> Clipboard</span>
        </template>
        <div class="api-section">
          <ApiDemo title="clipboard.writeText(text)" description="Writes text to clipboard" :code="clipboardWriteCode">
            <el-input v-model="clipboardText" placeholder="Text to copy" style="width: 250px; margin-right: 10px;" />
            <el-button type="primary" @click="runClipboardWrite">Copy</el-button>
          </ApiDemo>

          <ApiDemo title="clipboard.readText()" description="Reads text from clipboard" :code="clipboardReadCode">
            <el-button type="primary" @click="runClipboardRead">Paste</el-button>
            <span v-if="clipboardResult" class="result-inline">{{ clipboardResult }}</span>
          </ApiDemo>

          <ApiDemo title="clipboard.getFormat()" description="Returns current clipboard format" :code="clipboardFormatCode">
            <el-button type="info" @click="runClipboardFormat">Check</el-button>
            <span v-if="clipboardResult" class="result-inline">{{ clipboardResult }}</span>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Filesystem" name="filesystem">
        <template #label>
          <span class="tab-label"><el-icon><FolderOpened /></el-icon> Filesystem</span>
        </template>
        <div class="api-section">
          <ApiDemo title="filesystem.readFile(filename)" description="Reads a text file" :code="fsReadFileCode">
            <el-input v-model="filePath" placeholder="File path" style="width: 250px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsReadFile">Read</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.writeFile(filename, data)" description="Writes text to file" :code="fsWriteFileCode">
            <el-input v-model="fileContent" placeholder="File content" style="width: 200px; margin-right: 5px;" />
            <el-input v-model="fileWritePath" placeholder="File path" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsWriteFile">Write</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.appendFile(filename, data)" description="Appends text to file" :code="fsAppendFileCode">
            <el-input v-model="fileAppendContent" placeholder="Content to append" style="width: 200px; margin-right: 5px;" />
            <el-input v-model="fileAppendPath" placeholder="File path" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsAppendFile">Append</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.createDirectory(path)" description="Creates a directory" :code="fsCreateDirCode">
            <el-input v-model="dirPath" placeholder="Directory path" style="width: 200px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsCreateDir">Create</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.remove(path)" description="Removes a file or directory" :code="fsRemoveCode">
            <el-input v-model="removePath" placeholder="Path to remove" style="width: 200px; margin-right: 10px;" />
            <el-button type="danger" @click="runFsRemove">Remove</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.readDirectory(path)" description="Reads directory contents" :code="fsReadDirCode">
            <el-button type="primary" @click="runFsReadDir">Read</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.copy(source, destination)" description="Copies a file or directory" :code="fsCopyCode">
            <el-input v-model="copySource" placeholder="Source" style="width: 150px; margin-right: 5px;" />
            <el-input v-model="copyDest" placeholder="Destination" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsCopy">Copy</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.move(source, destination)" description="Moves a file or directory" :code="fsMoveCode">
            <el-input v-model="moveSrc" placeholder="Source" style="width: 150px; margin-right: 5px;" />
            <el-input v-model="moveDst" placeholder="Destination" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsMove">Move</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.getStats(path)" description="Returns file statistics" :code="fsStatsCode">
            <el-input v-model="statsPath" placeholder="File path" style="width: 200px; margin-right: 10px;" />
            <el-button type="primary" @click="runFsStats">Get Stats</el-button>
          </ApiDemo>

          <ApiDemo title="filesystem.getAbsolutePath(path)" description="Returns absolute path" :code="fsAbsPathCode">
            <el-button type="primary" @click="runFsAbsPath">Execute</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Storage" name="storage">
        <template #label>
          <span class="tab-label"><el-icon><Collection /></el-icon> Storage</span>
        </template>
        <div class="api-section">
          <ApiDemo title="storage.setData(key, data)" description="Writes data to storage" :code="storageSetCode">
            <el-input v-model="storageKey" placeholder="Key" style="width: 150px; margin-right: 5px;" />
            <el-input v-model="storageValue" placeholder="Value" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runStorageSet">Set</el-button>
          </ApiDemo>

          <ApiDemo title="storage.getData(key)" description="Reads data from storage" :code="storageGetCode">
            <el-input v-model="storageGetKey" placeholder="Key" style="width: 150px; margin-right: 10px;" />
            <el-button type="primary" @click="runStorageGet">Get</el-button>
            <span v-if="storageResult" class="result-inline">{{ storageResult }}</span>
          </ApiDemo>

          <ApiDemo title="storage.removeData(key)" description="Removes a storage record" :code="storageRemoveCode">
            <el-input v-model="storageRemoveKey" placeholder="Key" style="width: 150px; margin-right: 10px;" />
            <el-button type="warning" @click="runStorageRemove">Remove</el-button>
          </ApiDemo>

          <ApiDemo title="storage.getKeys()" description="Returns all storage keys" :code="storageKeysCode">
            <el-button type="primary" @click="runStorageKeys">Get Keys</el-button>
          </ApiDemo>

          <ApiDemo title="storage.clear()" description="Clears all storage data" :code="storageClearCode">
            <el-button type="danger" @click="runStorageClear">Clear All</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Tray & Menu" name="tray-menu">
        <template #label>
          <span class="tab-label"><el-icon><Menu /></el-icon> Tray & Menu</span>
        </template>
        <div class="api-section">
          <ApiDemo title="window.setMainMenu(menu)" description="Creates the main window menu" :code="mainMenuCode">
            <el-button type="primary" @click="runSetMainMenu">Set Menu</el-button>
            <el-button type="warning" @click="runRemoveMainMenu">Remove</el-button>
          </ApiDemo>

          <ApiDemo title="os.setTray(options)" description="Creates/updates tray icon and menu" :code="setTrayCode">
            <el-button type="primary" @click="runSetTray">Set Tray</el-button>
            <el-button type="warning" @click="runRemoveTray">Remove</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Updater" name="updater">
        <template #label>
          <span class="tab-label"><el-icon><Refresh /></el-icon> Updater</span>
        </template>
        <div class="api-section">
          <ApiDemo title="updater.checkForUpdate()" description="Checks for application updates" :code="updaterCheckCode">
            <el-button type="primary" @click="runUpdaterCheck">Check</el-button>
          </ApiDemo>

          <ApiDemo title="updater.downloadUpdate()" description="Downloads the available update" :code="updaterDownloadCode">
            <el-button type="primary" @click="runUpdaterDownload">Download</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Events" name="events">
        <template #label>
          <span class="tab-label"><el-icon><Bell /></el-icon> Events</span>
        </template>
        <div class="api-section">
          <ApiDemo title="events.on(event, handler)" description="Registers an event listener" :code="eventsOnCode">
            <el-button type="primary" @click="runEventsOn">Listen</el-button>
          </ApiDemo>

          <ApiDemo title="events.off(event, handler)" description="Unregisters an event listener" :code="eventsOffCode">
            <el-button type="warning" @click="runEventsOff">Unlisten</el-button>
          </ApiDemo>

          <ApiDemo title="events.broadcast(event, data)" description="Broadcasts an event to all instances" :code="eventsBroadcastCode">
            <el-button type="primary" @click="runEventsBroadcast">Broadcast</el-button>
          </ApiDemo>

          <ApiDemo title="app.broadcast(event, data)" description="Dispatches event to all app instances" :code="appBroadcastCode">
            <el-button type="primary" @click="runAppBroadcast">Broadcast</el-button>
          </ApiDemo>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Practice" name="practice">
        <template #label>
          <span class="tab-label"><el-icon><Operation /></el-icon> Practice</span>
        </template>
        <div class="api-section practice-grid">
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
                <el-icon class="card-icon"><DocumentCopy /></el-icon>
                <span>Clipboard</span>
              </div>
            </template>
            <div class="card-content">
              <el-input v-model="clipboardText" placeholder="Text to copy" style="margin-bottom: 10px;" />
              <el-button type="primary" @click="testClipboard">
                <el-icon><CopyDocument /></el-icon>
                Copy to Clipboard
              </el-button>
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
              <el-input v-model="notifTitle" placeholder="Title" style="margin-bottom: 5px;" />
              <el-input v-model="notifContent" placeholder="Content" style="margin-bottom: 10px;" />
              <el-button type="primary" @click="testNotification">
                <el-icon><Bell /></el-icon>
                Send Notification
              </el-button>
            </div>
          </el-card>

          <el-card class="demo-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><FolderOpened /></el-icon>
                <span>File Dialogs</span>
              </div>
            </template>
            <div class="card-content">
              <el-button type="primary" @click="testOpenDialog">
                <el-icon><FolderOpened /></el-icon>
                Open File
              </el-button>
              <el-button type="success" @click="testSaveDialog">
                <el-icon><Document /></el-icon>
                Save File
              </el-button>
              <el-button type="warning" @click="testFolderDialog">
                <el-icon><Folder /></el-icon>
                Open Folder
              </el-button>
            </div>
          </el-card>

          <el-card class="demo-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><Terminal /></el-icon>
                <span>Command Execution</span>
              </div>
            </template>
            <div class="card-content">
              <el-input v-model="commandText" placeholder="Enter command" style="margin-bottom: 10px;" />
              <el-button type="primary" @click="testExecCommand">
                <el-icon><VideoPlay /></el-icon>
                Execute
              </el-button>
              <pre v-if="commandOutput" class="output-pre">{{ commandOutput }}</pre>
            </div>
          </el-card>

          <el-card class="demo-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><MessageBox /></el-icon>
                <span>Message Box</span>
              </div>
            </template>
            <div class="card-content">
              <el-button type="primary" @click="testMessageBox('info')">Info</el-button>
              <el-button type="success" @click="testMessageBox('question')">Question</el-button>
              <el-button type="warning" @click="testMessageBox('warn')">Warning</el-button>
              <el-button type="danger" @click="testMessageBox('error')">Error</el-button>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div v-if="apiOutput" class="output-panel">
      <div class="output-header">
        <span>Output</span>
        <el-button size="small" @click="apiOutput = ''">Clear</el-button>
      </div>
      <pre>{{ apiOutput }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Monitor, Cpu, Setting, FullScreen, DocumentCopy,
  FolderOpened, Collection, Menu, Refresh, Bell,
  Operation, Search, CopyDocument, Folder, Document,
  Promotion, SetUp, MessageBox
} from '@element-plus/icons-vue'
import ApiDemo from '@/components/ApiDemo.vue'

const activeCategory = ref('app')
const apiOutput = ref('')

const isNeutralino = () => typeof window !== 'undefined' && !!window.Neutralino
const getNeutralino = () => {
  if (!window.Neutralino) throw new Error('Neutralino is not available')
  return window.Neutralino
}

const output = (label: string, data: any) => {
  const result = typeof data === 'object' ? JSON.stringify(data, null, 2) : data
  apiOutput.value = `${label}:\n${result}`
}

const windowTitle = ref('')
const windowResult = ref('')
const moveX = ref(100)
const moveY = ref(100)

const commandText = ref('echo "Hello"')
const envKey = ref('PATH')
const pathName = ref('downloads')
const openUrl = ref('https://neutralino.js.org')
const notifTitle = ref('Notification')
const notifContent = ref('Hello from Neutralino!')
const osResult = ref('')

const clipboardText = ref('Copy this text!')
const clipboardResult = ref('')

const filePath = ref('./test.txt')
const fileContent = ref('')
const fileWritePath = ref('./newfile.txt')
const fileAppendContent = ref('')
const fileAppendPath = ref('./log.txt')
const dirPath = ref('./newdir')
const removePath = ref('./oldfile.txt')
const copySource = ref('')
const copyDest = ref('')
const moveSrc = ref('')
const moveDst = ref('')
const statsPath = ref('./test.txt')

const storageKey = ref('testKey')
const storageValue = ref('testValue')
const storageGetKey = ref('testKey')
const storageRemoveKey = ref('testKey')
const storageResult = ref('')
const updaterResult = ref('')

const appExitCode = `await Neutralino.app.exit();`
const appGetConfigCode = `const config = await Neutralino.app.getConfig();
console.log('URL = ', config.url);`
const appBroadcastCode = `await Neutralino.app.broadcast('myTestEvent', 'Hello');`
const appRestartCode = `await Neutralino.app.restartProcess();
await Neutralino.app.restartProcess({ args: '--restarted' });`
const appKillCode = `await Neutralino.app.killProcess();`

const windowSetTitleCode = `await Neutralino.window.setTitle('New Title');`
const windowGetTitleCode = `const title = await Neutralino.window.getTitle();
console.log(\`title = \${title}\`);`
const windowMinimizeCode = `await Neutralino.window.minimize();
await Neutralino.window.unminimize();`
const windowMaximizeCode = `await Neutralino.window.maximize();
await Neutralino.window.unmaximize();`
const windowIsMaximizedCode = `const status = await Neutralino.window.isMaximized();`
const windowFullScreenCode = `await Neutralino.window.setFullScreen();
await Neutralino.window.exitFullScreen();`
const windowShowHideCode = `await Neutralino.window.show();
await Neutralino.window.hide();`
const windowCenterCode = `await Neutralino.window.center();`
const windowMoveCode = `await Neutralino.window.move(200, 400);`
const windowSetSizeCode = `await Neutralino.window.setSize({ width: 500, height: 400 });`
const windowGetSizeCode = `const size = await Neutralino.window.getSize();
console.log(size);`
const windowGetPositionCode = `const position = await Neutralino.window.getPosition();
console.log(position);`
const windowAlwaysOnTopCode = `await Neutralino.window.setAlwaysOnTop(true);
await Neutralino.window.setAlwaysOnTop(false);`
const windowFocusCode = `await Neutralino.window.focus();`
const windowPrintCode = `await Neutralino.window.print();`
const windowIsMinimizedCode = `const minimized = await Neutralino.window.isMinimized();`
const windowIsVisibleCode = `const visible = await Neutralino.window.isVisible();`
const windowIsFullScreenCode = `const fullscreen = await Neutralino.window.isFullScreen();`
const windowBorderlessCode = `await Neutralino.window.setBorderless(true);
await Neutralino.window.setBorderless(false);`
const windowSetIconCode = `await Neutralino.window.setIcon('/resources/icons/appIcon.png');`
const windowDraggableCode = `await Neutralino.window.setDraggableRegion('draggable-header');`
const windowSnapshotCode = `await Neutralino.window.snapshot('./screenshot.png');`

const computerOSInfoCode = `const osInfo = await Neutralino.computer.getOSInfo();
console.log(\`OS: \${osInfo.name}\`);`
const computerMemoryCode = `const info = await Neutralino.computer.getMemoryInfo();
console.log(\`RAM: \${(info.physical.total / 1024 / 1024 / 1024).toFixed(2)} GB\`);`
const computerCPUCode = `const cpuInfo = await Neutralino.computer.getCPUInfo();
console.log(\`CPU: \${cpuInfo.model}\`);`
const computerArchCode = `const arch = await Neutralino.computer.getArch();
console.log(arch);`
const computerKernelCode = `const kernelInfo = await Neutralino.computer.getKernelInfo();
console.log(\`Kernel: \${kernelInfo.variant}\`);`
const computerDisplaysCode = `const displays = await Neutralino.computer.getDisplays();
for (let display of displays) { console.log(display); }`
const computerMousePosCode = `const pos = await Neutralino.computer.getMousePosition();
console.log(\`Pos: \${pos.x}, \${pos.y}\`);`
const computerSetMouseCode = `await Neutralino.computer.setMousePosition(50, 60);`

const osExecCode = `const info = await Neutralino.os.execCommand('python --version');
console.log(\`Output: \${info.output || info.stdOut}\`);`
const osGetEnvCode = `const value = await Neutralino.os.getEnv('USER');
console.log(\`USER = \${value}\`);`
const osGetEnvsCode = `const envs = await Neutralino.os.getEnvs();
console.log(envs);`
const osGetPathCode = `const downloadsPath = await Neutralino.os.getPath('downloads');
console.log(\`Downloads: \${downloadsPath}\`);`
const osOpenCode = `Neutralino.os.open('https://neutralino.js.org');`
const osShowOpenDialogCode = `const entries = await Neutralino.os.showOpenDialog('Open File', {
  filters: [{ name: 'All files', extensions: ['*'] }]
});
console.log('Selected:', entries);`
const osShowSaveDialogCode = `const entry = await Neutralino.os.showSaveDialog('Save File', {
  defaultPath: 'untitled.txt'
});
console.log('Selected:', entry);`
const osShowFolderDialogCode = `const entry = await Neutralino.os.showFolderDialog('Select Folder');
console.log('Selected:', entry);`
const osNotificationCode = `Neutralino.os.showNotification('Hello', 'It works!', 'INFO');
Neutralino.os.showNotification('Error', 'Something went wrong', 'ERROR');`
const osMessageBoxCode = `const button = await Neutralino.os.showMessageBox(
  'Confirm', 'Are you sure?', 'YES_NO', 'QUESTION'
);
if (button == 'YES') { /* User clicked YES */ }`
const osSpawnProcessCode = `const pingProc = await Neutralino.os.spawnProcess('ping neutralino.js.org');
console.log(\`Process ID: \${pingProc.id}\`);`
const osGetProcessesCode = `const processes = await Neutralino.os.getSpawnedProcesses();
console.log(processes);`

const clipboardWriteCode = `await Neutralino.clipboard.writeText('Hello from Neutralino!');`
const clipboardReadCode = `const text = await Neutralino.clipboard.readText();
console.log(\`Clipboard: \${text}\`);`
const clipboardFormatCode = `const format = await Neutralino.clipboard.getFormat();
console.log(\`Format: \${format}\`);`

const fsReadFileCode = `const data = await Neutralino.filesystem.readFile('./myFile.txt');
console.log(\`Content: \${data}\`);`
const fsWriteFileCode = `await Neutralino.filesystem.writeFile('./myFile.txt', 'Hello World!');`
const fsAppendFileCode = `await Neutralino.filesystem.appendFile('./log.txt', 'New entry\\n');`
const fsCreateDirCode = `await Neutralino.filesystem.createDirectory('./newDirectory');`
const fsRemoveCode = `await Neutralino.filesystem.remove('./tmpDirectory');`
const fsReadDirCode = `const entries = await Neutralino.filesystem.readDirectory('.');
console.log('Content: ', entries);`
const fsCopyCode = `await Neutralino.filesystem.copy('./source.txt', './dest.txt');`
const fsMoveCode = `await Neutralino.filesystem.move('./old.txt', './new.txt');`
const fsStatsCode = `const stats = await Neutralino.filesystem.getStats('./myFile.txt');
console.log('Stats:', stats);`
const fsAbsPathCode = `const absPath = await Neutralino.filesystem.getAbsolutePath('./myFile.txt');
console.log(absPath);`

const storageSetCode = `await Neutralino.storage.setData('userDetails',
  JSON.stringify({ username: 'TestValue'})
);`
const storageGetCode = `const data = await Neutralino.storage.getData('userDetails');
console.log(\`Data: \${data}\`);`
const storageRemoveCode = `await Neutralino.storage.removeData('userDetails');`
const storageKeysCode = `const keys = await Neutralino.storage.getKeys();
console.log('Keys: ', keys);`
const storageClearCode = `await Neutralino.storage.clear();`

const mainMenuCode = `const menu = [
  { label: 'File', submenu: [
    { label: 'Open' },
    { label: '-' },
    { label: 'Quit' }
  ]},
  { label: 'Edit', submenu: [
    { label: 'Cut' },
    { label: 'Copy' },
    { label: 'Paste' }
  ]}
];
await Neutralino.window.setMainMenu(menu);`

const setTrayCode = `const tray = {
  icon: '/resources/icons/trayIcon.png',
  menuItems: [
    { id: 'about', text: 'About' },
    { text: '-' },
    { id: 'quit', text: 'Quit' }
  ]
};
await Neutralino.os.setTray(tray);`

const updaterCheckCode = `const update = await Neutralino.updater.checkForUpdate();
console.log('Update available:', update);`
const updaterDownloadCode = `await Neutralino.updater.downloadUpdate();`
const updaterInstallCode = `await Neutralino.updater.install();`
const updaterStateCode = `const state = await Neutralino.updater.getState();
console.log('State:', state);`

const eventsOnCode = `Neutralino.app.on('myEvent', (data) => {
  console.log('Event received:', data);
});`
const eventsOffCode = `Neutralino.app.off('myEvent');`
const eventsBroadcastCode = `await Neutralino.app.broadcast('myEvent', { data: 'Hello' });`

const runAppExit = async () => {
  try { await getNeutralino().app.exit() } catch (e: any) { ElMessage.error(e.message) }
}
const runAppGetConfig = async () => {
  try { const config = await getNeutralino().app.getConfig(); output('App Config', config) } catch (e: any) { ElMessage.error(e.message) }
}
const runAppBroadcast = async () => {
  try { await getNeutralino().app.broadcast('myTestEvent', { time: Date.now() }); ElMessage.success('Event broadcast sent') } catch (e: any) { ElMessage.error(e.message) }
}
const runAppRestart = async () => {
  try { await getNeutralino().app.restartProcess() } catch (e: any) { ElMessage.error(e.message) }
}
const runAppKill = async () => {
  try { await getNeutralino().app.killProcess() } catch (e: any) { ElMessage.error(e.message) }
}

const runWindowSetTitle = async () => {
  try { await getNeutralino().window.setTitle(windowTitle.value || 'OrionDesk'); ElMessage.success('Title set') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowGetTitle = async () => {
  try { const title = await getNeutralino().window.getTitle(); windowResult.value = title } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowMinimize = async () => {
  try { await getNeutralino().window.minimize() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowUnminimize = async () => {
  try { await getNeutralino().window.unminimize() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowMaximize = async () => {
  try { await getNeutralino().window.maximize() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowUnmaximize = async () => {
  try { await getNeutralino().window.unmaximize() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowIsMaximized = async () => {
  try { const status = await getNeutralino().window.isMaximized(); windowResult.value = status ? 'Maximized' : 'Not Maximized' } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowSetFullScreen = async () => {
  try { await getNeutralino().window.setFullScreen() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowExitFullScreen = async () => {
  try { await getNeutralino().window.exitFullScreen() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowShow = async () => {
  try { await getNeutralino().window.show() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowHide = async () => {
  try { await getNeutralino().window.hide() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowCenter = async () => {
  try { await getNeutralino().window.center(); ElMessage.success('Window centered') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowMove = async () => {
  try { await getNeutralino().window.move(moveX.value, moveY.value) } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowSetSize = async () => {
  try { await getNeutralino().window.setSize({ width: 500, height: 400 }); ElMessage.success('Size set to 500x400') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowGetSize = async () => {
  try { const size = await getNeutralino().window.getSize(); windowResult.value = `${size.width}x${size.height}` } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowGetPosition = async () => {
  try { const pos = await getNeutralino().window.getPosition(); windowResult.value = `x: ${pos.x}, y: ${pos.y}` } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowAlwaysOnTop = async (onTop: boolean) => {
  try { await getNeutralino().window.setAlwaysOnTop(onTop); ElMessage.success(onTop ? 'Always on top enabled' : 'Disabled') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowFocus = async () => {
  try { await getNeutralino().window.focus() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowPrint = async () => {
  try { await getNeutralino().window.print() } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowIsMinimized = async () => {
  try { const status = await getNeutralino().window.isMinimized(); windowResult.value = status ? 'Minimized' : 'Not Minimized' } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowIsVisible = async () => {
  try { const status = await getNeutralino().window.isVisible(); windowResult.value = status ? 'Visible' : 'Hidden' } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowIsFullScreen = async () => {
  try { const status = await getNeutralino().window.isFullScreen(); windowResult.value = status ? 'Full Screen' : 'Windowed' } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowBorderless = async (borderless: boolean) => {
  try { await getNeutralino().window.setBorderless(borderless); ElMessage.success(borderless ? 'Borderless mode' : 'Normal mode') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowSetIcon = async () => {
  try { await getNeutralino().window.setIcon('/resources/icons/appIcon.png'); ElMessage.success('Icon set') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowDraggable = async (elementId: string) => {
  try { await getNeutralino().window.setDraggableRegion(elementId); ElMessage.success('Draggable region set') } catch (e: any) { ElMessage.error(e.message) }
}
const runWindowSnapshot = async () => {
  try { await getNeutralino().window.snapshot('./screenshot.png'); ElMessage.success('Screenshot saved') } catch (e: any) { ElMessage.error(e.message) }
}

const runComputerOSInfo = async () => {
  try { const info = await getNeutralino().computer.getOSInfo(); output('OS Info', info) } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerMemory = async () => {
  try { const info = await getNeutralino().computer.getMemoryInfo(); output('Memory', { physical: `${(info.physical.total / 1024 / 1024 / 1024).toFixed(2)} GB`, available: `${(info.physical.available / 1024 / 1024 / 1024).toFixed(2)} GB` }) } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerCPU = async () => {
  try { const info = await getNeutralino().computer.getCPUInfo(); output('CPU Info', info) } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerArch = async () => {
  try { const arch = await getNeutralino().computer.getArch(); windowResult.value = arch } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerKernel = async () => {
  try { const info = await getNeutralino().computer.getKernelInfo(); output('Kernel Info', info) } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerDisplays = async () => {
  try { const displays = await getNeutralino().computer.getDisplays(); output('Displays', displays) } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerMousePos = async () => {
  try { const pos = await getNeutralino().computer.getMousePosition(); output('Mouse Position', pos) } catch (e: any) { ElMessage.error(e.message) }
}
const runComputerSetMouse = async () => {
  try { await getNeutralino().computer.setMousePosition(100, 100); ElMessage.success('Mouse moved') } catch (e: any) { ElMessage.error(e.message) }
}

const runOsExec = async () => {
  if (!commandText.value.trim()) { ElMessage.warning('Enter a command'); return }
  try { const result = await getNeutralino().os.execCommand(commandText.value); output('Command Output', result.output || result.stdOut || result) } catch (e: any) { ElMessage.error(e.message) }
}
const runOsGetEnv = async () => {
  if (!envKey.value.trim()) { ElMessage.warning('Enter variable name'); return }
  try { const value = await getNeutralino().os.getEnv(envKey.value); osResult.value = value } catch (e: any) { ElMessage.error(e.message) }
}
const runOsGetEnvs = async () => {
  try { const envs = await getNeutralino().os.getEnvs(); output('Environment Variables', envs) } catch (e: any) { ElMessage.error(e.message) }
}
const runOsGetPath = async () => {
  try { const path = await getNeutralino().os.getPath(pathName.value); osResult.value = path } catch (e: any) { ElMessage.error(e.message) }
}
const runOsOpen = async () => {
  if (!openUrl.value.trim()) { ElMessage.warning('Enter a URL'); return }
  try { await getNeutralino().os.open(openUrl.value) } catch (e: any) { ElMessage.error(e.message) }
}
const runOsShowOpenDialog = async () => {
  try { const entries = await getNeutralino().os.showOpenDialog('Open File', { multiSelections: false }); if (entries.length > 0) { output('Selected Files', entries) } } catch (e: any) { ElMessage.error(e.message) }
}
const runOsShowSaveDialog = async () => {
  try { const entry = await getNeutralino().os.showSaveDialog('Save File'); if (entry) { output('Save Path', entry) } } catch (e: any) { ElMessage.error(e.message) }
}
const runOsShowFolderDialog = async () => {
  try { const entry = await getNeutralino().os.showFolderDialog('Select Folder'); if (entry) { output('Selected Folder', entry) } } catch (e: any) { ElMessage.error(e.message) }
}
const runOsNotification = async (icon: string) => {
  try { await getNeutralino().os.showNotification(notifTitle.value, notifContent.value, icon) } catch (e: any) { ElMessage.error(e.message) }
}
const runOsMessageBox = async (choice: string, icon: string) => {
  try { const button = await getNeutralino().os.showMessageBox(choice === 'OK' ? 'Alert' : 'Confirm', choice === 'OK' ? 'This is an alert' : 'Are you sure?', choice, icon); output('Message Box', `Button clicked: ${button}`) } catch (e: any) { ElMessage.error(e.message) }
}
const runOsSpawnProcess = async () => {
  try { const proc = await getNeutralino().os.spawnProcess('echo "Background process"'); output('Spawned Process', proc) } catch (e: any) { ElMessage.error(e.message) }
}
const runOsGetProcesses = async () => {
  try { const procs = await getNeutralino().os.getSpawnedProcesses(); output('Spawned Processes', procs) } catch (e: any) { ElMessage.error(e.message) }
}

const runClipboardWrite = async () => {
  if (!clipboardText.value.trim()) { ElMessage.warning('Enter text to copy'); return }
  try { await getNeutralino().clipboard.writeText(clipboardText.value); ElMessage.success('Copied to clipboard') } catch (e: any) { ElMessage.error(e.message) }
}
const runClipboardRead = async () => {
  try { clipboardResult.value = await getNeutralino().clipboard.readText() } catch (e: any) { ElMessage.error(e.message) }
}
const runClipboardFormat = async () => {
  try { clipboardResult.value = await getNeutralino().clipboard.getFormat() } catch (e: any) { ElMessage.error(e.message) }
}

const runFsReadFile = async () => {
  if (!filePath.value.trim()) { ElMessage.warning('Enter file path'); return }
  try { const data = await getNeutralino().filesystem.readFile(filePath.value); output('File Content', data) } catch (e: any) { ElMessage.error(e.message) }
}
const runFsWriteFile = async () => {
  if (!fileWritePath.value.trim() || !fileContent.value.trim()) { ElMessage.warning('Enter file path and content'); return }
  try { await getNeutralino().filesystem.writeFile(fileWritePath.value, fileContent.value); ElMessage.success('File written') } catch (e: any) { ElMessage.error(e.message) }
}
const runFsAppendFile = async () => {
  if (!fileAppendPath.value.trim()) { ElMessage.warning('Enter file path'); return }
  try { await getNeutralino().filesystem.appendFile(fileAppendPath.value, fileAppendContent.value || '\n'); ElMessage.success('Content appended') } catch (e: any) { ElMessage.error(e.message) }
}
const runFsCreateDir = async () => {
  if (!dirPath.value.trim()) { ElMessage.warning('Enter directory path'); return }
  try { await getNeutralino().filesystem.createDirectory(dirPath.value); ElMessage.success('Directory created') } catch (e: any) { ElMessage.error(e.message) }
}
const runFsRemove = async () => {
  if (!removePath.value.trim()) { ElMessage.warning('Enter path to remove'); return }
  try { await getNeutralino().filesystem.remove(removePath.value); ElMessage.success('Removed') } catch (e: any) { ElMessage.error(e.message) }
}
const runFsReadDir = async () => {
  try { const entries = await getNeutralino().filesystem.readDirectory('.'); output('Directory Contents', entries) } catch (e: any) { ElMessage.error(e.message) }
}
const runFsCopy = async () => {
  if (!copySource.value.trim() || !copyDest.value.trim()) { ElMessage.warning('Enter source and destination'); return }
  try { await getNeutralino().filesystem.copy(copySource.value, copyDest.value); ElMessage.success('Copied') } catch (e: any) { ElMessage.error(e.message) }
}
const runFsMove = async () => {
  if (!moveSrc.value.trim() || !moveDst.value.trim()) { ElMessage.warning('Enter source and destination'); return }
  try { await getNeutralino().filesystem.move(moveSrc.value, moveDst.value); ElMessage.success('Moved') } catch (e: any) { ElMessage.error(e.message) }
}
const runFsStats = async () => {
  if (!statsPath.value.trim()) { ElMessage.warning('Enter file path'); return }
  try { const stats = await getNeutralino().filesystem.getStats(statsPath.value); output('File Stats', stats) } catch (e: any) { ElMessage.error(e.message) }
}
const runFsAbsPath = async () => {
  try { const path = await getNeutralino().filesystem.getAbsolutePath('.'); output('Absolute Path', path) } catch (e: any) { ElMessage.error(e.message) }
}

const runStorageSet = async () => {
  if (!storageKey.value.trim()) { ElMessage.warning('Enter a key'); return }
  try { await getNeutralino().storage.setData(storageKey.value, storageValue.value); ElMessage.success('Data saved') } catch (e: any) { ElMessage.error(e.message) }
}
const runStorageGet = async () => {
  if (!storageGetKey.value.trim()) { ElMessage.warning('Enter a key'); return }
  try { storageResult.value = await getNeutralino().storage.getData(storageGetKey.value) } catch (e: any) { ElMessage.error(e.message) }
}
const runStorageRemove = async () => {
  if (!storageRemoveKey.value.trim()) { ElMessage.warning('Enter a key'); return }
  try { await getNeutralino().storage.removeData(storageRemoveKey.value); ElMessage.success('Data removed') } catch (e: any) { ElMessage.error(e.message) }
}
const runStorageKeys = async () => {
  try { const keys = await getNeutralino().storage.getKeys(); output('Storage Keys', keys) } catch (e: any) { ElMessage.error(e.message) }
}
const runStorageClear = async () => {
  try { await getNeutralino().storage.clear(); ElMessage.success('Storage cleared') } catch (e: any) { ElMessage.error(e.message) }
}

const runSetMainMenu = async () => {
  try { await getNeutralino().window.setMainMenu([{ label: 'File', submenu: [{ label: 'Open' }, { label: '-' }, { label: 'Quit' }] }, { label: 'Edit', submenu: [{ label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }] }, { label: 'Help', submenu: [{ label: 'About' }] }] as any); ElMessage.success('Menu set') } catch (e: any) { ElMessage.error(e.message) }
}
const runRemoveMainMenu = async () => {
  try { await getNeutralino().window.setMainMenu([] as any); ElMessage.success('Menu removed') } catch (e: any) { ElMessage.error(e.message) }
}
const runSetTray = async () => {
  try { await getNeutralino().os.setTray({ icon: '/resources/icons/tray.png', menuItems: [{ id: 'show', text: 'Show' }, { id: 'hide', text: 'Hide' }, { text: '-' }, { id: 'quit', text: 'Quit' }] }); ElMessage.success('Tray set') } catch (e: any) { ElMessage.error(e.message) }
}
const runRemoveTray = async () => {
  try { await getNeutralino().os.setTray({ icon: '', menuItems: [] }); ElMessage.success('Tray removed') } catch (e: any) { ElMessage.error(e.message) }
}

const runUpdaterCheck = async () => {
  try { const update = await getNeutralino().updater.checkForUpdates('https://example.com/update.json'); output('Update Check', update) } catch (e: any) { ElMessage.error(e.message) }
}
const runUpdaterDownload = async () => {
  try {
    ElMessage.info('Updater not configured - add update.json URL to settings')
  } catch (e: any) { ElMessage.error(e.message) }
}
const runUpdaterState = async () => {
  try { updaterResult.value = 'Updater not configured' } catch (e: any) { ElMessage.error(e.message) }
}

const runEventsOn = async () => {
  try {
    ElMessage.success('Use app.broadcast() to send events, app.on()/off() are not supported in web mode')
  } catch (e: any) { ElMessage.error(e.message) }
}
const runEventsOff = async () => {
  try { ElMessage.info('Event listener removed (simulated)') } catch (e: any) { ElMessage.error(e.message) }
}
const runEventsBroadcast = async () => {
  try { await getNeutralino().app.broadcast('myEvent', { time: Date.now() }); ElMessage.success('Event broadcasted') } catch (e: any) { ElMessage.error(e.message) }
}

const loading = ref(false)
const systemInfo = ref('')
const commandOutput = ref('')

const getSystemInfo = async () => {
  loading.value = true
  try {
    const [osInfo, cpuInfo, memoryInfo] = await Promise.all([
      getNeutralino().computer.getOSInfo(),
      getNeutralino().computer.getCPUInfo(),
      getNeutralino().computer.getMemoryInfo()
    ])
    systemInfo.value = `OS: ${osInfo.name}\nVersion: ${osInfo.version}\nDescription: ${osInfo.description}\nCPU: ${cpuInfo.model}\nMemory: ${(memoryInfo.physical.total / 1024 / 1024 / 1024).toFixed(2)} GB`
  } catch (e: any) {
    ElMessage.error(e.message)
  } finally {
    loading.value = false
  }
}

const testClipboard = async () => {
  try { await getNeutralino().clipboard.writeText(clipboardText.value); ElMessage.success('Copied!') } catch (e: any) { ElMessage.error(e.message) }
}

const testNotification = async () => {
  try { await getNeutralino().os.showNotification(notifTitle.value, notifContent.value) } catch (e: any) { ElMessage.error(e.message) }
}

const testOpenDialog = async () => {
  try { const files = await getNeutralino().os.showOpenDialog('Open File', { multiSelections: false }); if (files.length) { output('Selected', files) } } catch (e: any) { ElMessage.error(e.message) }
}
const testSaveDialog = async () => {
  try { const file = await getNeutralino().os.showSaveDialog('Save File'); if (file) { output('Save Path', file) } } catch (e: any) { ElMessage.error(e.message) }
}
const testFolderDialog = async () => {
  try { const folder = await getNeutralino().os.showFolderDialog('Select Folder'); if (folder) { output('Selected Folder', folder) } } catch (e: any) { ElMessage.error(e.message) }
}

const testExecCommand = async () => {
  if (!commandText.value.trim()) { ElMessage.warning('Enter a command'); return }
  try { const result = await getNeutralino().os.execCommand(commandText.value); commandOutput.value = result.output || result.stdOut || JSON.stringify(result) } catch (e: any) { ElMessage.error(e.message) }
}

const testMessageBox = async (type: string) => {
  try {
    const icons: Record<string, string> = { info: 'INFO', question: 'QUESTION', warn: 'WARNING', error: 'ERROR' }
    const buttons: Record<string, string> = { info: 'OK', question: 'YES_NO', warn: 'OK', error: 'OK' }
    await getNeutralino().os.showMessageBox(type.charAt(0).toUpperCase() + type.slice(1), `This is a ${type} message`, buttons[type], icons[type])
  } catch (e: any) { ElMessage.error(e.message) }
}

onMounted(() => {
  if (isNeutralino() && window.Neutralino) { window.Neutralino.init() }
})
</script>

<style scoped>
.api-demo { padding: 20px; max-width: 1200px; }
.demo-header { margin-bottom: 20px; }
.demo-header h2 { margin: 0 0 5px 0; font-size: 24px; }
.demo-header p { margin: 0; color: #666; }
.api-tabs :deep(.el-tabs__header) { background: #fff; border-radius: 8px; padding: 10px; }
.tab-label { display: flex; align-items: center; gap: 5px; }
.api-section { display: flex; flex-direction: column; gap: 15px; }
.output-panel { margin-top: 20px; background: #1e1e1e; border-radius: 8px; overflow: hidden; }
.output-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background: #2d2d2d; color: #fff; }
.output-header span { font-weight: bold; }
.output-panel pre { margin: 0; padding: 15px; color: #0f0; overflow-x: auto; max-height: 300px; }
.result-inline { margin-left: 10px; color: #67c23a; }
</style>
