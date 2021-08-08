import Vue from 'vue'
import Router from 'vue-router'
import fieldsDev from './views/fieldsDev.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'fieldsDev',
      path: '/fieldsDev',
      component: fieldsDev,
    },
  ],
})
