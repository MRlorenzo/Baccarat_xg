/*完整数据*/
export default class CompleteData {

	constructor( source ){
		// 原始数据
		this.source = source;
	}

	// 是否合法
	isLegal(){
		return false;
	}

	// 获取数据
	getData(){
		return this.source;
	}
}