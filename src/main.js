import Vue from 'vue'
import App from './App.vue'
import VueCollision from 'vue-collision'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
require('./style/style.css')
require('./assets/img/toboggan.png')

export const eventBus = new Vue();

Vue.config.productionTip = false
// collision
Vue.use(VueCollision, { globalTriggers: ['resize', 'scroll'] })

new Vue({
  render: h => h(App),
}).$mount('#app')
