/*数据提供者*/
import SerialPort from 'serialport'
import CONFIG from '../../utils/comConfig.json';
import { forTheEnd } from "../../utils";

async function getComNameList(){
    const ports = await SerialPort.list();
    return ports.map(port => port.comName);
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
		this.getPort().then(port => {
            port.on('data', data=> {
                this.handleData(data);
            })
        })
	}

	async getPort(){
	    if (this.port == null){
	        const names = await getComNameList();
	        if (names.length === 1){
	            [comName] = names;
                this.comConfig.comName = names[0];
            }
            const { comName , options } = this.comConfig;
            this.port = new SerialPort(comName , options , false);
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