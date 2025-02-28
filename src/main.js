import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueLazyload from 'vue-lazyload'
import router from './router/index'

createApp(App)
.use(router)
.use(autoAnimatePlugin)
.mount('#app')

