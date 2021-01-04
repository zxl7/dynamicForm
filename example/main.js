import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@byzanteam/vis-components/dist/index.css'
// import '@byzanteam/slp-fields/dist/index.css'
import 'vant/lib/index.css'
import 'iview/dist/styles/iview.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
