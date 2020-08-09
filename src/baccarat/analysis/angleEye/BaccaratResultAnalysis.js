import AngleEyeAnalysis from "./AngleEyeAnalysis";
import BResult from "../../result/BResult";
import Pairs from "../../result/Pairs";
import BaccaratResult from "../../result/BaccaratResult";
function getBaccaratResult( datas ) {
	const [ arg0 , b , arg2] = datas;
	let bResult = null , pairs = [], bSixWin = false;
	switch ((b >> 4) & 7) {
		case 1:
			bResult = BResult.P;
			break;
		case 2:
			bResult = BResult.T;
			break;
		case 4:
			bResult = BResult.B;
			break;
		case 5:
			//庄6点赢
			bResult = BResult.B;
			bSixWin = true;
			break;
		default:break;
	}

	switch (b & 3) {
		case 1:
			pairs = [Pairs.PP];
			break;
		case 2:
			pairs = [Pairs.BP];
			break;
		case 3:
			pairs = [Pairs.BP , Pairs.PP];
			break;
		default:
			break;
	}

	return BaccaratResult.getResult(bResult , [] , pairs , bSixWin);
}
const init = Symbol();
export default class BaccaratResultAnalysis extends AngleEyeAnalysis{
	constructor( angleEyeData ){
		super(angleEyeData);
		this[init]();
	}

	[init](){
		this.result = getBaccaratResult(super.analysis());
	}

	checkSkyCards(bankerCardList, playerCardList){
		let skyCardStr = '';
		//判断闲天牌
		if(playerCardList.length == 2){
			let sum = 0;
			playerCardList.forEach(p =>{
				//点数
				let pointVal = p.getPoint().value;
				if(pointVal > 10){
					pointVal = 10;
				}
				sum += pointVal;
			})
			if(sum == 8 || sum == 9 || sum == 18 || sum == 19){
				skyCardStr = '1-'
			}
		}
		//判断庄天牌
		if(bankerCardList.length == 2){
			let sum = 0;
			bankerCardList.forEach(p =>{
				//点数
				let pointVal = p.getPoint().value;
				if(pointVal > 10){
					pointVal = 10;
				}
				sum += pointVal;
			})
			if(sum == 8 || sum == 9 || sum == 18 || sum == 19){
				skyCardStr = '2+'
			}
		}
		this.result.skyCards = BaccaratResult.getSkyCardsByString(skyCardStr);
	}

	getResult(){
		return this.result;
	}
}