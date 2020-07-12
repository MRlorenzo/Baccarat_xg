import BigRoad from '../../baccarat/road/BigRoad';
import BigEyeRoad from "../../baccarat/road/monitor/BigEyeRoad";
import SmallRoad from "../../baccarat/road/monitor/SmallRoad";
import CockroachRoad from "../../baccarat/road/monitor/CockroachRoad";

export default {
	install(Vue , options){
		const road = new BigRoad();
		road.addMonitor(new BigEyeRoad());
		road.addMonitor(new SmallRoad());
		road.addMonitor(new CockroachRoad());

		// 调试
		window.road = road;
		Vue.prototype.$road = road;
	}
}