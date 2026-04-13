<template>
  <div class="app-container" :class="{ 'sidebar-collapsed': isCollapsed }">
    <TitleBar v-if="showCustomTitleBar" />
    <el-container class="main-container">
      <el-aside width="220px" class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
        <div class="sidebar-header">
          <div class="logo" v-show="!isCollapsed">
            <el-icon class="logo-icon"><Grid /></el-icon>
            <h2>OrionDesk</h2>
          </div>
          <el-button
            class="collapse-btn"
            :icon="isCollapsed ? Expand : Fold"
            @click="toggleSidebar"
            circle
            text
          />
        </div>
        <el-menu
          mode="vertical"
          :default-active="currentRoute"
          class="sidebar-menu"
          @select="handleMenuSelect"
          :ellipsis="false"
          :collapse="isCollapsed"
          :collapse-transition="false"
        >
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <template #title>{{ t('nav.home') }}</template>
          </el-menu-item>
          <el-menu-item index="/doc">
            <el-icon><Document /></el-icon>
            <template #title>{{ t('nav.doc') }}</template>
          </el-menu-item>
          <el-menu-item index="/neutralino-demo">
            <el-icon><Cpu /></el-icon>
            <template #title>{{ t('nav.neutralino') }}</template>
          </el-menu-item>
          <el-menu-item index="/window-control">
            <el-icon><FullScreen /></el-icon>
            <template #title>{{ t('nav.windowControl') }}</template>
          </el-menu-item>
          <el-menu-item index="/settings">
            <el-icon><Setting /></el-icon>
            <template #title>{{ t('nav.settings') }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header" v-if="!showCustomTitleBar">
          <span class="header-title">{{ pageTitle }}</span>
        </el-header>
        <el-main class="main-content" :class="{ 'no-header': showCustomTitleBar }">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Fold, Expand, HomeFilled, Cpu, FullScreen, Setting, Grid, Document } from '@element-plus/icons-vue'
import TitleBar from '@/components/TitleBar.vue'
import { useSettingStore } from '@/stores'

const { t } = useI18n()
const router = useRouter()
const settingStore = useSettingStore()

const showCustomTitleBar = ref(false)
const isCollapsed = ref(false)

const currentRoute = computed(() => router.currentRoute.value.path)

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': t('nav.home'),
    '/doc': t('nav.doc'),
    '/neutralino-demo': t('nav.neutralino'),
    '/window-control': t('nav.windowControl'),
    '/settings': t('nav.settings')
  }
  return titles[currentRoute.value] || 'OrionDesk'
})

const handleMenuSelect = (index: string) => {
  router.push(index)
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

onMounted(async () => {
  await settingStore.fetchAll()
  showCustomTitleBar.value = settingStore.getValue<boolean>('app.window.customTitleBar', false)
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-container {
  height: 100%;
}

.sidebar {
  background: linear-gradient(180deg, var(--od-bg-sidebar) 0%, #0f172a 100%);
  color: white;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: width 0.3s ease;
}

.sidebar.is-collapsed {
  width: 64px !important;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.logo-icon {
  font-size: 20px;
  color: var(--od-primary);
  flex-shrink: 0;
}

.logo h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.collapse-btn {
  color: #94a3b8;
  flex-shrink: 0;
}

.collapse-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-menu {
  border-right: none;
  background: transparent;
  padding: 12px 0;
}

.sidebar-menu:not(.el-menu--collapse) {
  width: 220px;
}

.sidebar-menu ::v-deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  margin: 4px 12px;
  border-radius: 10px;
  color: #94a3b8;
  transition: all 0.2s ease;
}

.sidebar-menu:not(.el-menu--collapse) ::v-deep(.el-menu-item) {
  padding: 0 16px;
}

.sidebar-menu.el-menu--collapse ::v-deep(.el-menu-item) {
  padding: 0 !important;
  justify-content: center;
}

.sidebar-menu ::v-deep(.el-menu-item:hover) {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.sidebar-menu ::v-deep(.el-menu-item.is-active) {
  background: var(--od-primary);
  color: white;
  font-weight: 500;
}

.sidebar-menu ::v-deep(.el-menu-item .el-icon) {
  font-size: 18px;
}

.header {
  background: white;
  border-bottom: 1px solid var(--od-border);
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--od-text-primary);
}

.main-content {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 24px;
}

.main-content.no-header {
  padding-top: 16px;
}

.sidebar-collapsed .sidebar-header {
  justify-content: center;
  padding: 16px 8px;
}

.sidebar-collapsed .collapse-btn {
  margin: 0;
}
</style>
