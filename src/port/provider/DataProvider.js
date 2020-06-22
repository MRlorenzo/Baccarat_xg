/*数据提供者*/
import SerialPort from 'serialport'
import CONFIG from '../../utils/comConfig.json';
import { forTheEnd , clone} from "../../utils";

async function getComNameList(){
    const ports = await SerialPort.list();
    return ports.map(port => port.comName);
}

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
	}

	async getPort(){
	    if (this.port == null){
	        const names = await getComNameList();
	        if (names.length === 1){
	            let [comName] = names;
                this.comConfig.comName = comName;
            }

            const { comName , options } = this.comConfig;
	        const port = new SerialPort(comName , options , false);
            this.port = proxyPort(port , data => {
				this.handleData(data);
			});
        }
        return this.port;
	}

	// 处理数据
    handleData( data ){

    }

    // 获取当前串口配置
	async getComConfig(){
	    await forTheEnd(()=> this.port != null);
		return this.comConfig;
	}

	// 当检测到有完整的数据存在时
	whenCompleteData( res ){
	    return this;
    }

}