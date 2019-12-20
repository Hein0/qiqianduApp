import Vue from 'vue'
import App from './App'
import * as filters from './static/js/utils/filters'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
