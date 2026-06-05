<template>
  <div class="detail-panel">
    <div v-if="selectedEntity" class="detail-content">
      <div class="detail-header">
        <h3>{{ selectedEntity.name }}</h3>
        <div class="detail-header-actions">
          <el-tag :type="getTagType(selectedEntity.type)" size="small">
            {{ getEntityTypeName(selectedEntity.type) }}
          </el-tag>
          <el-button
              type="text"
              class="close-btn"
              @click="clearEntity"
          >
            ✕
          </el-button>
        </div>
      </div>

      <el-tabs v-model="activeTab" class="detail-tabs">
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

    <div v-else class="empty-detail">
      <el-empty description="点击左侧菜单查看详情" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { graphData } from '@/data/mockData'

const props = defineProps({
  entityId: { type: String, default: null }
})
const emit = defineEmits(['clear'])

const activeTab = ref('basic')
const selectedEntity = ref(null)

const clearEntity = () => {
  selectedEntity.value = null
  emit('clear')
}

const getEntityTypeName = (type) => {
  const map = { disease: '疾病', drug: '药物', symptom: '症状', department: '科室' }
  return map[type] || '实体'
}

const getTagType = (type) => {
  const map = { disease: 'danger', drug: 'primary', symptom: 'warning', department: 'success' }
  return map[type] || 'info'
}

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

const basicInfo = computed(() => {
  if (!selectedEntity.value?.detail) return {}
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

const clinicalInfo = computed(() => {
  if (!selectedEntity.value?.detail) return []
  const detail = selectedEntity.value.detail
  const result = []
  const fields = ['临床症状', '常用药物', '高危因素']
  fields.forEach(field => {
    if (detail[field] && Array.isArray(detail[field]) && detail[field].length) {
      result.push({ key: field, values: detail[field] })
    }
  })
  return result
})

const treatment = computed(() => {
  if (!selectedEntity.value?.detail) return []
  return selectedEntity.value.detail['治疗方案'] || []
})

const complications = computed(() => {
  if (!selectedEntity.value?.detail) return []
  return selectedEntity.value.detail['并发症'] || []
})

const examinations = computed(() => {
  if (!selectedEntity.value?.detail) return []
  const detail = selectedEntity.value.detail
  const exams = []
  if (detail['实验室检查']) exams.push(...detail['实验室检查'])
  if (detail['影像学检查']) exams.push(...detail['影像学检查'])
  return exams
})
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
  background: transparent;
  border: none;
}

.close-btn:hover {
  background-color: #f0f0f0;
  color: #f56c6c;
}

.detail-item {
  margin-bottom: 15px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-label {
  font-weight: bold;
  color: #409eff;
  margin-bottom: 8px;
  font-size: 13px;
}

.detail-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}

.treatment-item,
.complication-item,
.examination-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}

.empty-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}
</style>