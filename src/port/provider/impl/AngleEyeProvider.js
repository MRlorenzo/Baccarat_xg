/*天使靴数据提供者*/
import DataProvider from '../DataProvider';
import AngleEyeDataParseChain from '../../parser/chain/AngleEyeDataParserChain';
import AngleEyeData from '../../data/impl/AngleEyeData';
import CONFIG from '../../../utils/angleConfig.json';

export default class AngleEyeProvider extends DataProvider {

	constructor(comConfig , angleConfig = CONFIG){
		super(comConfig);
		if (angleConfig == null){
			angleConfig = CONFIG;
		}
		this.angleConfig = angleConfig;
		this.parserChain = new AngleEyeDataParseChain(angleConfig.endFlag);
	}

	// 串口数据处理
    handleData(data){

		let dataList = this.parserChain.parse(data);

		if (dataList.length > 0){
			dataList.forEach(data => {

				this.complete(new AngleEyeData(data, this.angleConfig));
			})
		}
	}

	// 获取天使靴(串口数据)配置
    async getAngleConfig(){
        return this.angleConfig;
    }
}