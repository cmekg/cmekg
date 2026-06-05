<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="logo">CMeKG 医学知识图谱</div>
    </el-header>

    <el-container>
      <el-aside width="280px" class="left-aside">
        <EntityPanel
            :entities="allEntities"
            @select-entity="handleSelectEntity"
        />
      </el-aside>

      <el-main class="main-content">
        <KnowledgeGraph
            :graph-data="currentGraphData"
            @node-click="handleNodeClick"
        />
      </el-main>

      <el-aside width="320px" class="right-aside">
        <DetailPanel :entity-id="selectedEntityId" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EntityPanel from './components/EntityPanel.vue'
import KnowledgeGraph from './components/KnowledgeGraph.vue'
import DetailPanel from './components/DetailPanel.vue'
import { getAllEntities, graphData as initialGraphData } from './data/mockData'

const allEntities = ref({ diseases: [], drugs: [], symptoms: [] })
const currentGraphData = ref({ nodes: [], edges: [] })
const selectedEntityId = ref(null)

const handleSelectEntity = (entityId) => {
  selectedEntityId.value = entityId
  // 可选：根据选中的实体更新图谱
  // currentGraphData.value = getSubGraph(entityId)
}

const handleNodeClick = (node) => {
  selectedEntityId.value = node.id
}

onMounted(() => {
  allEntities.value = getAllEntities()
  currentGraphData.value = initialGraphData
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.left-aside, .right-aside {
  background-color: #fff;
  border-right: 1px solid #e4e7ed;
  border-left: 1px solid #e4e7ed;
}

.main-content {
  padding: 20px;
  background-color: #f5f7fa;
}

.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item {
  color: white;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #409eff;
}

.el-menu--horizontal > .el-menu-item:hover {
  background-color: #34495e;
}
</style>