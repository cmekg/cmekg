<template>
  <div class="menu-panel">
    <!-- 搜索框 -->
    <div class="search-box">
      <el-input
          v-model="searchText"
          placeholder="搜索药品..."
          prefix-icon="Search"
          clearable
          size="default"
          @input="handleSearch"
      />
      <div v-if="searchText && searchResults.length" class="search-results">
        <div class="search-results-title">搜索结果 ({{ searchResults.length }})</div>
        <div
            v-for="item in searchResults"
            :key="item.key"
            class="search-result-item"
            @click="handleResultClick(item)"
        >
          <span class="result-name">{{ item.name }}</span>
          <span class="result-path">{{ item.path }}</span>
        </div>
      </div>
    </div>

    <!-- 菜单树 -->
    <el-menu
        :default-active="activeKey"
        class="menu-tree"
        :unique-opened="false"
        :collapse="false"
    >
      <template v-for="item in filteredMenuConfig" :key="item.key">
        <!-- 有子菜单的一级菜单 -->
        <el-sub-menu v-if="item.children && item.children.length" :index="item.key">
          <template #title>
            <span @click="handleItemClick(item.key)">{{ item.label }}</span>
          </template>
          <template v-for="child in item.children" :key="child.key">
            <el-sub-menu v-if="child.children && child.children.length" :index="child.key">
              <template #title>
                <span @click="handleItemClick(child.key)">{{ child.label }}</span>
              </template>
              <el-menu-item v-for="grandChild in child.children" :key="grandChild.key" :index="grandChild.key" @click="handleItemClick(grandChild.key)">
                {{ grandChild.label }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="child.key" @click="handleItemClick(child.key)">
              {{ child.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.key" @click="handleItemClick(item.key)">
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { leftMenuConfig } from '@/data/mockData'

const emit = defineEmits(['select-item'])
const activeKey = ref('definition')
const searchText = ref('')
const searchResults = ref([])

// 递归获取所有菜单项（扁平化）
const getAllMenuItems = () => {
  const items = []
  const traverse = (node, path = '') => {
    const currentPath = path ? `${path} > ${node.label}` : node.label
    items.push({
      key: node.key,
      name: node.label,
      path: currentPath,
      level: node.children ? 1 : (node.parent ? 2 : 1)
    })
    if (node.children) {
      node.children.forEach(child => traverse(child, currentPath))
    }
  }
  leftMenuConfig.forEach(item => traverse(item))
  return items
}

const allMenuItems = getAllMenuItems()

// 搜索处理
const handleSearch = () => {
  if (!searchText.value.trim()) {
    searchResults.value = []
    return
  }
  const keyword = searchText.value.toLowerCase()
  searchResults.value = allMenuItems.filter(item =>
      item.name.toLowerCase().includes(keyword)
  )
}

// 点击搜索结果
const handleResultClick = (item) => {
  searchText.value = ''
  searchResults.value = []
  handleItemClick(item.key)
}

// 递归过滤菜单（只显示匹配的项）
const filteredMenuConfig = computed(() => {
  if (!searchText.value) return leftMenuConfig

  const keyword = searchText.value.toLowerCase()

  const filterItems = (items) => {
    const result = []
    for (const item of items) {
      // 检查当前项是否匹配
      const matches = item.label.toLowerCase().includes(keyword)

      // 递归过滤子项
      let filteredChildren = []
      if (item.children && item.children.length) {
        filteredChildren = filterItems(item.children)
      }

      // 如果当前项匹配或有匹配的子项，则保留
      if (matches || filteredChildren.length > 0) {
        result.push({
          ...item,
          children: filteredChildren.length ? filteredChildren : item.children
        })
      }
    }
    return result
  }

  return filterItems(leftMenuConfig)
})

const handleItemClick = (key) => {
  activeKey.value = key
  emit('select-item', key)
}
</script>

<style scoped>
.menu-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden;
}

.search-box {
  padding: 12px;
  border-bottom: 1px solid #e4e7ed;
  position: relative;
}

.menu-tree {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: none;
  height: 100%;
}

/* 搜索结果下拉框 */
.search-results {
  position: absolute;
  top: 100%;
  left: 12px;
  right: 12px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.search-results-title {
  padding: 8px 12px;
  font-size: 12px;
  color: #909399;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.search-result-item {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.search-result-item:hover {
  background-color: #ecf5ff;
}

.result-name {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.result-path {
  display: block;
  font-size: 11px;
  color: #909399;
  margin-top: 2px;
}

/* 一级菜单样式 */
:deep(.el-sub-menu .el-sub-menu__title) {
  padding-left: 20px !important;
  font-weight: bold;
  background-color: #fff;
}

:deep(.el-menu-item) {
  padding-left: 20px !important;
  font-weight: bold;
}

:deep(.el-menu--inline .el-menu-item) {
  padding-left: 40px !important;
  font-weight: normal;
}

:deep(.el-menu--inline .el-sub-menu .el-sub-menu__title) {
  padding-left: 40px !important;
  font-weight: normal;
  background-color: #fafafa;
}

:deep(.el-menu--inline .el-sub-menu .el-menu-item) {
  padding-left: 60px !important;
  font-weight: normal;
  background-color: #f5f7fa;
}

:deep(.el-menu-item:hover) {
  background-color: #ecf5ff;
}

:deep(.el-menu-item.is-active) {
  color: #409eff;
  background-color: #ecf5ff;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #ecf5ff;
}

.el-sub-menu__title span {
  cursor: pointer;
  flex: 1;
}
</style>