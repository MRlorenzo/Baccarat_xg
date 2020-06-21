/*天使靴数据提供者*/
import DataProvider from '../DataProvider';
import AngleEyeDataParseChain from '../../parser/chain/AngleEyeDataParserChain';
import AngleEyeData from '../../data/impl/AngleEyeData';
const complete = Symbol(), handleData = Symbol();




export default class AngleEyeProvider extends DataProvider {

	constructor(comConfig , angleConfig){
		super(comConfig);
		this.angleConfig = angleConfig;
		this[complete] = ()=>{}
		this.parserChain = new AngleEyeDataParseChain(angleConfig.endFlag);
		this.port.on('data',this[handleData]);
	}

	[handleData](data){
		let dataList = this.parserChain.parse(data);
		if (dataList.length > 0){
			this[complete](new AngleEyeData(dataList , this.angleConfig));
		}
	}

	whenCompleteData( handler ){
		if (typeof handler === 'function'){
			this[complete] = handler;
		}
		return this;
	}

}