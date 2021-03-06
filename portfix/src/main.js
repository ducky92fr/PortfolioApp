// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import AsyncComputed from 'vue-async-computed'


// CSS
import 'bulma/css/bulma.css'
import('../node_modules/vuetify/dist/vuetify.min.css')

require('offline-plugin/runtime').install()

Vue.use(AsyncComputed)
Vue.use(Vuetify)

Vue.component('detectNetwork', require('v-offline')
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
