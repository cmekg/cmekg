<template>
  <div class="detail-panel">
    <div v-if="currentContent" class="detail-content">
      <div class="detail-header">
        <h3>{{ currentTitle }}</h3>
        <div class="detail-header-actions">
          <el-button type="text" class="close-btn" @click="clearContent">✕</el-button>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-item">
          <!-- 普通静态文本 -->
          <div v-if="currentContent.type === 'static'" class="detail-value">
            {{ currentContent.value }}
          </div>

          <!-- 药物详情 -->
          <div v-else-if="currentContent.type === 'drugDetail'" class="drug-detail">
            <div v-for="(value, key) in currentContent.detail" :key="key" class="detail-row">
              <div class="detail-label">{{ key }}</div>
              <!-- 使用 v-html 支持 HTML 标签换行 -->
              <div class="detail-value" v-html="formatDetailValue(value)"></div>
            </div>
          </div>
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
import { getMenuContentByKey, findMenuTitleByKey } from '@/data/mockData'

const props = defineProps({
  menuKey: { type: String, default: null }
})
const emit = defineEmits(['clear'])

const currentContent = ref(null)
const currentTitle = ref('')

// 格式化详情值，将字符串中的 \n 和 <br> 转换为 HTML 换行
const formatDetailValue = (value) => {
  if (!value) return ''
  if (typeof value !== 'string') return value

  // 将 \n 替换为 <br>，并保持已有的 <br> 标签
  return value.replace(/\n/g, '<br>')
}

const clearContent = () => {
  currentContent.value = null
  currentTitle.value = ''
  emit('clear')
}

watch(() => props.menuKey, (newKey) => {
  if (newKey) {
    const title = findMenuTitleByKey(newKey)
    const content = getMenuContentByKey(newKey)

    if (title && content) {
      currentTitle.value = title
      currentContent.value = content
    } else {
      currentContent.value = null
      currentTitle.value = ''
    }
  } else {
    currentContent.value = null
    currentTitle.value = ''
  }
}, { immediate: true })
</script>

<style scoped>
.detail-panel {
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  border-left: 1px solid #e4e7ed;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
}

.detail-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
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
}

.close-btn:hover {
  background-color: #f0f0f0;
  color: #f56c6c;
}

.detail-item {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-value {
  font-size: 14px;
  color: #606266;
  line-height: 1.8;
}

.detail-row {
  margin-bottom: 14px;
  padding-bottom: 10px;
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
  margin-bottom: 8px;
  font-size: 13px;
}

.empty-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

/* 列表样式 */
.detail-value ul, .detail-value ol {
  margin: 0;
  padding-left: 20px;
}

.detail-value li {
  margin-bottom: 4px;
}
</style>