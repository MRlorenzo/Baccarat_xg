import Road from "./Road";
import BResult from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";
export default class BigRoad extends Road {
	constructor(){
		super();
		this.monitorMap = {};
	}

	push( rs ){
		const point = super.push(rs);

		this.executeMonitor('push', point);
	}

	pop(){
		const games = super.games;
		if (games === 1){
			// 只有一个结果的时候开启新的一局
			this.newGame();
		} else {
			const point = super.pop();
			this.executeMonitor('pop' , point);
		}
	}

	newGame(){
		super.newGame();
		this.executeMonitor('newGame');
	}

	addMonitor(monitor , name){
		this.monitorMap[name] = monitor;
	}

	executeMonitor( method, arg ){
		Object.values(this.monitorMap).forEach(m=>{
			m[method](this , arg);
		});
	}

	testPushBanker(name){
		let result = BaccaratResult.getResult( BResult.B );
		return this.testPush(result , name);
	}

	testPushPlayer( name ){
		let result = BaccaratResult.getResult( BResult.P );
		return this.testPush(result , name);
	}

	/**
	 * 测试开出某个结果,
	 * 如果是monitor，返回相应规则的结果(庄/闲)
	 * 否则返回在此‘大路’对应的点
	 * @param e
	 * @param name
	 */
    testPush(e, name){
		if (name){
			// 返回BaccaratResult
			return this.monitorMap[name].testPush(this, e);
		}else{
			// 返回Point
			return super.nextPoint(e);
		}
	}

    getResults(name){
		if (name){
			return this.monitorMap[name].getResults();
		}
		return this.pointList;
	}

	updateResult(){
		const result = {} , nextTest = {};
		result.BigRoad = [...this.rsa];
		Object.keys(this.monitorMap).forEach(name => {
			const rsa = this[getResults](name);
			result[name] = [...rsa];
			nextTest[name] = {
				banker: this.testPushBanker(name),
				player: this.testPushPlayer(name)
			}
		});

		return { result , nextTest};
	}
}