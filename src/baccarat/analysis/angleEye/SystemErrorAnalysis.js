import AngleEyeAnalysis from "./AngleEyeAnalysis";

export default class SystemErrorAnalysis extends AngleEyeAnalysis{
	constructor(completeData){
		super(completeData);
		this.msg = null;
	}

	getMsg(){
		let msg = 'System err: ';
		switch (this.getCode()) {
			case 1:
				msg+='Can not read';
				break;
			case 2:
				msg += 'Overdraw';
				break;
			case 3:
				msg += 'Mishandling of Indication button';
				break;
			case 4:
				msg += 'Reverse run Return a card from the exit of the shoe';
				break;
			case 5:
				msg += 'Reverse run Return a card on the way of the shoe';
				break;
			case 6:
				msg += 'Card code Error Setting error of Card code';
				break;
			case 7:
				msg += 'Time-out of drawing action';
				break;
		}
		this.msg = msg;
		return this.msg;
	}

	getCode(){
		let [arg0 , b , arg1] = super.analysis();
		return b & 0X3F;
	}
}