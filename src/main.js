import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
