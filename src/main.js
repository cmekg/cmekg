import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 只在移动端或开发环境启用 vConsole
import VConsole from 'vconsole'
new VConsole()

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')