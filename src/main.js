// 
// 主入口文件（main.js）
// 该文件是 Vue 3 应用的入口文件，负责创建 Vue 实例并加载全局依赖。
// 主要功能：
// 1. 引入样式文件和根组件（App.vue）
// 2. 配置并使用 Vue Router 和 Pinia 状态管理
// 3. 注册 Element Plus 图标组件
// 4. 配置 ECharts 图表组件
//

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'


// 创建并挂载 Vue 应用
const app = createApp(App)

// 注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用 Pinia 状态管理
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)//使用数据持久化插件
app.use(pinia)

// 配置 Vue Router
app.use(router)

// 挂载应用到 DOM
app.mount('#app')
