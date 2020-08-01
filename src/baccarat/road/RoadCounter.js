import BResultEnum from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";

const count = Symbol();
export default class RoadCounter {

	constructor(){
		// 当前游戏局数
		this.games = 0;
		//庄赢出现多少局
		this.bCount = 0;
		//闲赢出现多少局
		this.pCount = 0;
		//和出现多少局
		this.tCount = 0;
		//庄对出现多少局
		this.bPCount = 0;
		//闲对出现多少局
		this.pPCount = 0;
		//天牌
		this.skyCard = 0;
		//庄天牌
		this.bSkyCard = 0;
		//闲天牌
		this.pSkyCard = 0;
		//庄6点赢
		this.bSixWin = 0;

		// 游戏结果列表，相当于珠子路
		this.resultList = [];
	}

	getBaccaratResults(){
		return this.resultList;
	}

	getLastResult(){
		if (this.resultList == null || this.resultList.length === 0){
			return null;
		}
		return this.resultList[this.resultList.length -1];
	}

	/**
	 * 放入一个结果并统计
	 * @param rs
	 */
	pushResult( rs ){
		this.resultList.push(rs);
		this[count](rs, 1);
	}
	/**
	 * 移除一个结果
	 */
	popResult(){
		const rs = this.resultList.pop();
		this[count](rs, -1);
		return rs;
	}

	/**
	 * 统计游戏结果
	 * @param rs
	 * @param step
	 */
	[count](rs , step){
		if (!(rs instanceof BaccaratResult)){
			return ;
		}
		this.games += step;
		// 庄，闲，和
		switch (rs.getResult()){
			case BResultEnum.B:
				this.bCount+= step;
				break;
			case BResultEnum.P:
				this.pCount+= step;
				break;
			case BResultEnum.T:
				this.tCount+= step;
				break;
			default:
				break;
		}

		// 庄对，闲对
		if (rs.isBankerPair()){
			this.bPCount+= step;
		}
		if (rs.isPlayerPair()){
			this.pPCount+= step;
		}

		// 天牌
		const isBankerSky= rs.isBankerSky(),
			isPlayerSky = rs.isPlayerSky();
		if (isBankerSky || isPlayerSky){
			this.skyCard+= step;
			if(isBankerSky){
				this.bSkyCard+= step;
			}else if(isPlayerSky){
				this.pSkyCard+= step;
			}
		}
		// 庄6点赢。
		if(rs.isBankerSixWin()){
			this.bSixWin+= step;
		}
	}


	/**
	 * 清除计数器
	 */
	clear(){
		// 当前游戏局数
		this.games = 0;
		//庄赢出现多少局
		this.bCount = 0;
		//闲赢出现多少局
		this.pCount = 0;
		//和出现多少局
		this.tCount = 0;
		//庄对出现多少局
		this.bPCount = 0;
		//闲对出现多少局
		this.pPCount = 0;
		//天牌
		this.skyCard = 0;
		//庄天牌
		this.bSkyCard = 0;
		//闲天牌
		this.pSkyCard = 0;
		//庄6点赢
		this.bSixWin = 0;
		// 游戏结果列表，相当于珠子路
		this.resultList = [];
	}

}