import CompleteData from "../../port/data/CompleteData";
/**
 * 数据解析器
 */
export default class CompleteAnalysis {
	constructor(completeData){
		if (!(completeData instanceof CompleteData)){
			throw new Error('不兼容的数据类型')
		}
		this.data = completeData;
	}

	/*解析游戏数据*/
	analysis(){
		return this.data.getData();
	}
}