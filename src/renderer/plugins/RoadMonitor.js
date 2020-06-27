import BigRoad from '../../baccarat/road/BigRoad';
import BigEyeRoad from "../../baccarat/road/impl/BigEyeRoad";
import SmallRoad from "../../baccarat/road/impl/SmallRoad";
import CockroachRoad from "../../baccarat/road/impl/CockroachRoad";

export default {
	install(Vue , options){
		const road = new BigRoad();
		road.addMonitor(new BigEyeRoad() , "BigEyeRoad");
		road.addMonitor(new SmallRoad() , "SmallRoad");
		road.addMonitor(new CockroachRoad(), "CockroachRoad");

		// 调试
		window.road = road;
		Vue.prototype.$road = road;
	}
}