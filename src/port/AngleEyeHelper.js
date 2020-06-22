/*天使靴管理助手*/
import Connector from './Connector';
import AngleEyeProvider from './provider/impl/AngleEyeProvider';
import Tm from './provider/impl/type.json';
const connect = Symbol(), distributor = Symbol();
export default class AngleEyeHelper {
	constructor(settings , config){
		this.hooks = {};
		this.angleEyeSettings = settings;
		this.comConfig = config;
        this[connect]();
	}

	// 连接资源
	async [connect](){
		let provider = new AngleEyeProvider(this.comConfig , this.angleEyeSettings);
		let connector = new Connector(provider);
		this.connector = connector;
		try {
            await connector.open();
		}catch (e){
            console.error(e);
		}

		const comConfig = await provider.getComConfig();
		const angleConfig = await provider.getAngleConfig();

		connector.whenData(d=>{
		    // 接受到完整的数据...
			// 数据是否合法
			if (d.isLegal()){
				this[distributor](d);
			}
		});

		connector.whenDisconnect(err=>{
		    // 失去连接。。。
			console.error(err);
		});
	}

	// 分发任务
	[distributor](angleData){
		const type = angleData.getType();
		const methodName = Tm[type];
		let hook;
		if (methodName != null){
			const handler = this.hooks[methodName];
			if (typeof handler === 'function'){
				hook = handler;
			}
		}

		if (hook != null){
			hook(angleData);
		}else if(typeof this.hooks.default === 'function'){
			this.hooks.default(angleData);
		}
	}

	setHooks( hooks ){
		this.hooks = hooks;
	}
}