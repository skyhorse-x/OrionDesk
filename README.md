# OrionDesk

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Neutralino.js-4B8BBE)](https://neutralino.js.org/)
[![Frontend](https://img.shields.io/badge/frontend-Vue%203-4FC08D)](https://vuejs.org/)
[![Backend](https://img.shields.io/badge/backend-Bun%20%2B%20Hono-FF6B6B)](https://bun.sh/)

English | [中文](./README.zh.md)

> 🖥️ Modern Lightweight Cross-Platform Desktop Application Template - Built with Neutralino.js + Vue 3 + Bun

## ✨ Features

- **🚀 Lightweight & Fast**: Neutralino.js is 40x smaller than Electron, with faster startup
- **🔧 Easy to Customize**: Clean modular architecture for rapid feature development
- **💾 Data Persistence**: Built-in SQLite database, ready to use
- **🎨 Modern Frontend**: Vue 3 + TypeScript + Element Plus
- **🌐 Internationalization**: Built-in Vue I18n multi-language support
- **📦 Auto-Update**: Pre-architected for automatic updates

## 📚 Tech Stack

| Layer | Technology | Description |
|-------|------------|-------------|
| Desktop Shell | [Neutralino.js](https://neutralino.js.org/) | Lightweight cross-platform desktop framework |
| Frontend | Vue 3 + TypeScript | Composition API |
| Build Tool | Vite 7 | Fast development experience |
| State Management | Pinia | Official Vue 3 state management |
| Backend | Bun + Hono | High-performance JS runtime + Web framework |
| Database | SQLite | Zero-config embedded database |
| UI Components | Element Plus | Vue 3 component library |
| i18n | Vue I18n | Complete internationalization solution |

## 🗂️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     OrionDesk Desktop App                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Vue 3 Frontend                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────┐  │   │
│  │  │ Router  │  │ Pinia   │  │  Element Plus UI  │  │   │
│  │  └─────────┘  └─────────┘  └───────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                               │
│                            │ HTTP / WebSocket              │
│                            ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               Bun + Hono Backend Service             │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────┐  │   │
│  │  │ Routes  │  │Services │  │   SQLite DB       │  │   │
│  │  └─────────┘  └─────────┘  └───────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                               │
│                            │ IPC                           │
│                            ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Neutralino.js Native Bridge             │   │
│  │  (Window / Filesystem / Clipboard / Notifications)   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Requirements

- **Bun** >= 1.0
- **Node.js** >= 18 (for installing Neutralino CLI)
- **Neutralino CLI**: `npm install -g @neutralinojs/neu`

### Installation

```bash
# 1. Install Neutralino CLI (global, first time only)
npm install -g @neutralinojs/neu

# 2. Clone the repository
git clone https://github.com/your-username/OrionDesk.git
cd OrionDesk

# 3. Install dependencies
bun install

# 4. Start development mode
neu run
```

### Development Commands

| Command | Description |
|---------|-------------|
| `neu run` | Start desktop app in development mode |
| `neu build` | Build desktop app installer |

## 📁 Project Structure

```
OrionDesk/
├── frontend/                    # Vue 3 Frontend
│   └── src/
│       ├── api/                 # API clients (domain-split)
│       │   ├── health.ts        # Health check API
│       │   ├── system.ts        # System info API
│       │   ├── locations.ts     # Location management API
│       │   └── settings.ts      # Settings management API
│       ├── utils/               # Utilities
│       │   └── request.ts       # Axios request wrapper
│       ├── components/          # Reusable components
│       │   ├── TitleBar.vue     # Custom title bar
│       │   └── ApiDemo.vue      # API demo component
│       ├── stores/              # Pinia stores
│       │   ├── index.ts         # Store exports
│       │   ├── location.store.ts# Location management
│       │   ├── setting.store.ts # Settings management
│       │   └── update.store.ts  # Update checker
│       ├── views/               # Page components
│       │   ├── HomeView.vue     # Home page (with demo)
│       │   ├── ApiDemoView.vue  # API demo page
│       │   ├── DataTableView.vue # Data table page
│       │   └── SettingsView.vue # Settings page
│       ├── router/              # Router config
│       ├── i18n/                # i18n config
│       ├── App.vue              # Root component
│       └── main.ts              # Entry file
│
├── server/                      # Bun + Hono Backend
│   ├── main.ts                  # Backend entry
│   ├── core/
│   │   ├── bootstrap.ts         # Bootstrap
│   │   └── server.ts            # Hono server
│   ├── routes/                  # API routes
│   │   ├── health.routes.ts     # Health check
│   │   ├── system.routes.ts     # System info
│   │   ├── locations.routes.ts  # Location management
│   │   └── settings.routes.ts   # Settings management
│   ├── services/                # Business services
│   │   ├── logger.service.ts    # Logging
│   │   ├── database.service.ts  # Database
│   │   ├── migration.service.ts # Migrations
│   │   ├── location.service.ts  # Location CRUD
│   │   └── setting.service.ts   # Settings CRUD
│   └── shared/                  # Shared types & utilities
│       └── types/
│           └── api.types.ts     # API type definitions
│
├── resources/                   # Neutralino resources
├── data/                        # SQLite data storage
├── neutralino.config.json       # Neutralino config
└── package.json                 # Project config
```

## 🎨 Customization

### 1. Change App Name

```typescript
// frontend/src/App.vue
<h2>Your App Name</h2>

// neutralino.config.json
{
  "appname": "Your App Name"
}
```

### 2. Add New Page

**Step 1**: Create view component `frontend/src/views/MyPage.vue`

```vue
<template>
  <div class="my-page">
    <h1>My Custom Page</h1>
  </div>
</template>

<script setup lang="ts">
// Business logic
</script>
```

**Step 2**: Register route `frontend/src/router/index.ts`

```typescript
{
  path: "/my-page",
  name: "MyPage",
  component: () => import("@/views/MyPage.vue")
}
```

### 3. Add New API

**Step 1**: Create service `server/services/my.service.ts`

```typescript
import { db } from './database.service'

export function getMyData() {
  return db.prepare('SELECT * FROM my_table').all()
}
```

**Step 2**: Create route `server/routes/my.routes.ts`

```typescript
import { Hono } from 'hono'
import { getMyData } from '../services/my.service'

export const myRoutes = new Hono()

myRoutes.get('/data', (c) => {
  const data = getMyData()
  return c.json(data)
})
```

**Step 3**: Register route `server/core/server.ts`

```typescript
import { myRoutes } from '../routes/my.routes'

app.route('/api/my', myRoutes)
```

**Step 4**: Create frontend API module `frontend/src/api/my.ts`

```typescript
import { get } from '@/utils/request'

export const myApi = {
  getData: () => get('/api/my/data'),
}
```

### 4. Add New Store

Create `frontend/src/stores/my.store.ts`

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('my', () => {
  const data = ref<any[]>([])

  async function fetchData() {
    // Call API
  }

  return { data, fetchData }
})
```

## 🔌 Neutralino API

Built-in Neutralino.js API support:

```typescript
// Window control
await Neutralino.window.minimize()
await Neutralino.window.maximize()
await Neutralino.window.restore()

// File dialogs
const file = await Neutralino.os.showOpenDialog('Select file')
const folder = await Neutralino.os.showFolderDialog('Select folder')

// Notifications
await Neutralino.os.showNotification('Title', 'Content')

// Clipboard
await Neutralino.clipboard.writeText('Text')
const text = await Neutralino.clipboard.readText()

// System info
const osInfo = await Neutralino.computer.getOSInfo()
const memory = await Neutralino.computer.getMemoryInfo()

// App control
await Neutralino.app.exit()
```

See `frontend/src/views/NeutralinoDemo.vue` for the complete demo.

## 🌐 API Documentation

### System

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/system/info` | Get system info |
| POST | `/api/system/open-directory` | Open directory |

### Location Management

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/locations` | Get all locations |
| GET | `/api/locations/:id` | Get location by ID |
| POST | `/api/locations` | Create location |
| PUT | `/api/locations/:id` | Update location |
| DELETE | `/api/locations/:id` | Delete location |

### Settings Management

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/settings` | Get all settings |
| GET | `/api/settings/:key` | Get setting by key |
| PUT | `/api/settings/:key` | Update setting |

### Default Settings

| Key | Default | Description |
|-----|---------|-------------|
| `app.theme` | `light` | Theme |
| `app.language` | `zh-CN` | Language |
| `app.window.customTitleBar` | `false` | Custom title bar |
| `locations.showHidden` | `false` | Show hidden files |

## 🔧 Environment Configuration

Backend configuration is managed via `server/.env`:

```env
PORT=17870
HOST=127.0.0.1
NODE_ENV=development
```

> The database file is stored in the `data/` directory at the project root.

## 📦 Build & Release

```bash
# Build desktop app installer
neu build

# Output in dist/
```

Supported platforms:
- Windows (x64)
- macOS (x64, ARM64)
- Linux (x64, ARM64)

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## 📄 License

This project is licensed under [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Neutralino.js](https://neutralino.js.org/) - Lightweight desktop app framework
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Bun](https://bun.sh/) - JavaScript runtime and toolkit
- [Element Plus](https://element-plus.org/) - Vue 3 component library
- [Hono](https://hono.dev/) - Lightweight web framework
