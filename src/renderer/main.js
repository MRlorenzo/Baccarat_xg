import Vue from 'vue'

import App from './App'
import AngleEyeHelper from '../port/AngleEyeHelper';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.prototype.$helper = new AngleEyeHelper(undefined);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
