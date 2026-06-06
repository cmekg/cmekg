<template>
  <div class="menu-panel">
    <el-menu :default-active="activeKey" @select="handleMenuSelect" class="menu-tree" :unique-opened="false">
      <template v-for="item in leftMenuConfig" :key="item.key">
        <!-- 有子菜单 -->
        <el-sub-menu v-if="item.children && item.children.length" :index="item.key">
          <template #title>
            <span>{{ item.label }}</span>
          </template>
          <template v-for="child in item.children" :key="child.key">
            <el-sub-menu v-if="child.children && child.children.length" :index="child.key">
              <template #title>
                <span>{{ child.label }}</span>
              </template>
              <el-menu-item v-for="grandChild in child.children" :key="grandChild.key" :index="grandChild.key">
                {{ grandChild.label }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="child.key">
              {{ child.label }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.key">
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

const handleMenuSelect = (index) => {
  activeKey.value = index
  emit('select-item', index)
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
</style>