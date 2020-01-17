import Vue from 'vue'
import App from './App'
import * as filters from './static/js/utils/filters'
import Tools from './static/js/utils/Tools.js'
import Queue from './static/js/utils/queue.js'
import config_ from './static/js/utils/config.js'

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$tools = Tools
Vue.prototype.$queue = Queue
Vue.prototype.CONFIGAPI = config_
Vue.prototype.$url = Vue.prototype.$tools.config.apiUrl
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
