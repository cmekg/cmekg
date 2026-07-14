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

// 节点颜色配置
const getNodeColor = (node) => {
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

// 节点大小配置（保持原有大小）
const getNodeSize = (node) => {
  if (node.type === 'attribute') return 32
  if (node.hasDetail) return 58
  if (node.level === 1) return 75
  if (node.level === 2) return 58
  return 45
}

// 节点样式
const getNodeStyle = (node) => {
  const baseStyle = {
    fill: getNodeColor(node),
    stroke: '#fff',
    lineWidth: 2.5,
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.15)',
    cursor: 'pointer',
    opacity: 0.95
  }

  if (node.type === 'attribute') {
    return {
      ...baseStyle,
      stroke: '#9575CD',
      lineWidth: 1.5,
      shadowBlur: 5,
      shadowColor: 'rgba(0,0,0,0.08)',
      lineDash: [3, 3]
    }
  }

  if (node.hasDetail) {
    return {
      ...baseStyle,
      stroke: '#ffd700',
      lineWidth: 3.5,
      shadowBlur: 15,
      shadowColor: 'rgba(255, 215, 0, 0.3)'
    }
  }

  if (node.level === 1) {
    return {
      ...baseStyle,
      stroke: '#fff',
      lineWidth: 3.5,
      shadowBlur: 15,
      shadowColor: 'rgba(231, 76, 60, 0.2)'
    }
  }
  if (node.level === 2) {
    return {
      ...baseStyle,
      stroke: '#f0f0f0',
      lineWidth: 2.5,
      shadowBlur: 10,
      shadowColor: 'rgba(52, 152, 219, 0.15)'
    }
  }
  return baseStyle
}

const focusNode = (nodeId) => {
  if (!graph) return

  const tryFocus = () => {
    let node = null
    try {
      node = graph.findById(nodeId)
    } catch (e) {}

    if (!node) {
      const nodes = graph.getNodes()
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const model = n.getModel()
        if (model.id === nodeId || model.name === nodeId) {
          node = n
          break
        }
      }
    }

    if (!node) {
      setTimeout(tryFocus, 300)
      return
    }

    const nodes = graph.getNodes()
    nodes.forEach(n => {
      graph.setItemState(n, 'highlight', false)
    })
    graph.setItemState(node, 'highlight', true)

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
      const group = graph.getGroup()
      const matrix = group.getMatrix()
      const zoom = matrix ? matrix[0] : 1
      graph.moveTo(width / 2 / zoom - model.x, height / 2 / zoom - model.y)
    }
  }
  setTimeout(tryFocus, 300)
}

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
      linkDistance: 250,
      nodeSpacing: 100,
      force: {
        repulsion: 800,
        gravity: 0.06,
        edgeStrength: 0.6,
        nodeStrength: 0.5,
        alpha: 0.7,
        alphaMin: 0.015,
        alphaDecay: 0.03,
        velocityDecay: 0.45
      }
    },
    defaultNode: {
      type: 'circle',
      labelCfg: {
        style: {
          fill: '#2c3e50',
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Microsoft YaHei, "PingFang SC", Arial, sans-serif'
        },
        position: 'bottom',
        offset: 8
      }
    },
    defaultEdge: {
      type: 'quadratic',
      style: {
        stroke: '#95a5a6',
        lineWidth: 1.5,
        lineAppendWidth: 3
      },
      labelCfg: {
        style: {
          fill: '#7f8c8d',
          fontSize: 9,
          fontWeight: 'normal',
          background: {
            fill: 'rgba(255,255,255,0.85)',
            padding: [1, 4, 1, 4],
            radius: 8
          }
        },
        autoRotate: true,
        offset: 10
      }
    },
    nodeStateStyles: {
      highlight: {
        stroke: '#e74c3c',
        lineWidth: 5,
        shadowBlur: 25,
        shadowColor: '#e74c3c',
        fill: '#ff8a8a'
      }
    },
    minZoom: 0.2,
    maxZoom: 5
  })

  graph.on('node:click', (evt) => {
    const node = evt.item.getModel()
    emit('node-click', node)
  })

  renderGraph()
}

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
        detailValue: node.detailValue || null
      }

      if (node.type === 'attribute') {
        baseNode.labelCfg = {
          style: {
            fill: '#555',
            fontSize: 9,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei, "PingFang SC", Arial, sans-serif'
          },
          position: 'bottom',
          offset: 4
        }
      }

      return baseNode
    })

    const edges = props.graphData.edges.map(edge => {
      const curveOffset = (Math.random() - 0.5) * 80

      return {
        source: edge.source,
        target: edge.target,
        label: edge.label || '',
        type: 'quadratic',
        curveOffset: curveOffset,
        style: {
          endArrow: edge.arrow !== false ? {
            path: G6.Arrow.triangle(6, 4, 0),
            fill: '#95a5a6',
            stroke: '#95a5a6'
          } : false
        }
      }
    })

    graph.data({ nodes, edges })
    graph.render()

    // 使用 requestAnimationFrame 优化布局
    requestAnimationFrame(() => {
      try {
        graph.layout()
        setTimeout(() => {
          graph.fitView(40, undefined, undefined, [40, 40, 40, 40])
          isRendering = false
        }, 600)
      } catch (e) {
        isRendering = false
      }
    })
  } catch (e) {
    console.error('renderGraph error:', e)
    isRendering = false
  }
}

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
        setTimeout(() => graph.fitView(40), 100)
      } catch (e) {}
    }
  }
}

onMounted(() => {
  nextTick(() => createGraph())
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
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
  box-shadow: inset 0 0 60px rgba(44, 62, 80, 0.06), 0 2px 12px rgba(0,0,0,0.04);
}

.graph-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
      radial-gradient(circle at 25% 40%, rgba(100, 100, 120, 0.02) 2px, transparent 2px),
      radial-gradient(circle at 75% 80%, rgba(100, 100, 120, 0.02) 1.5px, transparent 1.5px);
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
  background: radial-gradient(ellipse at 30% 40%, rgba(64, 158, 255, 0.015) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
</style>