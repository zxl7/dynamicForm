import Vue from 'vue'
import Router from 'vue-router'

import TextField from './views/text_field.vue'
import Fields from './views/fields.vue'
import fieldsDev from './views/fieldsDev.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'TextField',
      path: '/text-field',
      component: TextField,
    },
    {
      name: 'Fields',
      path: '/fields',
      component: Fields,
    },
    {
      name: 'fieldsDev',
      path: '/fieldsDev',
      component: fieldsDev,
    },
  ],
})
