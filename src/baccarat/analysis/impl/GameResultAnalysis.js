import CompleteAnalysis from "../CompleteAnalysis";

export default class GameResultAnalysis extends CompleteAnalysis{
	constructor(completeData){
		super(completeData);
		this.result = null;
	}

	analysis(){
		/*let [arg0 , b , arg1] = this.data.getData();

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

		this.result = BaccaratResult.getResult(bResult , [] , ...pairs);
		return this.result;*/
	}
}