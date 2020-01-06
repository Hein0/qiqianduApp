import Vue from 'vue'
import App from './App'
import * as filters from './static/js/utils/filters'
import config_ from './static/js/config.js'

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.CONFIGAPI = config_
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
