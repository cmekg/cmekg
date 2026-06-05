<template>
  <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import G6 from '@antv/g6'
import { entityColors } from '@/data/mockData'

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

const getNodeStyle = (type) => {
  return {
    fill: entityColors[type] || '#999',
    stroke: '#fff',
    lineWidth: 2
  }
}

// 获取触摸点下的节点
const getNodeAtPosition = (clientX, clientY) => {
  if (!graph) return null

  const canvas = graphContainer.value?.querySelector('canvas')
  if (!canvas) return null

  const rect = canvas.getBoundingClientRect()
  const canvasX = clientX - rect.left
  const canvasY = clientY - rect.top

  const nodes = graph.getNodes()
  let minDistance = 100
  let closestNode = null

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const model = node.getModel()

    try {
      const screenPos = graph.getClientByPoint(model.x, model.y)
      if (screenPos) {
        const dx = canvasX - screenPos.x
        const dy = canvasY - screenPos.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < minDistance) {
          minDistance = distance
          closestNode = node
        }
      }
    } catch (e) {}
  }

  if (closestNode && minDistance < 100) {
    const model = closestNode.getModel()
    console.log('✅ 命中节点:', model.name, '距离:', minDistance.toFixed(2))
    return model
  }

  return null
}

// 绑定触摸事件
const bindTouchEvents = () => {
  const canvas = graphContainer.value?.querySelector('canvas')
  if (!canvas) {
    setTimeout(bindTouchEvents, 500)
    return
  }

  console.log('✅ 绑定触摸事件')

  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const node = getNodeAtPosition(touch.clientX, touch.clientY)
    if (node) {
      emit('node-click', node)
    }
  }

  canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
}

// 聚焦某个节点（居中并高亮）
const focusNode = (nodeId) => {
  if (!graph) return

  const node = graph.findById(nodeId)
  if (!node) return

  // 使用 G6 内置的 focusItem 方法，自动居中
  try {
    graph.focusItem(node, true, {
      easing: 'easeCubic',
      duration: 500,
      animate: true
    })
  } catch (e) {
    console.log('focusItem 失败，尝试手动聚焦')
    // 备选方案：获取节点位置手动移动
    const model = node.getModel()
    const width = graph.getWidth()
    const height = graph.getHeight()
    graph.moveTo(width / 2 - model.x, height / 2 - model.y)
  }

  // 高亮节点
  graph.setItemState(node, 'highlight', true)

  // 3秒后取消高亮
  setTimeout(() => {
    if (graph && !graph.destroyed) {
      graph.setItemState(node, 'highlight', false)
    }
  }, 3000)

  const model = node.getModel()
  console.log('🎯 聚焦节点:', model.name)
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
      linkDistance: 200,
      nodeSpacing: 100
    },
    defaultNode: {
      type: 'circle',
      size: 40,
      labelCfg: {
        style: { fill: '#333', fontSize: 11 },
        position: 'bottom',
        offset: 0
      }
    },
    defaultEdge: {
      type: 'line',
      style: { stroke: '#aaa', lineWidth: 1.5, endArrow: true },
      labelCfg: { style: { fill: '#666', fontSize: 9 }, autoRotate: true }
    },
    // 节点高亮样式
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

  window.__g6_graph = graph

  renderGraph()
  setTimeout(bindTouchEvents, 1000)
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
      label: node.name,
      style: getNodeStyle(node.type)
    }))

    const edges = props.graphData.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      label: edge.label || ''
    }))

    console.log('渲染节点数:', nodes.length, '边数:', edges.length)

    graph.data({ nodes, edges })
    graph.render()

    setTimeout(() => {
      try {
        graph.layout()

        setTimeout(() => {
          graph.fitCenter()
          graph.zoomTo(0.8)

          setTimeout(() => {
            if (window.__g6_graph) {
              bindTouchEvents()
            }
            console.log('布局完成，视图已居中')
          }, 300)
        }, 800)
      } catch (e) {
        console.error('layout error:', e)
      }
    }, 100)
  } catch (e) {
    console.error('renderGraph error:', e)
  } finally {
    isRendering = false
  }
}

// 监听数据变化
watch([() => props.graphData.nodes.length, () => props.graphData.edges.length], () => {
  if (graph && !isRendering) {
    createGraph()
  }
})

const handleResize = () => {
  if (graph && graphContainer.value && !graph.destroyed) {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight
    if (width > 0 && height > 0) {
      try {
        graph.changeSize(width, height)
        graph.fitView(20)
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

// 暴露方法给父组件
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