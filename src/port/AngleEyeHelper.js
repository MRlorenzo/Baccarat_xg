/*天使靴管理助手*/
import Connector from './Connector';
import AngleEyeProvider from './provider/impl/AngleEyeProvider';
const connect = Symbol();
export default class AngleEyeHelper {
	constructor(settings , config){
		this.hooks = {};
		this.angleEyeSettings = settings;
		this.comConfig = config;
        this[connect]();
	}

	[connect](){
		let provider = new AngleEyeProvider(this.comConfig , this.angleEyeSettings);
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