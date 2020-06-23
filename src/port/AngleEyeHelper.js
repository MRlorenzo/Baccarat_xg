/*天使靴管理助手*/
import Connector from './Connector';
import AngleEyeProvider from './provider/impl/AngleEyeProvider';
import Tm from './provider/impl/type.json';
import { forTheEnd } from "../utils";
import IllegalDataException from "../exception/IllegalDataException";
import ReCloseException from "../exception/ReCloseException";
import ModuleException from "../exception/ModuleException";

const connect = Symbol(), distributor = Symbol();
export default class AngleEyeHelper {
	constructor(config , settings){
		this.hooks = {};
		this.disconnect = (err)=>{};
		(async ()=>{
			this.connector = await this[connect](config , settings);
		})()
	}

	async open(){
		await forTheEnd(()=> this.connector != null);
		try {
			await this.connector.open();
		}catch (e){
			throw e;
		}
	}

	// 连接资源
	async [connect](comConfig , angleEyeSettings){
		let provider = new AngleEyeProvider(comConfig , angleEyeSettings);
		let connector = new Connector(provider);

		connector.whenData(d=>{
		    // 接受到完整的数据...
			// 数据是否合法
			if (d.isLegal()){
				this[distributor](d);
			}else{
				new IllegalDataException('非法的数据' , d.getSource());
			}
		});

		connector.whenDisconnect(err=>{
		    // 失去连接。。。
			this.disconnect(err);
		});

		return connector;
	}

	// 断线处理程序
	whenDisconnect( handler ){
		if (typeof handler === 'function'){
			this.disconnect = handler;
		}
		return this;
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

	async updateComName( comName ){
		await forTheEnd(()=> this.connector != null);
		try {
			await this.connector.updateComName(comName);
		}catch (e){
			throw e; // UnableCloseException
		}

	}

	async close(){
		await forTheEnd(()=> this.connector != null);
		try {
			await this.connector.close();
		}catch (e){
			console.error(e); // ReCloseException, ModuleException
		}
	}

	setHooks( hooks ){
		this.hooks = hooks;
	}
}