import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import IconTemplate from '@/components/IconTemplate.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/vendor/main.scss'

const app = createApp(App)
app.use(router).mount('#app')
app.use(ElementPlus)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(require.context('@/assets/icons/', true, /\.svg$/))
app.component('IconTemplate', IconTemplate)
