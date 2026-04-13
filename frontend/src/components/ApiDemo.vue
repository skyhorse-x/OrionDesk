<template>
  <div class="api-demo-item">
    <div class="demo-header">
      <h4>{{ title }}</h4>
      <el-button size="small" @click="copyCode">
        <el-icon><CopyDocument /></el-icon>
        Copy
      </el-button>
    </div>
    <p class="demo-desc">{{ description }}</p>
    <div class="code-block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div class="demo-actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'

defineProps<{
  title: string
  description: string
  code: string
}>()

const copyCode = async () => {
  try {
    const codeEl = document.querySelector('.api-demo-item .code-block code')
    if (codeEl) {
      await navigator.clipboard.writeText(codeEl.textContent || '')
      ElMessage.success('Code copied!')
    }
  } catch {
    ElMessage.error('Failed to copy')
  }
}
</script>

<style scoped>
.api-demo-item {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 15px;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.demo-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  font-family: 'Fira Code', monospace;
}

.demo-desc {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #909399;
}

.code-block {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #0f0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  white-space: pre;
}

.demo-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
