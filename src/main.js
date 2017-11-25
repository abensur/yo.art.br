import Vue from 'vue'
import VueFire from 'vuefire'

import App from '@/App'
import store from '@/store'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import DataTables from 'vue-data-tables'
import 'bulma'

Vue.use(VueFire)
Vue.use(ElementUI)
Vue.use(DataTables)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
