<template>
  <div class="data-table-view">
    <el-card class="table-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ t('dataTable.title') }}</span>
          <el-button type="primary" @click="openAddDialog">
            <el-icon><Plus /></el-icon>
            {{ t('dataTable.add') }}
          </el-button>
        </div>
      </template>

      <div class="table-toolbar">
        <el-input
          v-model="searchText"
          :placeholder="t('dataTable.searchPlaceholder')"
          style="width: 300px"
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" :label="t('dataTable.name')" min-width="120" />
        <el-table-column prop="email" :label="t('dataTable.email')" min-width="180" />
        <el-table-column prop="role" :label="t('dataTable.role')" width="120">
          <template #default="{ row }">
            <el-tag :type="getRoleTagType(row.role)">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="t('dataTable.status')" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Active' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" :label="t('dataTable.createdAt')" width="120" />
        <el-table-column :label="t('dataTable.actions')" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="openEditDialog(row)">
              <el-icon><Edit /></el-icon>
              {{ t('dataTable.edit') }}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row.id)">
              <el-icon><Delete /></el-icon>
              {{ t('dataTable.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? t('dataTable.edit') : t('dataTable.add')"
      width="500px"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item :label="t('dataTable.name')" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item :label="t('dataTable.email')" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item :label="t('dataTable.role')" prop="role">
          <el-select v-model="formData.role" style="width: 100%">
            <el-option label="Admin" value="Admin" />
            <el-option label="Editor" value="Editor" />
            <el-option label="Viewer" value="Viewer" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('dataTable.status')" prop="status">
          <el-select v-model="formData.status" style="width: 100%">
            <el-option label="Active" value="Active" />
            <el-option label="Inactive" value="Inactive" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ t('dataTable.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ t('dataTable.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { mockApi, type User } from '@/api/mock'

const { t } = useI18n()

const tableData = ref<User[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchText = ref('')

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref()
const formData = reactive({
  id: 0,
  name: '',
  email: '',
  role: 'Viewer',
  status: 'Active'
})

const formRules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: 'blur' }
  ],
  role: [{ required: true, message: 'Role is required', trigger: 'change' }],
  status: [{ required: true, message: 'Status is required', trigger: 'change' }]
}

const getRoleTagType = (role: string) => {
  const types: Record<string, any> = {
    Admin: 'danger',
    Editor: 'warning',
    Viewer: ''
  }
  return types[role] || ''
}

const fetchData = () => {
  loading.value = true
  const result = mockApi.getUsers(currentPage.value, pageSize.value, searchText.value)
  tableData.value = result.data
  total.value = result.total
  loading.value = false
}

const handleSearch = () => {
  currentPage.value = 1
  fetchData()
}

const handlePageChange = () => {
  fetchData()
}

const handleSizeChange = () => {
  currentPage.value = 1
  fetchData()
}

const resetForm = () => {
  formData.id = 0
  formData.name = ''
  formData.email = ''
  formData.role = 'Viewer'
  formData.status = 'Active'
}

const openAddDialog = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const openEditDialog = (row: User) => {
  isEdit.value = true
  formData.id = row.id
  formData.name = row.name
  formData.email = row.email
  formData.role = row.role
  formData.status = row.status
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        mockApi.updateUser(formData.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status
        })
        ElMessage.success(t('dataTable.editSuccess'))
      } else {
        mockApi.createUser({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status
        })
        ElMessage.success(t('dataTable.addSuccess'))
      }
      dialogVisible.value = false
      fetchData()
    }
  })
}

const handleDelete = (id: number) => {
  ElMessageBox.confirm(
    t('dataTable.deleteConfirm'),
    t('dataTable.warning'),
    {
      confirmButtonText: t('dataTable.confirm'),
      cancelButtonText: t('dataTable.cancel'),
      type: 'warning'
    }
  ).then(() => {
    mockApi.deleteUser(id)
    ElMessage.success(t('dataTable.deleteSuccess'))
    fetchData()
  }).catch(() => {})
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.data-table-view {
  max-width: 1200px;
}

.table-card {
  border-radius: 16px;
  border: none;
}

.table-card :deep(.el-card__header) {
  background: white;
  border-bottom: 1px solid var(--od-border);
  padding: 16px 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
}

.table-toolbar {
  margin-bottom: 16px;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
