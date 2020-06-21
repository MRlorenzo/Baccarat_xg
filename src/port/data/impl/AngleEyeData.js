/*天使靴数据*/
import CompleteData from '../CompleteData';
const CONFIG = {
	startFlag: 0x5,
	endFlag: 0x3,
	typeIndex: 2
}
export default class AngleEyeData extends CompleteData{
	constructor(source , config = CONFIG){
		super(source);
		const { startFlag , endFlag , typeIndex } = config;
		this.startFlag = startFlag;
		this.endFlag = endFlag;
		this.typeIndex = typeIndex;
	}

	isLegal(){}

	getData(){}

	getType(){}

	getIndex(){}
}