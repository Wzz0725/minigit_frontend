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
