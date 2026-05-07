<template>
  <div class="settings-view">
    <el-card class="settings-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-icon">⚙️</span>
          <span>{{ t('settings.title') }}</span>
        </div>
      </template>
      <el-form :model="settings" label-width="140px" class="settings-form">
        <el-form-item :label="t('settings.language')">
          <el-select v-model="settings.language" class="settings-select">
            <el-option label="English" value="en" />
            <el-option label="中文" value="zh" />
          </el-select>
        </el-form-item>
        <el-form-item label="Notifications">
          <el-button type="warning" @click="enableNotifications">
            <span class="btn-icon">🔔</span>
            Enable Notifications
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSettings">
            <span class="btn-icon">💾</span>
            {{ t('settings.save') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getNeutralino, ensureNeutralinoReady } from '@/utils/neutralino'

const { t, locale } = useI18n()

const settings = ref({
  language: locale.value
})

const saveSettings = () => {
  locale.value = settings.value.language
  ElMessage.success(t('settings.saved'))
}

const enableNotifications = async () => {
  const ready = await ensureNeutralinoReady()
  if (!ready) {
    ElMessage.warning('Please run this app in desktop mode')
    return
  }
  try {
    await getNeutralino().os.execCommand(
      'osascript -e \'display notification "OrionDesk needs notification permission" with title "OrionDesk"\'',
      { background: false }
    )
    setTimeout(() => {
      getNeutralino().os.open('x-apple.systempreferences:com.apple.preference.notifications')
    }, 500)
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}
</script>

<style scoped>
.settings-view {
  max-width: 600px;
}

.settings-card {
  border-radius: 16px;
  border: none;
}

.settings-card :deep(.el-card__header) {
  background: white;
  border-bottom: 1px solid var(--od-border);
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

.settings-form {
  padding: 10px 0;
}

.settings-select {
  width: 200px;
}

.btn-icon {
  margin-right: 6px;
}
</style>
