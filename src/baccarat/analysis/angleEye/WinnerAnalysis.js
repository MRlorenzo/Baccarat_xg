import BaccaratResultAnalysis from "./BaccaratResultAnalysis";
const init = Symbol();
export default class WinnerAnalysis extends BaccaratResultAnalysis{
	constructor( angleEyeData ){
		super(angleEyeData);
		this[init]();
	}

	[init](){
		const baccaratResult = super.getResult();
		this.winner = baccaratResult.getResult();
	}

	getWinner(){
		return this.winner;
	}
}