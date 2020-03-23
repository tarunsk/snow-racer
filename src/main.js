import Vue from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
require('./style/style.css')
require('./assets/img/toboggan.png')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
