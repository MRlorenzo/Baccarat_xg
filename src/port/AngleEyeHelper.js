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

	async [connect](){
		let provider = new AngleEyeProvider(this.comConfig , this.angleEyeSettings);
		let connector = new Connector(provider);

		try {
            await connector.open();
		}catch (e){
            console.error(e);
		}

		connector.whenData(data=>{
		    console.log('监听')
			console.log(data);
		});

		connector.whenDisconnect(err=>{
		    console.log('失去连接')
			console.error(err);
		});
	}

	setHooks( hooks ){
		this.hooks = hooks;
	}
}