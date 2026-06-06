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

// 节点颜色配置（从 js 配置中读取）
const getNodeColor = (node) => {
  if (node.level === 1) return graphColors.level1
  if (node.level === 2) return graphColors.level2
  return graphColors.level3
}

// 节点大小配置
const getNodeSize = (node) => {
  if (node.level === 1) return 75
  if (node.level === 2) return 58
  return 48
}

// 节点样式
const getNodeStyle = (node) => {
  const baseStyle = {
    fill: getNodeColor(node),
    stroke: '#fff',
    lineWidth: 2.5,
    shadowBlur: 15,
    shadowColor: 'rgba(0,0,0,0.25)',
    cursor: 'pointer',
    opacity: 0.95
  }

  if (node.level === 1) {
    return {
      ...baseStyle,
      stroke: '#fff',
      lineWidth: 3.5,
      shadowBlur: 20,
      shadowColor: 'rgba(231, 76, 60, 0.3)'
    }
  }
  if (node.level === 2) {
    return {
      ...baseStyle,
      stroke: '#f0f0f0',
      lineWidth: 2.5,
      shadowBlur: 12,
      shadowColor: 'rgba(52, 152, 219, 0.25)'
    }
  }
  return baseStyle
}

// 聚焦某个节点（居中并高亮）
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

    const model = node.getModel()
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
      nodeSize: 90,
      linkDistance: 280,
      nodeSpacing: 150,
      force: {
        repulsion: 1200,
        gravity: 0.05,
        edgeStrength: 0.7,
        nodeStrength: 0.6,
        alpha: 0.8,
        alphaMin: 0.01,
        alphaDecay: 0.02,
        velocityDecay: 0.4
      }
    },
    defaultNode: {
      type: 'circle',
      labelCfg: {
        style: {
          fill: '#2c3e50',
          fontSize: 13,
          fontWeight: 'bold',
          fontFamily: 'Microsoft YaHei, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
          textShadow: '0 1px 1px rgba(255,255,255,0.5)'
        },
        position: 'bottom',
        offset: 10
      }
    },
    defaultEdge: {
      type: 'line',
      style: {
        stroke: '#95a5a6',
        lineWidth: 2,
        lineAppendWidth: 4,
        lineDash: []
      },
      labelCfg: {
        style: {
          fill: '#7f8c8d',
          fontSize: 10,
          fontWeight: 'normal',
          background: {
            fill: 'rgba(255,255,255,0.9)',
            padding: [2, 6, 2, 6],
            radius: 12,
            shadowBlur: 4,
            shadowColor: 'rgba(0,0,0,0.1)'
          }
        },
        autoRotate: true,
        offset: 15
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
      label: edge.label || '',
      style: {
        endArrow: edge.arrow !== false ? {
          path: G6.Arrow.triangle(10, 8, 0),
          fill: '#95a5a6',
          stroke: '#95a5a6'
        } : false
      }
    }))

    graph.data({ nodes, edges })
    graph.render()

    setTimeout(() => {
      try {
        graph.layout()
        setTimeout(() => {
          graph.fitView(40, undefined, undefined, [40, 40, 40, 40])
        }, 900)
      } catch (e) {}
    }, 100)
  } catch (e) {
    console.error('renderGraph error:', e)
  } finally {
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
  box-shadow: inset 0 0 60px rgba(44, 62, 80, 0.08), 0 4px 20px rgba(0,0,0,0.05);
}

/* 添加装饰性网格点阵 */
.graph-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
      radial-gradient(circle at 25% 40%, rgba(100, 100, 120, 0.03) 2px, transparent 2px),
      radial-gradient(circle at 75% 80%, rgba(100, 100, 120, 0.03) 1.5px, transparent 1.5px);
  background-size: 40px 40px, 25px 25px;
  pointer-events: none;
  z-index: 0;
  border-radius: 12px;
}

/* 光晕效果 */
.graph-container::after {
  content: '';
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(ellipse at 30% 40%, rgba(64, 158, 255, 0.02) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
</style>