import Vue from 'vue'
import AngleEye from './plugins/AngleEye';
import RoadMonitor from './plugins/RoadMonitor';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/*注意顺序，（APP里面覆盖了element-ui的部分样式，后引用的style优先级更高）*/
import App from './App'
import i18n from '../utils/lang';

Vue.use(ElementUI);

// 路单控制中心。
Vue.use(RoadMonitor);

// 天使靴操作助手
Vue.use(AngleEye);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    components: {App},
    i18n,
    template: '<App/>'
}).$mount('#app')
