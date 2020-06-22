/*数据提供者*/
import CONFIG from '../../utils/comConfig.json';
import { forTheEnd , clone} from "../../utils";
import { getComNameList , newSerialPort } from "../utils";

// 代理串口，为串口操作对象初始化数据处理方法。
function proxyPort( port , handler) {
	let init = false;
	return clone(port , {
		async open(...arg){
			if (!init){
				port.on('data', handler);
			}
			return port.open(...arg);
		},
		on(...arg){
			port.on(...arg);
		},
		isOpen(){
			return port.isOpen;
		}
	})
}

export default class DataProvider {

	constructor( comConfig = CONFIG){

		if (comConfig == null || comConfig.options == null){
            comConfig = CONFIG;
		}
		// 必须
		comConfig.options.autoOpen = false;
		this.comConfig = comConfig;
		this.port = null;
		this.complete = ()=>{}
	}

	// 获取串口操作对象
	async getPort(){
	    if (this.port == null){
	        const names = await getComNameList();
	        if (names.length === 1){
	            let [comName] = names;
                this.comConfig.comName = comName;
            }

            const { comName , options } = this.comConfig;
	        const port = newSerialPort(comName , options );
            this.port = proxyPort(port , data => {
				this.handleData(data);
			});
        }
        return this.port;
	}

	// 处理数据
    handleData( data ){
		this.complete(data);
    }

    // 获取当前串口配置
	async getComConfig(){
	    await forTheEnd(()=> this.port != null);
		return this.comConfig;
	}

	// 当检测到有完整的数据存在时执行(handler)
	whenCompleteData( handler ){
		if (typeof handler === 'function'){
			this.complete = handler;
		}
		return this;
	}

}