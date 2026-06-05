<template>
  <div class="entity-panel">
    <el-menu :default-active="activeType" @select="(index) => activeType = index">
      <el-menu-item index="diseases">疾病 ({{ entities.diseases?.length }})</el-menu-item>
      <el-menu-item index="drugs">药物 ({{ entities.drugs?.length }})</el-menu-item>
      <el-menu-item index="symptoms">症状 ({{ entities.symptoms?.length }})</el-menu-item>
    </el-menu>
    <div class="entity-list">
      <el-input v-model="searchText" placeholder="搜索" prefix-icon="Search" size="small" />
      <div class="list-items">
        <div v-for="entity in filteredEntities" :key="entity.id" class="entity-item" @click="emit('select-entity', entity.id)">
          <span class="entity-dot" :style="{ backgroundColor: entityColors[entity.type] }"></span>
          <span>{{ entity.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { entityColors } from '@/data/mockData'
const props = defineProps(['entities'])
const emit = defineEmits(['select-entity'])
const activeType = ref('diseases')
const searchText = ref('')
const filteredEntities = computed(() => {
  const list = props.entities[activeType.value] || []
  return list.filter(e => e.name.includes(searchText.value))
})
</script>

<style scoped>
.entity-panel { height: 100%; display: flex; flex-direction: column; }
.entity-list { flex: 1; padding: 15px; overflow-y: auto; }
.entity-item { display: flex; align-items: center; padding: 8px; cursor: pointer; border-radius: 6px; }
.entity-item:hover { background: #f0f2f5; }
.entity-dot { width: 8px; height: 8px; border-radius: 50%; margin-right: 10px; }
</style>