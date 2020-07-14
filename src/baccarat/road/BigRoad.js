import Road from "./Road";
import RoadMonitor from "./monitor/RoadMonitor";
import log from '../../utils/log';
import { fix , red , blue ,isDev} from "./utils";

export default class BigRoad extends Road {
	constructor(){
		super();
		this.monitorMap = new Map();
	}

	push( rs ){
		const point = super.push(rs);
		// 非和局
		if (!rs.isT()){
			this.executeMonitor('push', point);
		}
		return point;
	}

	pop(){
		const games = this.games;
		if (games === 1){
			// 只有一个结果的时候开启新的一局
			this.newGame();
		} else {
			const point = super.pop();
			// 非和局(point被删除后resultId被置空)
			if (point.getResultId() == null){
				this.executeMonitor('pop' , point);
			}
		}
	}

	newGame(){
		super.newGame();
		this.executeMonitor('newGame');
	}

	// 添加监视器
	addMonitor(monitor){
		if (monitor instanceof RoadMonitor){
			this.monitorMap.set(monitor.getName() , monitor);
		}
	}

	// 执行所有的监视器
	executeMonitor( method, arg ){
		for (const monitor of this.monitorMap.values()){
			monitor.invoke(method , this, arg);
		}
	}

	// 预测开庄
	testPushBanker(name){
		let result = red();
		return this.testPush(result , name);
	}

	// 预测开闲
	testPushPlayer( name ){
		let result = blue();
		return this.testPush(result , name);
	}

	/**
	 * 测试开出某个结果,
	 * 如果是monitor，返回相应规则的结果(庄/闲)
	 * 否则返回在此‘大路’对应的点
	 * @param rs
	 * @param name
	 */
    testPush(rs, name){
		if (name){
			// 返回BaccaratResult
			const monitor = this.monitorMap.get(name);
			if (monitor != null){
				return monitor.invoke('testPush' , this, rs);
			}
		}else{
			// 返回Point
			return super.nextPoint(rs , true);
		}
	}

    getResults(name){
		if (name){
			const monitor = this.monitorMap.get(name);
			if (monitor != null){
				return monitor.invoke('getResults');
			}
		}
		return this.pointList;
	}

	updateResult(){
		const result = {} , nextTest = {};
		result.BigRoad = this.getResults();
		for (const name of this.monitorMap.keys()){
			const pointList = this.getResults(name);

			result[name] = [...pointList];

			const bankerRS = this.testPushBanker(name);
			let playerRS = this.testPushPlayer(name);

			if (bankerRS && playerRS){
				if (bankerRS.getResult() === playerRS.getResult()){

					if (isDev){
                        log.error(`${name}逻辑错误!!`);
					}
                    // 在生产环境中不要将该逻辑错误展示给用户，手动修改它。
                    else{
                        playerRS = fix(bankerRS);
                    }
				}
			}
			nextTest[name] = {
				banker: bankerRS,
				player: playerRS
			}
		}
		return { result , nextTest};
	}
}