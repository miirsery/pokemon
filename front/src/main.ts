import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import IconTemplate from '@/components/IconTemplate.vue'

const app = createApp(App)
app.use(router).mount('#app')

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(require.context('@/assets/icons/', true, /\.svg$/))
app.component('IconTemplate', IconTemplate)
