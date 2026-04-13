import { createI18n } from "vue-i18n"

const messages = {
  en: {
    nav: {
      home: "Home",
      doc: "Documentation",
      neutralino: "Neutralino Demo",
      windowControl: "Window Control",
      settings: "Settings"
    },
    doc: {
      title: "Documentation",
      language: "Language",
      switchToZh: "中文",
      switchToEn: "English",
      features: "Features",
      feature1: "Lightweight & Efficient: Neutralino.js is 40x smaller than Electron with faster startup",
      feature2: "Easy to Customize: Clean modular architecture for rapid development",
      feature3: "Data Persistence: Built-in SQLite database, ready to use",
      feature4: "Modern Frontend: Vue 3 + TypeScript + Element Plus",
      feature5: "Internationalization: Built-in Vue I18n multi-language support",
      feature6: "Auto Update: Reserved auto-update architecture",
      techStack: "Tech Stack",
      architecture: "Architecture",
      gettingStarted: "Getting Started",
      installDeps: "Install Dependencies",
      installCmd: "Run in project root:",
      devRun: "Development",
      devCmd: "Starts both backend and frontend in development mode",
      buildApp: "Build Application",
      buildCmd: "Builds both backend and frontend for production"
    }
  },
  zh: {
    nav: {
      home: "首页",
      doc: "说明文档",
      neutralino: "Neutralino 演示",
      windowControl: "窗口控制",
      settings: "设置"
    },
    doc: {
      title: "说明文档",
      language: "语言",
      switchToZh: "中文",
      switchToEn: "English",
      features: "特性",
      feature1: "轻量高效：Neutralino.js 比 Electron 小 40 倍，启动速度更快",
      feature2: "易于定制：清晰的模块化架构，快速开发自定义功能",
      feature3: "数据持久化：内置 SQLite 数据库，开箱即用",
      feature4: "现代前端：Vue 3 + TypeScript + Element Plus",
      feature5: "国际化：内置 Vue I18n 多语言支持",
      feature6: "自动更新：预留自动更新架构",
      techStack: "技术栈",
      architecture: "架构图",
      gettingStarted: "快速开始",
      installDeps: "安装依赖",
      installCmd: "在项目根目录运行：",
      devRun: "开发模式",
      devCmd: "启动后端和前端开发模式",
      buildApp: "构建应用",
      buildCmd: "构建后端和前端用于生产"
    }
  }
}

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
})

export default i18n