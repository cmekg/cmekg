<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="logo">CMeKG 医学知识图谱</div>
    </el-header>

    <el-container>
      <!-- 左侧面板 -->
      <el-aside :width="leftWidth" class="left-aside" :class="{ 'mobile-open': leftOpen }">
        <div class="mobile-close" @click="leftOpen = false">✕</div>
        <EntityPanel
            :entities="allEntities"
            @select-entity="handleSelectEntity"
        />
      </el-aside>

      <!-- 中间图谱区域 -->
      <el-main class="main-content">
        <KnowledgeGraph
            ref="graphRef"
            :graph-data="currentGraphData"
        />
        <!-- 移动端浮动按钮 - 左侧 -->
        <div class="mobile-fab" @click="toggleLeftPanel">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
        <!-- 移动端浮动按钮 - 右侧（有选中实体时才显示） -->
        <div class="mobile-fab-right" @click="toggleRightPanel" v-if="selectedEntityId">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z"/>
          </svg>
        </div>
      </el-main>

      <!-- 右侧详情面板 -->
      <el-aside :width="rightWidth" class="right-aside" :class="{ 'mobile-open': rightOpen }">
        <div class="mobile-close" @click="rightOpen = false">✕</div>
        <DetailPanel
            :entity-id="selectedEntityId"
            @clear="handleClearDetail"
        />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import EntityPanel from './components/EntityPanel.vue'
import KnowledgeGraph from './components/KnowledgeGraph.vue'
import DetailPanel from './components/DetailPanel.vue'
import { getAllEntities, graphData as initialGraphData } from './data/mockData'

const allEntities = ref({ diseases: [], drugs: [], symptoms: [] })
const currentGraphData = ref({ nodes: [], edges: [] })
const selectedEntityId = ref(null)
const graphRef = ref(null)

// 移动端状态
const leftOpen = ref(false)
const rightOpen = ref(false)
const isMobile = ref(window.innerWidth <= 768)

const leftWidth = computed(() => isMobile.value ? '0px' : '280px')
const rightWidth = computed(() => isMobile.value ? '0px' : '320px')

// 清空详情面板
const handleClearDetail = () => {
  selectedEntityId.value = null
}

// 选择左侧实体
const handleSelectEntity = (entityId) => {
  selectedEntityId.value = entityId
  if (isMobile.value) {
    rightOpen.value = true
    leftOpen.value = false
  }

  if (graphRef.value && graphRef.value.focusNode) {
    graphRef.value.focusNode(entityId)
  }
}

// 点击图谱节点（只有电脑端才显示详情）
const handleNodeClick = (node) => {
  if (!isMobile.value) {
    selectedEntityId.value = node.id
  }
}

// 移动端面板控制
const toggleLeftPanel = () => {
  leftOpen.value = !leftOpen.value
  if (leftOpen.value) {
    rightOpen.value = false
  }
}

const toggleRightPanel = () => {
  rightOpen.value = !rightOpen.value
  if (rightOpen.value) {
    leftOpen.value = false
  }
}

// 监听窗口大小变化
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    leftOpen.value = false
    rightOpen.value = false
  }
}

onMounted(() => {
  allEntities.value = getAllEntities()
  currentGraphData.value = initialGraphData
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
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
  width: 100%;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 60px !important;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.left-aside, .right-aside {
  background-color: #fff;
  border-right: 1px solid #e4e7ed;
  transition: transform 0.3s ease;
  overflow-y: auto;
}

.main-content {
  padding: 20px;
  background-color: #f5f7fa;
  position: relative;
  overflow: hidden;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .left-aside {
    position: fixed !important;
    left: 0;
    top: 60px;
    bottom: 0;
    width: 260px !important;
    z-index: 1000;
    background: white;
    box-shadow: 2px 0 8px rgba(0,0,0,0.15);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .left-aside.mobile-open {
    transform: translateX(0);
  }

  .right-aside {
    position: fixed !important;
    right: 0;
    top: 60px;
    bottom: 0;
    width: 280px !important;
    z-index: 1000;
    background: white;
    box-shadow: -2px 0 8px rgba(0,0,0,0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .right-aside.mobile-open {
    transform: translateX(0);
  }

  .main-content {
    padding: 10px;
    width: 100%;
  }

  .mobile-close {
    display: block;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #999;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    background: #f5f5f5;
    z-index: 1001;
  }

  .mobile-close:hover {
    background: #e0e0e0;
  }

  .mobile-fab {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 99;
  }

  .mobile-fab-right {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #67c23a;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 99;
  }

  .mobile-fab:active, .mobile-fab-right:active {
    opacity: 0.8;
  }
}

@media (min-width: 769px) {
  .mobile-close, .mobile-fab, .mobile-fab-right {
    display: none;
  }
}
</style>