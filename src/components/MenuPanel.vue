<template>
  <div class="menu-panel">
    <el-menu :default-active="activeKey" class="menu-tree" :unique-opened="false">
      <template v-for="item in leftMenuConfig" :key="item.key">
        <!-- 有子菜单的一级菜单 -->
        <el-sub-menu v-if="item.children && item.children.length" :index="item.key">
          <template #title>
            <span @click="handleItemClick(item.key)">{{ item.label }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="child in item.children" :key="child.key">
            <!-- 如果二级菜单还有子菜单（三级） -->
            <el-sub-menu v-if="child.children && child.children.length" :index="child.key">
              <template #title>
                <span @click="handleItemClick(child.key)">{{ child.label }}</span>
              </template>
              <!-- 三级菜单 -->
              <el-menu-item v-for="grandChild in child.children" :key="grandChild.key" :index="grandChild.key" @click="handleItemClick(grandChild.key)">
                {{ grandChild.label }}
              </el-menu-item>
            </el-sub-menu>
            <!-- 二级菜单（无子菜单） -->
            <el-menu-item v-else :index="child.key" @click="handleItemClick(child.key)">
              {{ child.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <!-- 无子菜单的一级菜单 -->
        <el-menu-item v-else :index="item.key" @click="handleItemClick(item.key)">
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { leftMenuConfig } from '@/data/mockData'

const emit = defineEmits(['select-item'])
const activeKey = ref('definition')

const handleItemClick = (key) => {
  activeKey.value = key
  emit('select-item', key)
}
</script>

<style scoped>
.menu-panel {
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}

.menu-tree {
  border-right: none;
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

/* 二级菜单样式 */
:deep(.el-menu--inline .el-menu-item) {
  padding-left: 40px !important;
  font-weight: normal;
}

/* 三级菜单样式 */
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

/* 让 span 可点击 */
.el-sub-menu__title span {
  cursor: pointer;
  flex: 1;
}
</style>