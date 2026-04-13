<template>
  <div class="doc-view">
    <div class="language-switch">
      <el-button @click="switchLanguage" type="primary" plain>
        {{ isEnglish ? '中文' : 'English' }}
      </el-button>
    </div>

    <el-card class="doc-card">
      <template #header>
        <div class="card-header">
          <span>{{ t('doc.title') }}</span>
        </div>
      </template>

      <el-tabs v-model="activeTab" class="doc-tabs">
        <el-tab-pane :label="t('doc.features')" name="features">
          <div class="feature-list">
            <p><el-icon><Check /></el-icon> {{ t('doc.feature1') }}</p>
            <p><el-icon><Check /></el-icon> {{ t('doc.feature2') }}</p>
            <p><el-icon><Check /></el-icon> {{ t('doc.feature3') }}</p>
            <p><el-icon><Check /></el-icon> {{ t('doc.feature4') }}</p>
            <p><el-icon><Check /></el-icon> {{ t('doc.feature5') }}</p>
            <p><el-icon><Check /></el-icon> {{ t('doc.feature6') }}</p>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="t('doc.techStack')" name="tech">
          <el-table :data="techStackData" stripe>
            <el-table-column prop="layer" :label="isEnglish ? 'Layer' : '层级'" />
            <el-table-column prop="tech" label="Technology" />
            <el-table-column prop="desc" :label="isEnglish ? 'Description' : '说明'" />
          </el-table>
        </el-tab-pane>

        <el-tab-pane :label="t('doc.architecture')" name="arch">
          <div class="architecture-diagram">
            <pre class="arch-pre">{{ isEnglish ? archEn : archZh }}</pre>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="t('doc.gettingStarted')" name="start">
          <div class="start-section">
            <h4>{{ t('doc.installDeps') }}</h4>
            <el-code>bun install</el-code>
            <h4>{{ t('doc.devRun') }}</h4>
            <p>{{ t('doc.devCmd') }}</p>
            <el-code>neu run</el-code>
            <h4>{{ t('doc.buildApp') }}</h4>
            <p>{{ t('doc.buildCmd') }}</p>
            <el-code>bun run build</el-code>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check } from '@element-plus/icons-vue'

const { t, locale } = useI18n()

const activeTab = ref('features')

const isEnglish = computed(() => locale.value === 'en')

const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}

const techStackData = computed(() => isEnglish.value ? [
  { layer: 'Desktop Shell', tech: 'Neutralino.js', desc: 'Lightweight cross-platform desktop framework' },
  { layer: 'Frontend', tech: 'Vue 3 + TypeScript', desc: 'Composition API' },
  { layer: 'Build Tool', tech: 'Vite 7', desc: 'Fast development experience' },
  { layer: 'State', tech: 'Pinia', desc: 'Vue 3 recommended state management' },
  { layer: 'Backend', tech: 'Bun + Hono', desc: 'High-performance JS runtime + Web framework' },
  { layer: 'Database', tech: 'SQLite', desc: 'Zero-config embedded database' },
  { layer: 'UI', tech: 'Element Plus', desc: 'Vue 3 component library' },
  { layer: 'i18n', tech: 'Vue I18n', desc: 'Complete internationalization solution' }
] : [
  { layer: '桌面壳', tech: 'Neutralino.js', desc: '轻量级跨平台桌面应用框架' },
  { layer: '前端框架', tech: 'Vue 3 + TypeScript', desc: '组合式 API' },
  { layer: '构建工具', tech: 'Vite 7', desc: '快速开发体验' },
  { layer: '状态管理', tech: 'Pinia', desc: 'Vue 3 官方推荐状态管理' },
  { layer: '后端框架', tech: 'Bun + Hono', desc: '高性能 JavaScript 运行时 + Web 框架' },
  { layer: '数据库', tech: 'SQLite', desc: '零配置嵌入式数据库' },
  { layer: 'UI 组件', tech: 'Element Plus', desc: 'Vue 3 组件库' },
  { layer: '国际化', tech: 'Vue I18n', desc: '完整的国际化解决方案' }
])

const archEn = `┌─────────────────────────────────────────────────────────────┐
│                     OrionDesk Desktop App                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Vue 3 Frontend                         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────────┐   │   │
│  │  │ Router  │  │ Pinia   │  │   Element Plus UI    │   │   │
│  │  └─────────┘  └─────────┘  └───────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                    │
│                            │ HTTP / WebSocket                   │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Bun + Hono Backend                         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────────┐   │   │
│  │  │ Routes  │  │Services │  │      SQLite DB       │   │   │
│  │  └─────────┘  └─────────┘  └───────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Neutralino.js Native API                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘`

const archZh = `┌─────────────────────────────────────────────────────────────┐
│                     OrionDesk 桌面应用                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      Vue 3 前端                             │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────────┐      │   │
│  │  │ Router  │  │ Pinia   │  │   Element Plus UI   │      │   │
│  │  └─────────┘  └─────────┘  └───────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                            │                                      │
│                            │ HTTP / WebSocket                     │
│                            ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Bun + Hono 后端                          │   │
│  │  ┌─────────┐  ┌─────────┐  ┌───────────────────────┐      │   │
│  │  │ Routes  │  │Services │  │      SQLite DB        │      │   │
│  │  └─────────┘  └─────────┘  └───────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  Neutralino.js Native API                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘`
</script>

<style scoped>
.doc-view {
  padding: 20px;
}

.language-switch {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.doc-card {
  max-width: 900px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
}

.feature-list p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  font-size: 14px;
}

.arch-pre {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}

.start-section h4 {
  margin-top: 16px;
  margin-bottom: 8px;
}

.start-section p {
  margin: 8px 0;
  color: #666;
}

.start-section .el-code {
  background: #f5f7fa;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: monospace;
  margin: 4px 0 12px;
  display: block;
}
</style>
