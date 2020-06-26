import CompleteAnalysis from "../CompleteAnalysis";
import AngleEyeData from "../../../port/data/impl/AngleEyeData";
/**
 * 天使靴数据解析器
 * */
export default class AngleEyeAnalysis extends CompleteAnalysis{
	constructor(completeData){
		if (!(completeData instanceof AngleEyeData)){
			throw new Error('不兼容的数据类型');
		}
		super(completeData);
	}
}