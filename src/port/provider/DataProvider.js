/*数据提供者*/
import SerialPort from 'serialport'
const CONFIG = {
	"comName": "COM3", //连接串口所需参数（重要！！）
	"options": {    /* 可选 */
		"baudRate": 4800,
		"dataBits": 8,
		"parity": "none",
		"stopBits": 1,
		"flowControl": false ,
		"autoOpen":false
	}
};
export default class DataProvider {

	constructor( comConfig = CONFIG){

		if (comConfig == null || comConfig.options == null){
			throw new Error('无法识别的com配置文件');
		}
		// 必须
		comConfig.options.autoOpen = false;

		const { comName , options } = comConfig;

		this.port = new SerialPort(comName , options , false);
	}

	getPort(){
		return this.port;
	}

	// 当检测到有完整的数据存在时
	whenCompleteData( res ){}

}