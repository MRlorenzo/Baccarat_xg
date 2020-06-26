import BaccaratResultAnalysis from "./BaccaratResultAnalysis";
const init = Symbol();
export default class WinnerAnalysis extends BaccaratResultAnalysis{
	constructor( angleEyeData ){
		super(angleEyeData);
		this[init]();
	}

	[init](){
		this.winner = null;
	}

	getWinner(){
		return this.winner;
	}
}