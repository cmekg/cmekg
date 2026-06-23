<template>
  <div class="detail-panel">
    <div v-if="currentContent" class="detail-content">
      <div class="detail-header">
        <h3>{{ currentTitle }}</h3>
        <div class="detail-header-actions">
          <el-button type="text" class="close-btn" @click="clearContent">✕</el-button>
        </div>
      </div>

      <!-- 详情内容 - 可滚动区域 -->
      <div class="detail-scroll">
        <div class="detail-item">
          <!-- 普通静态文本 -->
          <div v-if="currentContent.type === 'static'" class="detail-value">
            {{ currentContent.value }}
          </div>

          <!-- 药物详情 -->
          <div v-else-if="currentContent.type === 'drugDetail'" class="drug-detail">
            <div v-for="(value, key) in currentContent.detail" :key="key" class="detail-row">
              <div class="detail-label">{{ key }}</div>
              <div class="detail-value" v-html="formatDetailValue(value)"></div>
            </div>
          </div>
        </div>

        <!-- 底部按钮 - 固定在底部 -->
        <div v-if="currentRegimens && currentRegimens.length > 0" class="detail-footer">
          <el-button
              type="primary"
              plain
              size="default"
              @click="openRegimensDialog"
              style="width: 100%"
          >
            📋 常见化疗方案（{{ currentRegimens.length }}个）：点击查看
          </el-button>
        </div>
      </div>
    </div>

    <div v-else class="empty-detail">
      <el-empty description="请从左侧菜单选择查看内容" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getMenuContentByKey, findMenuTitleByKey, leftMenuConfig } from '@/data/mockData'

const props = defineProps({
  menuKey: { type: String, default: null }
})
const emit = defineEmits(['clear', 'open-regimens'])

const currentContent = ref(null)
const currentTitle = ref('')
const currentRegimens = ref([])

// 递归查找 regimen
const findRegimens = (items, key) => {
  for (const item of items) {
    if (item.key === key) {
      return item.regimen || []
    }
    if (item.children && item.children.length) {
      const found = findRegimens(item.children, key)
      if (found && found.length) return found
    }
  }
  return []
}

// 格式化详情值
const formatDetailValue = (value) => {
  if (!value) return ''
  if (typeof value !== 'string') return value
  return value.replace(/\n/g, '<br>')
}

const openRegimensDialog = () => {
  emit('open-regimens', currentRegimens.value)
}

const clearContent = () => {
  currentContent.value = null
  currentTitle.value = ''
  currentRegimens.value = []
  emit('clear')
}

watch(() => props.menuKey, (newKey) => {
  if (newKey) {
    const title = findMenuTitleByKey(newKey)
    const content = getMenuContentByKey(newKey)
    const regimens = findRegimens(leftMenuConfig, newKey)

    if (title && content) {
      currentTitle.value = title
      currentContent.value = content
      currentRegimens.value = regimens || []
    } else {
      currentContent.value = null
      currentTitle.value = ''
      currentRegimens.value = []
    }
  } else {
    currentContent.value = null
    currentTitle.value = ''
    currentRegimens.value = []
  }
}, { immediate: true })
</script>

<style scoped>
.detail-panel {
  height: 100%;
  padding: 16px;
  background-color: #fff;
  border-left: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e4e7ed;
  flex-shrink: 0;
}

.detail-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 17px;
}

.close-btn {
  font-size: 18px !important;
  width: 28px;
  height: 28px;
  padding: 0 !important;
  border-radius: 50%;
  cursor: pointer;
  color: #909399;
  background: transparent;
  border: none;
  flex-shrink: 0;
}

.close-btn:hover {
  background-color: #f0f0f0;
  color: #f56c6c;
}

.detail-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 50px;
}

.detail-item {
  padding: 14px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-value {
  font-size: 14px;
  color: #606266;
  line-height: 1.8;
  word-break: break-word;
}

.detail-row {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8eef3;
}

.detail-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.detail-label {
  font-weight: bold;
  color: #409eff;
  margin-bottom: 6px;
  font-size: 13px;
}

.detail-footer {
  flex-shrink: 0;
  padding-top: 12px;
  border-top: 1px solid #e8eef3;
  margin-top: 8px;
  background-color: #fff;
}

.detail-footer .el-button {
  font-size: 14px;
  padding: 10px 16px;
  height: auto;
  min-height: 40px;
  white-space: normal;
  word-break: break-word;
  line-height: 1.4;
}

.empty-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
}

@media (max-width: 768px) {
  .detail-panel {
    padding: 12px;
  }
  .detail-header h3 {
    font-size: 15px;
  }
  .detail-item {
    padding: 10px;
  }
  .detail-footer .el-button {
    font-size: 13px;
    padding: 8px 12px;
    min-height: 36px;
  }
}
</style>