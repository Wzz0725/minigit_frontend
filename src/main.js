import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'//导入样式

import '@/permission'
//导入时间相关的东西
import relativeTime from 'dayjs/plugin/relativeTime';
// 国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

//导入Material Design Icons
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'

//导入highlight组件
import VueHighlightJS from 'vue-highlightjs'
import "highlight.js/styles/github.css";
Vue.use(VueHighlightJS);


// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

import axios from 'axios'
axios.defaults.withCredentials=true

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
