<template>
  <div class="detail-panel">
    <div v-if="detail" class="detail-content">
      <h3>{{ entityName }}</h3>
      <el-tabs>
        <el-tab-pane label="临床信息" name="clinical">
          <div v-for="(value, key) in detail" :key="key" class="detail-item">
            <div class="detail-label">{{ key }}</div>
            <div class="detail-value">
              <el-tag v-for="item in (Array.isArray(value) ? value : [value])" :key="item" size="small">{{ item }}</el-tag>
            </div>
          </div>
        </el-tab-pane>
        <!-- 可以继续添加更多标签页，如“治疗方案”等 -->
      </el-tabs>
    </div>
    <el-empty v-else description="点击节点查看详情" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getEntityDetail, graphData } from '@/data/mockData'
const props = defineProps(['entityId'])
const detail = ref(null)
const entityName = ref('')
watch(() => props.entityId, (id) => {
  if (id) {
    const node = graphData.nodes.find(n => n.id === id)
    entityName.value = node?.name || ''
    detail.value = getEntityDetail(id)
  } else { detail.value = null }
}, { immediate: true })
</script>

<style scoped>
.detail-panel { padding: 20px; height: 100%; overflow-y: auto; }
.detail-item { margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 6px; }
.detail-label { font-weight: bold; color: #409eff; margin-bottom: 8px; }
.detail-value { display: flex; flex-wrap: wrap; gap: 8px; }
</style>