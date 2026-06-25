<template>
  <el-dialog
      v-model="visible"
      title="常见化疗方案"
      width="800px"
      :close-on-click-modal="true"
      @close="handleClose"
  >
    <div class="regimens-container">
      <!-- 标签切换 -->
      <el-tabs v-model="activeTab" class="regimen-tabs" v-if="regimens.length > 0">
        <el-tab-pane
            v-for="(regimen, index) in regimens"
            :key="index"
            :label="regimen.name"
            :name="String(index)"
        >
          <div class="regimen-card">
            <div class="regimen-body">
              <div class="regimen-grid">
                <div class="grid-item">
                  <span class="grid-label">名称：</span>
                  <span class="grid-value">{{ regimen.name || '' }}</span>
                </div>
                <div class="grid-item">
                  <span class="grid-label">应用：</span>
                  <span class="grid-value">{{ regimen.indication || '' }}</span>
                </div>

                <div class="grid-item">
                  <span class="grid-label">化疗药物：</span>
                  <span class="grid-value">{{ regimen.drugs || '' }}</span>
                </div>

                <!-- 预处理 -->
                <div v-if="regimen.pretreatment" class="grid-item pretreatment-item">
                  <span class="grid-label pretreatment-label">预处理：</span>
                  <div class="pretreatment-group">
                    <div
                        v-for="(value, category) in regimen.pretreatment"
                        :key="category"
                        class="pretreatment-category"
                    >
                      <span class="category-label">{{ category }}：</span>
                      <span class="category-content" v-html="value"></span>
                    </div>
                  </div>
                </div>

                <div class="grid-item">
                  <span class="grid-label">用药顺序：</span>
                  <span class="grid-value">
                    {{ regimen.usage || '' }}
                    <span v-if="regimen.usageReason" class="regimen-reason">（{{ regimen.usageReason }}）</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  regimens: {
    type: Array,
    default: () => []
  }
})

const visible = ref(false)
const activeTab = ref('0')

const open = () => {
  visible.value = true
  activeTab.value = '0'
}

const handleClose = () => {
  visible.value = false
}

defineExpose({
  open
})
</script>

<style scoped>
.regimens-container {
  max-height: 60vh;
  overflow-y: auto;
  padding: 4px;
}

.regimen-tabs {
  margin-top: 0;
}

.regimen-tabs :deep(.el-tabs__header) {
  margin-bottom: 16px;
}

.regimen-tabs :deep(.el-tabs__item) {
  font-size: 14px;
  font-weight: 500;
}

.regimen-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px 20px;
  border-left: 4px solid #409eff;
}

.regimen-body {
  font-size: 14px;
  line-height: 1.8;
}

.regimen-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.grid-item {
  display: flex;
  align-items: flex-start;
}

.grid-label {
  font-weight: 600;
  color: #409eff;
  width: 95px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 16px;
  line-height: 1.8;
}

.grid-value {
  color: #606266;
  line-height: 1.8;
}

.regimen-reason {
  color: #909399;
  font-size: 13px;
}

.pretreatment-item {
  align-items: flex-start;
}

.pretreatment-label {
  padding-top: 0;
}

.pretreatment-group {
  flex: 1;
}

.pretreatment-category {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2px;
  width: 100%;
}

.pretreatment-category:last-child {
  margin-bottom: 0;
}

.category-label {
  font-weight: 500;
  color: #e6a23c;
  flex-shrink: 0;
  white-space: nowrap;
  line-height: 1.8;
  width: 145px;
  text-align: right;
  padding-right: 12px;
}

.category-content {
  color: #606266;
  line-height: 1.8;
  word-break: break-word;
  flex: 1;
}
</style>

<style>
/* 全局样式 - 供 v-html 渲染的内容使用 */
.reason-text {
  color: #909399 !important;
  font-size: 13px !important;
}
</style>