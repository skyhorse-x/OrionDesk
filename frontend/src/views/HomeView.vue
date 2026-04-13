<template>
  <div class="home-view">
    <el-card class="welcome-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="card-icon"><MagicStick /></el-icon>
          <span>Welcome to OrionDesk</span>
        </div>
      </template>
      <p class="welcome-text">Neutralino + Bun + Vue lightweight desktop template</p>
    </el-card>

    <div class="demo-grid">
      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><FolderOpened /></el-icon>
            <span>Open Directory</span>
          </div>
        </template>
        <div class="demo-content">
          <el-input
            v-model="directoryPath"
            placeholder="Enter directory path"
            class="path-input"
          />
          <el-button type="primary" @click="openDirectory" :loading="loading">
            <el-icon><FolderOpened /></el-icon>
            Open Directory
          </el-button>
          <p v-if="message" :class="messageClass">{{ message }}</p>
        </div>
      </el-card>

      <el-card class="demo-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon class="card-icon"><Bell /></el-icon>
            <span>Send Notification</span>
          </div>
        </template>
        <div class="demo-content">
          <el-input
            v-model="notificationMessage"
            placeholder="Enter notification message"
            class="path-input"
          />
          <el-button type="warning" @click="sendNotification" :loading="notificationLoading">
            <el-icon><Bell /></el-icon>
            Send Notification
          </el-button>
          <p v-if="notificationMessageResult" :class="messageClass">{{ notificationMessageResult }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MagicStick, FolderOpened, Bell } from '@element-plus/icons-vue'
import { systemApi } from '@/api/system'

const directoryPath = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const notificationMessage = ref('')
const notificationLoading = ref(false)
const notificationMessageResult = ref('')

const messageClass = computed(() => ({
  'success-message': messageType.value === 'success',
  'error-message': messageType.value === 'error'
}))

const openDirectory = async () => {
  if (!directoryPath.value.trim()) {
    message.value = 'Please enter a directory path'
    messageType.value = 'error'
    return
  }

  loading.value = true
  message.value = ''

  try {
    const response = await systemApi.openDirectory(directoryPath.value)
    message.value = response.data.message
    messageType.value = 'success'
  } catch (error: any) {
    message.value = error.response?.data?.error || 'Failed to open directory'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const sendNotification = async () => {
  if (!notificationMessage.value.trim()) {
    notificationMessageResult.value = 'Please enter a notification message'
    messageType.value = 'error'
    return
  }

  notificationLoading.value = true
  notificationMessageResult.value = ''

  try {
    const response = await systemApi.sendNotification('OrionDesk', notificationMessage.value)
    notificationMessageResult.value = response.data.message || 'Notification sent successfully!'
    messageType.value = 'success'
  } catch (error: any) {
    notificationMessageResult.value = error.response?.data?.error || 'Failed to send notification'
    messageType.value = 'error'
  } finally {
    notificationLoading.value = false
  }
}
</script>

<style scoped>
.home-view {
  max-width: 900px;
}

.welcome-card {
  margin-bottom: 24px;
  border-radius: 16px;
  border: none;
}

.welcome-card :deep(.el-card__header) {
  background: linear-gradient(135deg, var(--od-primary) 0%, #818cf8 100%);
  color: white;
  border-radius: 16px 16px 0 0;
  padding: 16px 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 15px;
}

.card-icon {
  font-size: 18px;
}

.welcome-text {
  color: var(--od-text-secondary);
  font-size: 14px;
  margin: 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 20px;
}

.demo-card {
  border-radius: 16px;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
}

.demo-card :deep(.el-card__header) {
  background: white;
  border-bottom: 1px solid var(--od-border);
  padding: 16px 20px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.path-input {
  width: 100%;
}

.success-message {
  color: #10b981;
  font-size: 13px;
  margin: 0;
}

.error-message {
  color: #ef4444;
  font-size: 13px;
  margin: 0;
}
</style>
