import AngleEyeAnalysis from "./AngleEyeAnalysis";
import BResult from "../../result/BResult";
import Pairs from "../../result/Pairs";
import BaccaratResult from "../../result/BaccaratResult";
function getBaccaratResult( datas ) {
	const [ arg0 , b , arg2] = datas;
	let bResult = null , pairs = [];
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

	return BaccaratResult.getResult(bResult , [] , ...pairs);
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

	getResult(){
		return this.result;
	}
}