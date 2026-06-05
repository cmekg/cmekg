<template>
  <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
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

const initGraph = () => {
  if (!graphContainer.value) return

  const width = graphContainer.value.scrollWidth || 800
  const height = graphContainer.value.scrollHeight || 600

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
      linkDistance: 150,
      nodeSpacing: 80
    },
    defaultNode: {
      type: 'circle',
      size: 50,
      labelCfg: {
        style: { fill: '#333', fontSize: 12 },
        position: 'bottom',
        offset: 0
      }
    },
    defaultEdge: {
      type: 'line',
      style: { stroke: '#aaa', lineWidth: 2, endArrow: true },
      labelCfg: { style: { fill: '#666', fontSize: 10 }, autoRotate: true }
    },
    minZoom: 0.1,
    maxZoom: 10
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
    graph.clear()

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

    graph.data({ nodes, edges })
    graph.render()

    setTimeout(() => {
      try {
        if (graph && !graph.destroyed) {
          graph.fitView(20)
        }
      } catch (e) {
        // 静默处理 fitView 错误
      }
    }, 100)
  } catch (e) {
    console.error('renderGraph error:', e)
  } finally {
    isRendering = false
  }
}

// 监听数据变化
watch([() => props.graphData.nodes.length, () => props.graphData.edges.length], ([newNodesLen, newEdgesLen], [oldNodesLen, oldEdgesLen]) => {
  if (graph && !isRendering) {
    if (newNodesLen !== oldNodesLen || newEdgesLen !== oldEdgesLen) {
      renderGraph()
    }
  }
})

const handleResize = () => {
  if (graph && graphContainer.value && !graph.destroyed) {
    const width = graphContainer.value.scrollWidth
    const height = graphContainer.value.scrollHeight
    try {
      graph.changeSize(width, height)
      graph.fitView(20)
    } catch (e) {
      // 静默处理
    }
  }
}

onMounted(() => {
  initGraph()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (graph) {
    graph.destroy()
    graph = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
}
</style>