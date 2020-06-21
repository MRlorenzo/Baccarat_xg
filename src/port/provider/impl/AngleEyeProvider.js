/*天使靴数据提供者*/
import DataProvider from '../DataProvider';
import AngleEyeDataParseChain from '../../parser/chain/AngleEyeDataParserChain';
import AngleEyeData from '../../data/impl/AngleEyeData';
import CONFIG from '../../../utils/angleConfig.json';
const complete = Symbol(), handleData = Symbol();

export default class AngleEyeProvider extends DataProvider {

	constructor(comConfig , angleConfig = CONFIG){
		super(comConfig);
		if (angleConfig == null){
			angleConfig = CONFIG;
		}
		this.angleConfig = angleConfig;
		this[complete] = ()=>{}
		this.parserChain = new AngleEyeDataParseChain(angleConfig.endFlag);

		this.port.on('data', data=>{
			this[handleData](data)
		});
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