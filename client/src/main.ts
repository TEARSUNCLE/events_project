import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/antd.css'
import './assets/css/index.less'
import '@/utils/permission'
import 'dayjs/locale/zh-cn'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import piniaPluginPersist from 'pinia-plugin-persist'
import globalDefine from '@/config/globalDefine'

const app = createApp(App)
app.config.globalProperties.config = globalDefine
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(router).use(Antd).use(pinia).mount('#app')