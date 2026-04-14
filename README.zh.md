# OrionDesk

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Neutralino.js-4B8BBE)](https://neutralino.js.org/)
[![Frontend](https://img.shields.io/badge/frontend-Vue%203-4FC08D)](https://vuejs.org/)
[![Backend](https://img.shields.io/badge/backend-Bun%20%2B%20Hono-FF6B6B)](https://bun.sh/)

[English](./README.md) | 中文

> 🖥️ 现代化轻量级跨平台桌面应用模板 - 基于 Neutralino.js + Vue 3 + Bun

## ✨ 特性

- **🚀 轻量高效**：Neutralino.js 比 Electron 小 40 倍，启动速度快
- **🔧 易于定制**：清晰的模块化架构，快速开发自定义功能
- **💾 数据持久化**：内置 SQLite 数据库，开箱即用
- **🎨 现代前端**：Vue 3 + TypeScript + Element Plus
- **🌐 国际化**：内置 Vue I18n 多语言支持
- **📦 自动更新**：预留自动更新架构

## 📚 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 桌面壳 | [Neutralino.js](https://neutralino.js.org/) | 轻量级跨平台桌面应用框架 |
| 前端框架 | Vue 3 + TypeScript | 组合式 API (Composition API) |
| 构建工具 | Vite 7 | 快速开发体验 |
| 状态管理 | Pinia | Vue 3 官方推荐状态管理 |
| 后端框架 | Bun + Hono | 高性能 JavaScript 运行时 + Web 框架 |
| 数据库 | SQLite | 零配置嵌入式数据库 |
| UI 组件 | Element Plus | Vue 3 组件库 |
| 国际化 | Vue I18n | 完整的国际化解决方案 |

## 🗂️ 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     OrionDesk 桌面应用                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Vue 3 前端                         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────┐  │   │
│  │  │ Router  │  │ Pinia   │  │  Element Plus UI  │  │   │
│  │  └─────────┘  └─────────┘  └───────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                               │
│                            │ HTTP / WebSocket              │
│                            ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               Bun + Hono 后端服务                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────┐  │   │
│  │  │ Routes  │  │Services │  │   SQLite DB       │  │   │
│  │  └─────────┘  └─────────┘  └───────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                               │
│                            │ IPC                           │
│                            ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Neutralino.js 原生桥接                   │   │
│  │   (窗口控制 / 文件系统 / 剪贴板 / 系统通知 / 硬件信息)  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 快速开始

### 环境要求

- **Bun** >= 1.0 (推荐)
- **Node.js** >= 18 (备用)
- **Neutralino CLI** (自动安装)

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/skyhorse-x/OrionDesk.git
cd OrionDesk

# 2. 安装依赖
bun install

# 3. 启动开发模式
neu run
```

### 开发命令

| 命令 | 说明 |
|------|------|
| `neu run` | 启动桌面应用开发模式（前后端自动启动） |
| `neu build` | 构建桌面应用安装包 |

## 📁 项目结构

```
OrionDesk/
├── frontend/                    # Vue 3 前端应用
│   └── src/
│       ├── api/                 # API 客户端封装
│       │   └── client.ts        # Axios 统一调用层
│       ├── components/          # 可复用组件
│       │   └── TitleBar.vue      # 自定义标题栏
│       ├── stores/               # Pinia 状态管理
│       │   ├── index.ts          # Store 导出
│       │   ├── location.store.ts # 位置管理
│       │   ├── setting.store.ts  # 设置管理
│       │   └── update.store.ts   # 更新检查
│       ├── views/                # 页面组件
│       │   ├── HomeView.vue      # 首页（包含演示）
│       │   ├── ApiDemoView.vue    # API 演示
│       │   ├── DataTableView.vue  # 数据表格页面
│       │   └── SettingsView.vue   # 设置页
│       ├── router/               # 路由配置
│       ├── i18n/                 # 国际化配置
│       ├── App.vue               # 根组件
│       └── main.ts               # 入口文件
│
├── server/                      # Bun + Hono 后端
│   ├── core/
│   │   ├── bootstrap.ts         # 启动引导
│   │   └── server.ts            # Hono 服务器
│   ├── routes/                  # API 路由
│   │   ├── health.routes.ts     # 健康检查
│   │   ├── system.routes.ts     # 系统信息
│   │   ├── locations.routes.ts  # 位置管理
│   │   └── settings.routes.ts   # 设置管理
│   └── services/                # 业务服务
│       ├── logger.service.ts    # 日志服务
│       ├── database.service.ts  # 数据库服务
│       ├── migration.service.ts # 数据迁移
│       ├── location.service.ts  # 位置 CRUD
│       └── setting.service.ts   # 设置 CRUD
│
├── resources/                   # Neutralino 资源目录
├── data/                       # SQLite 数据存储
├── neutralino.config.json       # Neutralino 配置
└── package.json                 # 项目配置
```

## 🎨 自定义开发

### 1. 修改应用名称

```typescript
// frontend/src/App.vue
<h2>你的应用名称</h2>

// neutralino.config.json
{
  "appname": "你的应用名称"
}
```

### 2. 添加新页面

**步骤 1**：创建视图组件 `frontend/src/views/MyPage.vue`

```vue
<template>
  <div class="my-page">
    <h1>我的自定义页面</h1>
  </div>
</template>

<script setup lang="ts">
// 业务逻辑
</script>
```

**步骤 2**：注册路由 `frontend/src/router/index.ts`

```typescript
{
  path: "/my-page",
  name: "MyPage",
  component: () => import("@/views/MyPage.vue")
}
```

### 3. 添加新 API

**步骤 1**：创建服务 `server/services/my.service.ts`

```typescript
import { db } from './database.service'

export function getMyData() {
  return db.prepare('SELECT * FROM my_table').all()
}
```

**步骤 2**：创建路由 `server/routes/my.routes.ts`

```typescript
import { Hono } from 'hono'
import { getMyData } from '../services/my.service'

export const myRoutes = new Hono()

myRoutes.get('/data', (c) => {
  const data = getMyData()
  return c.json(data)
})
```

**步骤 3**：注册路由 `server/core/server.ts`

```typescript
import { myRoutes } from '../routes/my.routes'

app.route('/api/my', myRoutes)
```

### 4. 添加新 Store

创建 `frontend/src/stores/my.store.ts`

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('my', () => {
  const data = ref<any[]>([])

  async function fetchData() {
    // 调用 API
  }

  return { data, fetchData }
})
```

## 🔌 Neutralino API 使用

项目内置 Neutralino.js API 支持：

```typescript
// 窗口控制
await Neutralino.window.minimize()
await Neutralino.window.maximize()
await Neutralino.window.restore()

// 文件对话框
const file = await Neutralino.os.showOpenDialog('选择文件')
const folder = await Neutralino.os.showFolderDialog('选择文件夹')

// 系统通知
await Neutralino.os.showNotification('标题', '内容')

// 剪贴板
await Neutralino.clipboard.writeText('文本')
const text = await Neutralino.clipboard.readText()

// 系统信息
const osInfo = await Neutralino.computer.getOSInfo()
const memory = await Neutralino.computer.getMemoryInfo()

// 应用控制
await Neutralino.app.exit()
```

详见 `frontend/src/views/NeutralinoDemo.vue` 完整演示。

## 🌐 API 文档

### 系统接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/system/info` | 获取系统信息 |
| POST | `/api/system/open-directory` | 打开目录 |

### 位置管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/locations` | 获取所有位置 |
| GET | `/api/locations/:id` | 获取单个位置 |
| POST | `/api/locations` | 创建位置 |
| PUT | `/api/locations/:id` | 更新位置 |
| DELETE | `/api/locations/:id` | 删除位置 |

### 设置管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/settings` | 获取所有设置 |
| GET | `/api/settings/:key` | 获取指定设置 |
| PUT | `/api/settings/:key` | 更新设置 |

### 默认设置

| Key | 默认值 | 说明 |
|-----|--------|------|
| `app.theme` | `light` | 主题 |
| `app.language` | `zh-CN` | 语言 |
| `app.window.customTitleBar` | `false` | 自定义标题栏 |
| `locations.showHidden` | `false` | 显示隐藏文件 |

## 🔧 环境配置

创建 `server/.env` 文件：

```env
PORT=17870
HOST=127.0.0.1
NODE_ENV=development
DB_PATH=./data/data.db
```

## 📦 构建发布

```bash
# 构建桌面应用安装包
neu build

# 构建产物位于 dist/ 目录
```

支持的平台：
- Windows (x64)
- macOS (x64, ARM64)
- Linux (x64, ARM64)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

- [Neutralino.js](https://neutralino.js.org/) - 轻量级桌面应用框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Bun](https://bun.sh/) - JavaScript 运行时和工具链
- [Element Plus](https://element-plus.org/) - Vue 3 UI 组件库
- [Hono](https://hono.dev/) - 轻量级 Web 框架
