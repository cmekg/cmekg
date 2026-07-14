<template>
  <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import G6 from '@antv/g6'
import { graphColors } from '@/data/mockData'

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
let renderTimer = null
let focusTimer = null

// 节点颜色配置
const getNodeColor = (node) => {
  if (node.type === 'regimen') return '#9B59B6'
  if (node.type === 'regimenField') return '#FFB347'
  if (node.type === 'attribute') return '#B39DDB'
  if (node.hasDetail) return '#F6BD16'
  if (node.level === 1) return graphColors.level1
  if (node.level === 2) return graphColors.level2
  return colorPalette[getColorIndex(node.id)]
}

const colorPalette = [
  '#F39C12', '#E67E22', '#F1C40F', '#2ECC71', '#1ABC9C',
  '#3498DB', '#9B59B6', '#E74C3C', '#E91E63', '#00BCD4',
  '#4CAF50', '#FF9800', '#8E44AD', '#16A085', '#C0392B',
  '#2C3E50', '#D35400', '#BDC3C7', '#7F8C8D', '#27AE60',
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E77E', '#DDA0DD'
]

const getColorIndex = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash) % colorPalette.length
}

// 节点大小配置
const getNodeSize = (node) => {
  if (node.type === 'regimen') return 48
  if (node.type === 'regimenField') return 28
  if (node.type === 'attribute') return 30
  if (node.hasDetail) return 54
  if (node.level === 1) return 68
  if (node.level === 2) return 52
  return 42
}

// 节点样式（减少阴影提高性能）
const getNodeStyle = (node) => {
  const baseStyle = {
    fill: getNodeColor(node),
    stroke: '#fff',
    lineWidth: 2,
    shadowBlur: 4,
    shadowColor: 'rgba(0,0,0,0.10)',
    cursor: 'pointer',
    opacity: 0.95
  }

  if (node.type === 'regimen') {
    return {
      ...baseStyle,
      stroke: '#8E44AD',
      lineWidth: 2.5,
      shadowBlur: 8,
      shadowColor: 'rgba(155, 89, 182, 0.3)'
    }
  }
  if (node.type === 'regimenField') {
    return { ...baseStyle, stroke: '#FF8C00', lineWidth: 1, shadowBlur: 2, lineDash: [2, 2] }
  }
  if (node.type === 'attribute') {
    return { ...baseStyle, stroke: '#9575CD', lineWidth: 1, shadowBlur: 2, lineDash: [3, 3] }
  }
  if (node.hasDetail) {
    return { ...baseStyle, stroke: '#ffd700', lineWidth: 3, shadowBlur: 8, shadowColor: 'rgba(255, 215, 0, 0.2)' }
  }
  if (node.level === 1) {
    return { ...baseStyle, stroke: '#fff', lineWidth: 3, shadowBlur: 8, shadowColor: 'rgba(231, 76, 60, 0.12)' }
  }
  if (node.level === 2) {
    return { ...baseStyle, stroke: '#f0f0f0', lineWidth: 2, shadowBlur: 4, shadowColor: 'rgba(52, 152, 219, 0.10)' }
  }
  return baseStyle
}

// 聚焦某个节点（防抖）
const focusNode = (nodeId) => {
  if (!graph) return
  clearTimeout(focusTimer)
  focusTimer = setTimeout(() => {
    try {
      const node = graph.findById(nodeId)
      if (node) {
        graph.focusItem(node, true, { easing: 'easeCubic', duration: 400, animate: true })
        graph.setItemState(node, 'highlight', true)
        setTimeout(() => {
          if (graph && !graph.destroyed) graph.setItemState(node, 'highlight', false)
        }, 2000)
      }
    } catch (e) {}
  }, 100)
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
      nodeSize: 50,
      linkDistance: 180,
      nodeSpacing: 70,
      force: {
        repulsion: 500,
        gravity: 0.08,
        edgeStrength: 0.5,
        nodeStrength: 0.4,
        alpha: 0.5,
        alphaMin: 0.02,
        alphaDecay: 0.05,
        velocityDecay: 0.5
      }
    },
    defaultNode: {
      type: 'circle',
      labelCfg: {
        style: {
          fill: '#2c3e50',
          fontSize: 11,
          fontWeight: 'bold',
          fontFamily: 'Microsoft YaHei, "PingFang SC", Arial, sans-serif'
        },
        position: 'bottom',
        offset: 6
      }
    },
    defaultEdge: {
      type: 'quadratic',
      style: {
        stroke: '#95a5a6',
        lineWidth: 1.2,
        lineAppendWidth: 2
      },
      labelCfg: {
        style: {
          fill: '#7f8c8d',
          fontSize: 8,
          fontWeight: 'normal',
          background: {
            fill: 'rgba(255,255,255,0.8)',
            padding: [1, 3, 1, 3],
            radius: 4
          }
        },
        autoRotate: true,
        offset: 8
      }
    },
    nodeStateStyles: {
      highlight: {
        stroke: '#e74c3c',
        lineWidth: 4,
        shadowBlur: 20,
        shadowColor: '#e74c3c',
        fill: '#ff8a8a'
      }
    },
    minZoom: 0.3,
    maxZoom: 4
  })

  // 使用 throttle 处理节点点击事件
  let clickThrottle = false
  graph.on('node:click', (evt) => {
    if (clickThrottle) return
    clickThrottle = true
    const node = evt.item.getModel()
    emit('node-click', node)
    setTimeout(() => { clickThrottle = false }, 200)
  })

  renderGraph()
}

// 渲染图谱（优化版）
const renderGraph = () => {
  if (!graph || isRendering) return

  isRendering = true

  try {
    const nodes = props.graphData.nodes.map(node => {
      const baseNode = {
        id: node.id,
        name: node.name,
        type: node.type,
        level: node.level,
        label: node.name,
        size: getNodeSize(node),
        style: getNodeStyle(node),
        hasDetail: node.hasDetail || false,
        parentKey: node.parentKey || null,
        fullName: node.fullName || null,
        detailValue: node.detailValue || null,
        isRegimen: node.isRegimen || false,
        regimenData: node.regimenData || null
      }

      if (node.type === 'attribute' || node.type === 'regimenField') {
        baseNode.labelCfg = {
          style: {
            fill: '#555',
            fontSize: 8,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei, "PingFang SC", Arial, sans-serif'
          },
          position: 'bottom',
          offset: 3
        }
      }

      if (node.type === 'regimen') {
        baseNode.labelCfg = {
          style: {
            fill: '#2c3e50',
            fontSize: 10,
            fontWeight: 'bold',
            fontFamily: 'Microsoft YaHei, "PingFang SC", Arial, sans-serif'
          },
          position: 'bottom',
          offset: 5
        }
      }

      return baseNode
    })

    const edges = props.graphData.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      label: edge.label || '',
      type: 'quadratic',
      curveOffset: (Math.random() - 0.5) * 60,
      style: {
        endArrow: edge.arrow !== false ? {
          path: G6.Arrow.triangle(5, 3, 0),
          fill: '#95a5a6',
          stroke: '#95a5a6'
        } : false
      }
    }))

    graph.data({ nodes, edges })
    graph.render()

    // 延迟执行布局，避免阻塞渲染
    clearTimeout(renderTimer)
    renderTimer = setTimeout(() => {
      try {
        graph.layout()
        setTimeout(() => {
          graph.fitView(30, undefined, undefined, [30, 30, 30, 30])
          isRendering = false
        }, 400)
      } catch (e) {
        isRendering = false
      }
    }, 50)
  } catch (e) {
    console.error('renderGraph error:', e)
    isRendering = false
  }
}

// 监听数据变化（防抖）
watch(() => props.graphData, () => {
  if (graph && !isRendering) {
    clearTimeout(renderTimer)
    renderTimer = setTimeout(() => renderGraph(), 300)
  }
}, { deep: true })

const handleResize = () => {
  if (graph && graphContainer.value && !graph.destroyed) {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight
    if (width > 0 && height > 0) {
      try {
        graph.changeSize(width, height)
        setTimeout(() => graph.fitView(30), 100)
      } catch (e) {}
    }
  }
}

onMounted(() => {
  nextTick(() => createGraph())
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  clearTimeout(renderTimer)
  clearTimeout(focusTimer)
  if (graph) {
    graph.destroy()
    graph = null
  }
  window.removeEventListener('resize', handleResize)
})

defineExpose({ focusNode })
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: radial-gradient(ellipse at 30% 40%, #e8edf5 0%, #dce3ec 100%);
  border-radius: 12px;
  overflow: hidden;
  touch-action: none;
  position: relative;
  box-shadow: inset 0 0 40px rgba(44, 62, 80, 0.04), 0 2px 8px rgba(0,0,0,0.03);
}

.graph-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
      radial-gradient(circle at 25% 40%, rgba(100, 100, 120, 0.015) 1.5px, transparent 1.5px),
      radial-gradient(circle at 75% 80%, rgba(100, 100, 120, 0.015) 1px, transparent 1px);
  background-size: 40px 40px, 25px 25px;
  pointer-events: none;
  z-index: 0;
  border-radius: 12px;
}

.graph-container::after {
  content: '';
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(ellipse at 30% 40%, rgba(64, 158, 255, 0.01) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
</style>