import { createI18n } from "vue-i18n"

const messages = {
  en: {
    nav: {
      home: "Home",
      api: "API",
      dataTable: "Data Table",
      settings: "Settings"
    },
    home: {
      welcome: "Welcome to OrionDesk",
      subtitle: "Neutralino + Bun + Vue lightweight desktop template",
      systemInfo: "System Information",
      getSystemInfo: "Get System Info",
      fileDialogs: "File Dialogs",
      openFile: "Open File",
      openFolder: "Open Folder",
      saveFile: "Save File",
      notifications: "Notifications",
      enterNotification: "Enter notification message",
      send: "Send",
      clipboard: "Clipboard",
      enterToCopy: "Enter text to copy",
      copy: "Copy",
      paste: "Paste",
      windowControl: "Window Control",
      minimize: "Minimize",
      maximize: "Maximize",
      restore: "Restore",
      close: "Close",
      messageBox: "Message Box",
      alert: "Alert",
      confirm: "Confirm",
      prompt: "Prompt",
      openDirectory: "Open Directory",
      enterDirectoryPath: "Enter directory path",
      open: "Open",
      executeCommand: "Execute Command",
      enterCommand: "Enter command (e.g., ls -la)",
      execute: "Execute",
      runInApp: "Run in Neutralino desktop app for full functionality",
      githubDoc: "GitHub Documentation",
      githubDocDesc: "View complete documentation on GitHub",
      viewDoc: "View Docs"
    },
    api: {
      title: "Neutralino.js Native API",
      subtitle: "Complete API Reference with Copyable Code",
      practice: "Practice",
      systemInfo: "System Information",
      clipboard: "Clipboard",
      notifications: "Notifications",
      fileDialogs: "File Dialogs",
      commandExecution: "Command Execution",
      messageBox: "Message Box",
      output: "Output",
      clear: "Clear"
    },
    dataTable: {
      title: "Data Table",
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      name: "Name",
      email: "Email",
      role: "Role",
      status: "Status",
      createdAt: "Created At",
      actions: "Actions",
      searchPlaceholder: "Search by name, email or role",
      cancel: "Cancel",
      confirm: "Confirm",
      warning: "Warning",
      addSuccess: "Add successful",
      editSuccess: "Edit successful",
      deleteSuccess: "Delete successful",
      deleteConfirm: "Are you sure you want to delete this item?"
    },
    settings: {
      title: "Application Settings",
      language: "Language",
      save: "Save Settings",
      saved: "Settings saved"
    }
  },
  zh: {
    nav: {
      home: "首页",
      api: "API",
      dataTable: "数据表格",
      settings: "设置"
    },
    home: {
      welcome: "欢迎使用 OrionDesk",
      subtitle: "基于 Neutralino + Bun + Vue 的轻量级桌面应用模板",
      systemInfo: "系统信息",
      getSystemInfo: "获取系统信息",
      fileDialogs: "文件对话框",
      openFile: "打开文件",
      openFolder: "打开文件夹",
      saveFile: "保存文件",
      notifications: "通知",
      enterNotification: "输入通知消息",
      send: "发送",
      clipboard: "剪贴板",
      enterToCopy: "输入要复制的文本",
      copy: "复制",
      paste: "粘贴",
      windowControl: "窗口控制",
      minimize: "最小化",
      maximize: "最大化",
      restore: "还原",
      close: "关闭",
      messageBox: "消息框",
      alert: "警告",
      confirm: "确认",
      prompt: "提示",
      openDirectory: "打开目录",
      enterDirectoryPath: "输入目录路径",
      open: "打开",
      executeCommand: "执行命令",
      enterCommand: "输入命令（例如 ls -la）",
      execute: "执行",
      runInApp: "在 Neutralino 桌面应用中运行以获得完整功能",
      githubDoc: "GitHub 文档",
      githubDocDesc: "在 GitHub 上查看完整文档",
      viewDoc: "查看文档"
    },
    api: {
      title: "Neutralino.js 原生 API",
      subtitle: "完整的 API 参考及可复制代码",
      practice: "实践",
      systemInfo: "系统信息",
      clipboard: "剪贴板",
      notifications: "通知",
      fileDialogs: "文件对话框",
      commandExecution: "命令执行",
      messageBox: "消息框",
      output: "输出",
      clear: "清除"
    },
    dataTable: {
      title: "数据表格",
      add: "添加",
      edit: "编辑",
      delete: "删除",
      name: "姓名",
      email: "邮箱",
      role: "角色",
      status: "状态",
      createdAt: "创建时间",
      actions: "操作",
      searchPlaceholder: "搜索姓名、邮箱或角色",
      cancel: "取消",
      confirm: "确认",
      warning: "警告",
      addSuccess: "添加成功",
      editSuccess: "编辑成功",
      deleteSuccess: "删除成功",
      deleteConfirm: "确定要删除这条记录吗？"
    },
    settings: {
      title: "应用设置",
      language: "语言",
      save: "保存设置",
      saved: "设置已保存"
    }
  }
}

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
})

export default i18n
