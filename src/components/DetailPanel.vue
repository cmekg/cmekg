<template>
  <div class="detail-panel">
    <!-- 只有选中实体时才显示内容 -->
    <div v-if="selectedEntity" class="detail-content">
      <div class="detail-header">
        <h3>{{ selectedEntity.name }}</h3>
        <div class="detail-header-actions">
          <el-tag :type="getTagType(selectedEntity.type)" size="small">
            {{ getEntityTypeName(selectedEntity.type) }}
          </el-tag>
          <!-- 添加关闭按钮 -->
          <el-button
              type="text"
              class="close-btn"
              @click="clearEntity"
              :icon="Close"
          >
            ✕
          </el-button>
        </div>
      </div>

      <el-tabs v-model="activeTab" class="detail-tabs">
        <!-- 基本信息标签页 -->
        <el-tab-pane label="基本信息" name="basic">
          <div class="detail-section">
            <div
                v-for="(value, key) in basicInfo"
                :key="key"
                class="detail-item"
            >
              <div class="detail-label">{{ key }}</div>
              <div class="detail-value">
                <span v-if="Array.isArray(value)">
                  <el-tag
                      v-for="item in value"
                      :key="item"
                      size="small"
                      class="detail-tag"
                  >
                    {{ item }}
                  </el-tag>
                </span>
                <span v-else>{{ value }}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 临床信息标签页 -->
        <el-tab-pane label="临床信息" name="clinical" v-if="clinicalInfo.length">
          <div class="detail-section">
            <div
                v-for="item in clinicalInfo"
                :key="item.key"
                class="detail-item"
            >
              <div class="detail-label">{{ item.key }}</div>
              <div class="detail-value">
                <el-tag
                    v-for="val in item.values"
                    :key="val"
                    size="small"
                    class="detail-tag"
                >
                  {{ val }}
                </el-tag>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 治疗方案标签页 -->
        <el-tab-pane label="治疗方案" name="treatment" v-if="treatment.length">
          <div class="detail-section">
            <div
                v-for="item in treatment"
                :key="item"
                class="treatment-item"
            >
              <el-tag type="success">{{ item }}</el-tag>
            </div>
          </div>
        </el-tab-pane>

        <!-- 并发症标签页 -->
        <el-tab-pane label="并发症" name="complications" v-if="complications.length">
          <div class="detail-section">
            <div
                v-for="item in complications"
                :key="item"
                class="complication-item"
            >
              <el-tag type="danger">{{ item }}</el-tag>
            </div>
          </div>
        </el-tab-pane>

        <!-- 检查手段标签页 -->
        <el-tab-pane label="检查手段" name="examination" v-if="examinations.length">
          <div class="detail-section">
            <div
                v-for="item in examinations"
                :key="item"
                class="examination-item"
            >
              <el-tag type="info">{{ item }}</el-tag>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 未选中任何实体时：完全空白 -->
    <div v-else class="empty-detail"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { graphData } from '@/data/mockData'

const props = defineProps({
  entityId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['clear'])

const activeTab = ref('basic')
const selectedEntity = ref(null)

// 清空选中实体
const clearEntity = () => {
  selectedEntity.value = null
  emit('clear')
}

// 实体类型映射
const getEntityTypeName = (type) => {
  const typeMap = {
    disease: '疾病',
    drug: '药物',
    symptom: '症状',
    department: '科室'
  }
  return typeMap[type] || '实体'
}

const getTagType = (type) => {
  const typeMap = {
    disease: 'danger',
    drug: 'primary',
    symptom: 'warning',
    department: 'success'
  }
  return typeMap[type] || 'info'
}

// 监听 entityId 变化，获取对应的实体数据
watch(() => props.entityId, (newId) => {
  if (newId) {
    const entity = graphData.nodes.find(n => n.id === newId)
    if (entity) {
      selectedEntity.value = entity
      activeTab.value = 'basic'
    } else {
      selectedEntity.value = null
    }
  } else {
    selectedEntity.value = null
  }
}, { immediate: true })

// 基本信息（排除数组类型的字段）
const basicInfo = computed(() => {
  if (!selectedEntity.value || !selectedEntity.value.detail) return {}

  const detail = selectedEntity.value.detail
  const excludeKeys = ['临床症状', '治疗方案', '常用药物', '并发症', '实验室检查', '影像学检查', '预防措施', '高危因素', '适应症', '副作用', '诊疗范围', '常见于']
  const info = {}

  Object.keys(detail).forEach(key => {
    if (!excludeKeys.includes(key) && !Array.isArray(detail[key])) {
      info[key] = detail[key]
    }
  })

  return info
})

// 临床信息（症状、药物等）
const clinicalInfo = computed(() => {
  if (!selectedEntity.value || !selectedEntity.value.detail) return []

  const detail = selectedEntity.value.detail
  const result = []

  const clinicalFields = ['临床症状', '常用药物', '高危因素']
  clinicalFields.forEach(field => {
    if (detail[field] && Array.isArray(detail[field]) && detail[field].length > 0) {
      result.push({ key: field, values: detail[field] })
    }
  })

  return result
})

// 治疗方案
const treatment = computed(() => {
  if (!selectedEntity.value || !selectedEntity.value.detail) return []
  const detail = selectedEntity.value.detail
  return detail['治疗方案'] || detail['诊疗范围'] || []
})

// 并发症
const complications = computed(() => {
  if (!selectedEntity.value || !selectedEntity.value.detail) return []
  return selectedEntity.value.detail['并发症'] || []
})

// 检查手段
const examinations = computed(() => {
  if (!selectedEntity.value || !selectedEntity.value.detail) return []
  const detail = selectedEntity.value.detail
  const exams = []
  if (detail['实验室检查']) exams.push(...detail['实验室检查'])
  if (detail['影像学检查']) exams.push(...detail['影像学检查'])
  if (detail['辅助检查']) exams.push(...detail['辅助检查'])
  return exams
})
</script>

<style scoped>
.detail-panel {
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
}

.detail-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: #f0f0f0;
  color: #f56c6c;
}

.detail-tabs {
  margin-top: 10px;
}

.detail-section {
  margin-top: 15px;
}

.detail-item {
  margin-bottom: 15px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;
}

.detail-item:hover {
  background-color: #f0f2f5;
}

.detail-label {
  font-weight: bold;
  color: #409eff;
  margin-bottom: 8px;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.detail-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}

.treatment-item,
.complication-item,
.examination-item {
  margin-bottom: 10px;
  display: inline-block;
  margin-right: 10px;
}

.empty-detail {
  height: 100%;
  min-height: 400px;
}
</style>