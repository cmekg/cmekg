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
  if (node.level === 1) return 60
  if (node.level === 2) return 50
  return 45
}

const getNodeStyle = (node) => {
  return {
    fill: getNodeColor(node),
    stroke: '#fff',
    lineWidth: 2,
    shadowBlur: 5,
    shadowColor: 'rgba(0,0,0,0.2)'
  }
}

// 聚焦某个节点（居中并高亮）
// 聚焦某个节点（居中并高亮）
const focusNode = (nodeId) => {
  if (!graph) {
    console.warn('graph 未初始化')
    return
  }

  // 等待图谱渲染稳定后再聚焦
  const tryFocus = () => {
    let node = null

    // 尝试通过 ID 查找
    try {
      node = graph.findById(nodeId)
    } catch (e) {
      console.warn('findById 失败', e)
    }

    // 如果找不到，遍历所有节点匹配 ID 或 name
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
      console.warn('未找到节点:', nodeId)
      // 如果找不到，可能是节点还没渲染完成，再试一次
      setTimeout(tryFocus, 300)
      return
    }

    const model = node.getModel()

    // 清除之前的高亮
    const nodes = graph.getNodes()
    nodes.forEach(n => {
      graph.setItemState(n, 'highlight', false)
    })

    // 高亮当前节点
    graph.setItemState(node, 'highlight', true)

    // 使用 focusItem 方法
    try {
      graph.focusItem(node, true, {
        easing: 'easeCubic',
        duration: 500,
        animate: true
      })
    } catch (e) {
      console.warn('focusItem 失败，尝试手动聚焦', e)
      // 备选方案：手动移动画布
      const width = graph.getWidth()
      const height = graph.getHeight()
      const group = graph.getGroup()
      const matrix = group.getMatrix()
      const zoom = matrix ? matrix[0] : 1

      // 计算目标偏移
      const targetX = width / 2 / zoom - model.x
      const targetY = height / 2 / zoom - model.y

      graph.moveTo(targetX, targetY)
    }
  }

  // 延迟执行，确保画布稳定
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
        style: { fill: '#333', fontSize: 12, fontWeight: 'bold' },
        position: 'bottom',
        offset: 0
      }
    },
    defaultEdge: {
      type: 'line',
      style: { stroke: '#aaa', lineWidth: 1.5 },
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
      label: edge.label || '',
      style: {
        endArrow: edge.arrow !== false
      }
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