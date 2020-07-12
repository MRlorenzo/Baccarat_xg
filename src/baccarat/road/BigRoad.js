import Road from "./Road";
import BResult from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";
import RoadMonitor from "./monitor/RoadMonitor";
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
	}

	pop(){
		const games = super.games;
		if (games === 1){
			// 只有一个结果的时候开启新的一局
			this.newGame();
		} else {
			const point = super.pop();
			// 非和局
			if (point.getTie().length === 0){
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
		let result = BaccaratResult.getResult( BResult.B );
		return this.testPush(result , name);
	}

	// 预测开闲
	testPushPlayer( name ){
		let result = BaccaratResult.getResult( BResult.P );
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
			return super.nextPoint(rs);
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
		result.BigRoad = [...this.getResults()];

		for (const name of this.monitorMap.keys()){
			const pointList = this.getResults(name);

			result[name] = [...pointList];

			nextTest[name] = {
				banker: this.testPushBanker(name),
				player: this.testPushPlayer(name)
			}
		}

		return { result , nextTest};
	}
}