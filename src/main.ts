import { createApp } from 'vue'
import './assets/global.css'

import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

import { router } from '@/router/router.ts'

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app')
