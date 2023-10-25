import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.scss' //引入样式文件
import pinia from '@/stores/store' //引入状态管理
import router from '~/router/index' //引入路由
import elementPlusImportOnDemand from '~/plugins/element-plus' //引入消息组件和图标组件
import vChart from '@/plugins/v-chart'
const app = createApp(App)
app.use(pinia)
app.use(vChart)
app.use(elementPlusImportOnDemand)
app.use(router)
app.mount('#app')
