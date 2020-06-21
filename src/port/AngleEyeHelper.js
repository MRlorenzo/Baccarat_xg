/*天使靴管理助手*/
import Connector from './Connector';
import AngleEyeProvider from './provider/impl/AngleEyeProvider';
const connect = Symbol();
export default class AngleEyeHelper {
	constructor(settings){
		this.hooks = {};
		this.angleEyeSettings = settings;
	}

	form( config ){

		if (typeof config === 'string'){
			// 加载配置文件
		}else {
			this[connect](config);
		}
		return this;
	}

	[connect]( config ){
		let provider = new AngleEyeProvider(config , this.angleEyeSettings);
		let connector = new Connector(provider);

		connector.open();

		connector.whenData(data=>{
			console.log(data);
		});

		connector.whenDisconnect(err=>{
			console.error(err);
		});
	}

	setHooks( hooks ){
		this.hooks = hooks;
	}
}