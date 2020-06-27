import Vue from 'vue'
import App from './App'
import AngleEye from './plugins/AngleEye';
import RoadMonitor from './plugins/RoadMonitor';

// 路单控制中心。
Vue.use(RoadMonitor);

// 天使靴操作助手
Vue.use(AngleEye);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    components: {App},
    template: '<App/>'
}).$mount('#app')
