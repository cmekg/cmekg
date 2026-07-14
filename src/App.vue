<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="logo">抗肿瘤静脉给药知识图谱</div>
    </el-header>

    <el-container>
      <!-- 左侧菜单面板 -->
      <el-aside :width="leftWidth" class="left-aside" :class="{ 'mobile-open': leftOpen }">
        <div class="mobile-close" @click="leftOpen = false">✕</div>
        <MenuPanel @select-item="handleSelectMenuItem" />
      </el-aside>

      <!-- 中间图谱区域 -->
      <el-main class="main-content">
        <KnowledgeGraph
            ref="graphRef"
            :graph-data="graphData"
            @node-click="handleNodeClick"
        />
        <!-- 移动端浮动按钮 -->
        <div class="mobile-fab" @click="toggleLeftPanel">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
        <div class="mobile-fab-right" @click="toggleRightPanel" v-if="selectedMenuKey">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z"/>
          </svg>
        </div>
      </el-main>

      <!-- 右侧详情面板 -->
      <el-aside :width="rightWidth" class="right-aside" :class="{ 'mobile-open': rightOpen }">
        <div class="mobile-close" @click="rightOpen = false">✕</div>
        <DetailPanel
            :menu-key="selectedMenuKey"
            @clear="handleClearDetail"
            @open-regimens="handleOpenRegimens"
        />
      </el-aside>
    </el-container>

    <!-- 化疗方案弹窗 - 放在 App 最外层，不受右侧面板遮挡 -->
    <Regimen ref="regimensDialogRef" :regimens="dialogRegimens" />
  </el-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import MenuPanel from './components/MenuPanel.vue'
import KnowledgeGraph from './components/KnowledgeGraph.vue'
import DetailPanel from './components/DetailPanel.vue'
import Regimen from './components/Regimen.vue'
import { graphData as initialGraphData, getMenuContentByKey, dataConfig } from './data/mockData'

const graphData = ref(initialGraphData)
const selectedMenuKey = ref(null)
const graphRef = ref(null)
const regimensDialogRef = ref(null)
const dialogRegimens = ref([])

const leftOpen = ref(false)
const rightOpen = ref(false)
const isMobile = ref(window.innerWidth <= 768)

const leftWidth = computed(() => isMobile.value ? '0px' : '280px')
const rightWidth = computed(() => {
  if (!selectedMenuKey.value) return '0px'
  return isMobile.value ? '280px' : '320px'
})

// 打开化疗方案弹窗
const handleOpenRegimens = (regimens) => {
  dialogRegimens.value = regimens
  if (regimensDialogRef.value) {
    regimensDialogRef.value.open()
  }
}

// 递归查找 regimen（从 dataConfig 中查找）
const findRegimenByKey = (items, key) => {
  for (const item of items) {
    if (item.key === key) {
      return item.regimen || []
    }
    if (item.children) {
      const found = findRegimenByKey(item.children, key)
      if (found && found.length) return found
    }
  }
  return []
}

// 点击图谱节点
const handleNodeClick = (node) => {
  // ===== 方案节点 或 方案属性节点 → 打开 Regimen 弹窗 =====
  if (node.type === 'regimen' || node.type === 'regimenField') {
    let drugName = ''
    let targetRegimen = null

    if (node.type === 'regimen') {
      targetRegimen = node.regimenData
      if (node.parentKey) {
        const parentNode = graphData.value.nodes.find(n => n.id === node.parentKey)
        if (parentNode) drugName = parentNode.name || ''
      }
    } else if (node.type === 'regimenField') {
      const parentNode = graphData.value.nodes.find(n => n.id === node.parentKey)
      if (parentNode && parentNode.regimenData) {
        targetRegimen = parentNode.regimenData
        if (parentNode.parentKey) {
          const drugNode = graphData.value.nodes.find(n => n.id === parentNode.parentKey)
          if (drugNode) drugName = drugNode.name || ''
        }
      }
    }

    if (targetRegimen) {
      const regimenWithDrug = {
        ...targetRegimen,
        _drugName: drugName
      }
      dialogRegimens.value = [regimenWithDrug]
      if (regimensDialogRef.value) {
        regimensDialogRef.value.open()
      }
      if (graphRef.value && graphRef.value.focusNode) {
        graphRef.value.focusNode(node.id)
      }
      return
    }
  }

  // ===== 药物节点（有详情的） → 优先打开 Regimen，如果没有则打开 DetailPanel =====
  if (node.hasDetail) {
    // 直接从 dataConfig 中查找 regimen
    const regimens = findRegimenByKey(dataConfig, node.id)

    if (regimens && regimens.length > 0) {
      const regimensWithDrug = regimens.map(reg => ({
        ...reg,
        _drugName: node.name
      }))
      dialogRegimens.value = regimensWithDrug
      if (regimensDialogRef.value) {
        regimensDialogRef.value.open()
      }
      if (graphRef.value && graphRef.value.focusNode) {
        graphRef.value.focusNode(node.id)
      }
      return
    }

    // 没有方案，打开右侧 DetailPanel
    const content = getMenuContentByKey(node.id)
    if (content) {
      selectedMenuKey.value = node.id
      if (isMobile.value) {
        rightOpen.value = true
        leftOpen.value = false
      }
      if (graphRef.value && graphRef.value.focusNode) {
        graphRef.value.focusNode(node.id)
      }
      return
    }
  }

  // ===== 属性节点（药物属性） → 打开右侧 DetailPanel =====
  let targetId = node.id
  if (node.type === 'attribute' && node.parentKey) {
    targetId = node.parentKey
  }

  const content = getMenuContentByKey(targetId)

  if (content || node.hasDetail) {
    selectedMenuKey.value = targetId
    if (isMobile.value) {
      rightOpen.value = true
      leftOpen.value = false
    }
    if (graphRef.value && graphRef.value.focusNode) {
      graphRef.value.focusNode(targetId)
    }
  } else {
    selectedMenuKey.value = null
    if (isMobile.value) {
      rightOpen.value = false
    }
    if (graphRef.value && graphRef.value.focusNode) {
      graphRef.value.focusNode(targetId)
    }
  }
}

const handleClearDetail = () => {
  selectedMenuKey.value = null
  if (isMobile.value) {
    rightOpen.value = false
  }
}

const handleSelectMenuItem = (menuKey) => {
  const content = getMenuContentByKey(menuKey)

  if (!content) {
    selectedMenuKey.value = null
    if (isMobile.value) {
      rightOpen.value = false
    }
    if (graphRef.value && graphRef.value.focusNode) {
      graphRef.value.focusNode(menuKey)
    }
    return
  }

  selectedMenuKey.value = menuKey
  if (isMobile.value) {
    rightOpen.value = true
    leftOpen.value = false
  }
  if (graphRef.value && graphRef.value.focusNode) {
    graphRef.value.focusNode(menuKey)
  }
}

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

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    leftOpen.value = false
    rightOpen.value = false
  }
}

onMounted(() => {
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

body {
  overflow: hidden;
}

.app-container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 60px !important;
  flex-shrink: 0;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.el-container:nth-child(2) {
  flex: 1;
  overflow: hidden;
}

.left-aside, .right-aside {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 20px;
  background-color: #f5f7fa;
  position: relative;
  overflow: hidden;
}

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
    overflow-y: auto !important;
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
    overflow-y: auto !important;
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
}

@media (min-width: 769px) {
  .mobile-close, .mobile-fab, .mobile-fab-right {
    display: none;
  }
}
</style>