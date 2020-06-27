import Vue from 'vue'
import App from './App'
import AngleEye from './plugins/AngleEye';
import BigRoad from '../baccarat/road/BigRoad';
import BigEyeRoad from "../baccarat/road/impl/BigEyeRoad";
import SmallRoad from "../baccarat/road/impl/SmallRoad";
import CockroachRoad from "../baccarat/road/impl/CockroachRoad";
import BResult from '../baccarat/result/BResult';
window.BResult = BResult;
const road = new BigRoad();
road.addMonitor(new BigEyeRoad() , "BigEyeRoad");
road.addMonitor(new SmallRoad() , "SmallRoad");
road.addMonitor(new CockroachRoad(), "CockroachRoad");
// 调试
window.road = road;
Vue.prototype.$road = road;

Vue.use(AngleEye);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    components: {App},
    template: '<App/>'
}).$mount('#app')
