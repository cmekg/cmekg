<template>
  <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import G6 from '@antv/g6'

const props = defineProps({
  graphData: {
    type: Object,
    required: true,
    default: () => ({ nodes: [], edges: [] })
  }
})

const emit = defineEmits(['node-click'])

const graphContainer = ref(null)
let graph = null
let isRendering = false

// 节点颜色配置（按照层级）
const getNodeColor = (node) => {
  if (node.level === 1) return '#2c3e50'   // 一级菜单 - 深蓝灰
  if (node.level === 2) return '#409eff'   // 二级菜单 - 蓝色
  return '#67c23a'                          // 三级药物 - 绿色
}

// 节点大小配置
const getNodeSize = (node) => {
  if (node.level === 1) return 60
  if (node.level === 2) return 50
  return 45
}

const getNodeStyle = (node) => {
  return {
    fill: getNodeColor(node),
    stroke: '#fff',
    lineWidth: 2
  }
}

// 聚焦某个节点（居中并高亮）
const focusNode = (nodeId) => {
  if (!graph) return

  const node = graph.findById(nodeId)
  if (!node) return

  try {
    graph.focusItem(node, true, {
      easing: 'easeCubic',
      duration: 500,
      animate: true
    })
  } catch (e) {
    const model = node.getModel()
    const width = graph.getWidth()
    const height = graph.getHeight()
    graph.moveTo(width / 2 - model.x, height / 2 - model.y)
  }

  graph.setItemState(node, 'highlight', true)
  setTimeout(() => {
    if (graph && !graph.destroyed) {
      graph.setItemState(node, 'highlight', false)
    }
  }, 3000)
}

// 创建图谱实例
const createGraph = () => {
  if (!graphContainer.value) return

  const width = graphContainer.value.clientWidth || 380
  const height = graphContainer.value.clientHeight || 500

  if (graph) {
    graph.destroy()
    graph = null
  }

  graph = new G6.Graph({
    container: graphContainer.value,
    width,
    height,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node']
    },
    layout: {
      type: 'force',
      preventOverlap: true,
      nodeSize: 60,
      linkDistance: 200,
      nodeSpacing: 100,
      force: {
        repulsion: 500,
        gravity: 0.1,
        edgeStrength: 0.5
      }
    },
    defaultNode: {
      type: 'circle',
      labelCfg: {
        style: { fill: '#333', fontSize: 12 },
        position: 'bottom',
        offset: 0
      }
    },
    defaultEdge: {
      type: 'line',
      style: { stroke: '#aaa', lineWidth: 1.5, endArrow: false },
      labelCfg: { style: { fill: '#666', fontSize: 9 }, autoRotate: true }
    },
    nodeStateStyles: {
      highlight: {
        stroke: '#f00',
        lineWidth: 3,
        shadowBlur: 10,
        shadowColor: '#f00'
      }
    },
    minZoom: 0.3,
    maxZoom: 3
  })

  // 绑定节点点击事件
  graph.on('node:click', (evt) => {
    const node = evt.item.getModel()
    emit('node-click', node)
  })

  renderGraph()
}

// 渲染图谱
const renderGraph = () => {
  if (!graph || isRendering) return

  isRendering = true

  try {
    const nodes = props.graphData.nodes.map(node => ({
      id: node.id,
      name: node.name,
      type: node.type,
      level: node.level,
      label: node.name,
      size: getNodeSize(node),
      style: getNodeStyle(node)
    }))

    const edges = props.graphData.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      label: edge.label || ''
    }))

    graph.data({ nodes, edges })
    graph.render()

    setTimeout(() => {
      try {
        graph.layout()
        setTimeout(() => {
          graph.fitView(20, undefined, undefined, [20, 20, 20, 20])
        }, 800)
      } catch (e) {}
    }, 100)
  } catch (e) {
    console.error('renderGraph error:', e)
  } finally {
    isRendering = false
  }
}

// 监听数据变化
watch(() => props.graphData, () => {
  if (graph && !isRendering) {
    renderGraph()
  }
}, { deep: true })

const handleResize = () => {
  if (graph && graphContainer.value && !graph.destroyed) {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight
    if (width > 0 && height > 0) {
      try {
        graph.changeSize(width, height)
      } catch (e) {}
    }
  }
}

onMounted(() => {
  nextTick(() => {
    createGraph()
  })
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (graph) {
    graph.destroy()
    graph = null
  }
  window.removeEventListener('resize', handleResize)
})

defineExpose({
  focusNode
})
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-color: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
  touch-action: none;
}
</style>