import Vue from 'vue'
import Router from 'vue-router'

import Field from './views/text_field.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    name: 'Field',
    path: '/field',
    component: Field,
  }],
})
