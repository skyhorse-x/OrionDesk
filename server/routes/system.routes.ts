import { Hono } from 'hono'
import { exec } from 'child_process'
import path from 'path'

export const systemRoutes = new Hono()

systemRoutes.get('/info', (c) => {
  return c.json({
    platform: process.platform,
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage()
  })
})

systemRoutes.post('/open-directory', async (c) => {
  const body = await c.req.json()
  const { directory } = body

  if (!directory) {
    return c.json({ error: 'Directory path is required' }, 400)
  }

  const normalizedPath = path.resolve(directory)
  let command: string

  switch (process.platform) {
    case 'darwin':
      command = `open "${normalizedPath}"`
      break
    case 'win32':
      command = `start "" "${normalizedPath}"`
      break
    case 'linux':
      command = `xdg-open "${normalizedPath}"`
      break
    default:
      return c.json({ error: 'Unsupported platform' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(command, (error) => {
      if (error) {
        resolve(c.json({ error: error.message }, 500))
      } else {
        resolve(c.json({ success: true, message: `Opened directory: ${normalizedPath}` }))
      }
    })
  })
})

systemRoutes.post('/notification', async (c) => {
  const body = await c.req.json()
  const { title, content } = body

  if (!title || !content) {
    return c.json({ error: 'Title and content are required' }, 400)
  }

  let command: string
  const platform = process.platform

  switch (platform) {
    case 'darwin':
      command = `osascript -e 'display notification "${content.replace(/"/g, '\\"')}" with title "${title.replace(/"/g, '\\"')}"'`
      break
    case 'win32':
      command = `powershell -Command "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null; $template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02); $textNodes = $template.GetElementsByTagName('text'); $textNodes.Item(0).AppendChild($template.CreateTextNode('${title.replace(/'/g, "''")}')) | Out-Null; $textNodes.Item(1).AppendChild($template.CreateTextNode('${content.replace(/'/g, "''")}')) | Out-Null; $toast = [Windows.UI.Notifications.ToastNotification]::new($template); [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('OrionDesk').Show($toast)"`
      break
    case 'linux':
      command = `notify-send "${title.replace(/"/g, '\\"')}" "${content.replace(/"/g, '\\"')}"`
      break
    default:
      return c.json({ error: 'Unsupported platform' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(command, (error) => {
      if (error) {
        resolve(c.json({ error: error.message }, 500))
      } else {
        resolve(c.json({ success: true, message: 'Notification sent' }))
      }
    })
  })
})

systemRoutes.post('/clipboard', async (c) => {
  const body = await c.req.json()
  const { action, text } = body

  if (!action || !['read', 'write'].includes(action)) {
    return c.json({ error: 'Invalid action. Use "read" or "write"' }, 400)
  }

  if (action === 'write' && !text) {
    return c.json({ error: 'Text is required for write action' }, 400)
  }

  let command: string
  switch (process.platform) {
    case 'darwin':
      command = action === 'write'
        ? `echo "${text.replace(/"/g, '\\"')}" | pbcopy`
        : `pbpaste`
      break
    case 'win32':
      command = action === 'write'
        ? `powershell -Command "Set-Clipboard -Value '\\"${text.replace(/'/g, "''")}\\"'"`
        : `powershell -Command "Get-Clipboard"`
      break
    case 'linux':
      command = action === 'write'
        ? `echo "${text.replace(/"/g, '\\"')}" | xclip -selection clipboard`
        : `xclip -selection clipboard -o`
      break
    default:
      return c.json({ error: 'Unsupported platform' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(command, (error, stdout) => {
      if (error) {
        resolve(c.json({ error: error.message }, 500))
      } else {
        resolve(c.json({ success: true, text: action === 'read' ? stdout.trim() : undefined }))
      }
    })
  })
})

systemRoutes.post('/exec-command', async (c) => {
  const body = await c.req.json()
  const { command: cmd } = body

  if (!cmd) {
    return c.json({ error: 'Command is required' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        resolve(c.json({ error: error.message, output: stdout, stderr }, 500))
      } else {
        resolve(c.json({ success: true, output: stdout, stderr }))
      }
    })
  })
})

systemRoutes.post('/dialog/message', async (c) => {
  const body = await c.req.json()
  const { type, title, message } = body

  if (!type || !['alert', 'confirm'].includes(type)) {
    return c.json({ error: 'Invalid type. Use "alert" or "confirm"' }, 400)
  }
  if (!message) {
    return c.json({ error: 'Message is required' }, 400)
  }

  let command: string
  switch (process.platform) {
    case 'darwin':
      if (type === 'alert') {
        command = `osascript -e 'display dialog "${message.replace(/"/g, '\\"')}" buttons {"OK"} with title "${title?.replace(/"/g, '\\"') || 'Alert'}"'`
      } else {
        command = `osascript -e 'display dialog "${message.replace(/"/g, '\\"')}" buttons {"Cancel", "OK"} default button "OK" cancel button "Cancel" with title "${title?.replace(/"/g, '\\"') || 'Confirm'}"'`
      }
      break
    case 'win32':
      command = type === 'alert'
        ? `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('${message.replace(/'/g, "''")}', '${title?.replace(/'/g, "''") || 'Alert'}', [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)"`
        : `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; $result = [System.Windows.Forms.MessageBox]::Show('${message.replace(/'/g, "''")}', '${title?.replace(/'/g, "''") || 'Confirm'}', [System.Windows.Forms.MessageBoxButtons]::OKCancel, [System.Windows.Forms.MessageBoxIcon]::Question); if ($result -eq 'OK') { exit 0 } else { exit 1 }"`
      break
    case 'linux':
      command = type === 'alert'
        ? `zenity --info --text="${message.replace(/"/g, '\\"')}" --title="${title?.replace(/"/g, '\\"') || 'Alert'}"`
        : `zenity --question --text="${message.replace(/"/g, '\\"')}" --title="${title?.replace(/"/g, '\\"') || 'Confirm'}"`
      break
    default:
      return c.json({ error: 'Unsupported platform' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(command, { timeout: 30000 }, (error, stdout) => {
      if (error) {
        resolve(c.json({ success: false, cancelled: error.message.includes('User canceled') || error.message.includes('Cancel') }))
      } else {
        resolve(c.json({ success: true, cancelled: false }))
      }
    })
  })
})

systemRoutes.post('/dialog/open', async (c) => {
  const body = await c.req.json()
  const { title, directory } = body

  let command: string
  switch (process.platform) {
    case 'darwin':
      command = directory
        ? `osascript -e 'POSIX path of (choose folder prompt "${title?.replace(/"/g, '\\"') || 'Select Folder'}")'`
        : `osascript -e 'POSIX path of (choose file prompt "${title?.replace(/"/g, '\\"') || 'Select File'}")'`
      break
    case 'win32':
      command = directory
        ? `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; $folder = New-Object System.Windows.Forms.FolderBrowserDialog; $folder.Description = '${title?.replace(/'/g, "''") || 'Select Folder'}'; if ($folder.ShowDialog() -eq 'OK') { $folder.SelectedPath }"`
        : `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; $file = New-Object System.Windows.Forms.OpenFileDialog; $file.Title = '${title?.replace(/'/g, "''") || 'Select File'}'; if ($file.ShowDialog() -eq 'OK') { $file.FileName }"`
      break
    case 'linux':
      command = directory
        ? `zenity --file-selection --directory --title="${title?.replace(/"/g, '\\"') || 'Select Folder'}"`
        : `zenity --file-selection --title="${title?.replace(/"/g, '\\"') || 'Select File'}"`
      break
    default:
      return c.json({ error: 'Unsupported platform' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(command, { timeout: 60000 }, (error, stdout) => {
      if (error || !stdout.trim()) {
        resolve(c.json({ success: false, path: null }))
      } else {
        resolve(c.json({ success: true, path: stdout.trim() }))
      }
    })
  })
})

systemRoutes.post('/dialog/save', async (c) => {
  const body = await c.req.json()
  const { title, defaultPath } = body

  let command: string
  switch (process.platform) {
    case 'darwin':
      command = `osascript -e 'POSIX path of (choose file name prompt "${title?.replace(/"/g, '\\"') || 'Save File'}" default name "${defaultPath?.replace(/"/g, '\\"') || 'untitled'}")'`
      break
    case 'win32':
      command = `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; $save = New-Object System.Windows.Forms.SaveFileDialog; $save.Title = '${title?.replace(/'/g, "''") || 'Save File'}'; $save.FileName = '${defaultPath?.replace(/'/g, "''") || 'untitled'}'; if ($save.ShowDialog() -eq 'OK') { $save.FileName }"`
      break
    case 'linux':
      command = `zenity --file-selection --save --title="${title?.replace(/"/g, '\\"') || 'Save File'}" --filename="${defaultPath?.replace(/"/g, '\\"') || 'untitled'}"`
      break
    default:
      return c.json({ error: 'Unsupported platform' }, 400)
  }

  return new Promise<Response>((resolve) => {
    exec(command, { timeout: 60000 }, (error, stdout) => {
      if (error || !stdout.trim()) {
        resolve(c.json({ success: false, path: null }))
      } else {
        resolve(c.json({ success: true, path: stdout.trim() }))
      }
    })
  })
})