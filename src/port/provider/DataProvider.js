/*数据提供者*/
import SerialPort from 'serialport'
import CONFIG from '../../utils/comConfig.json';
export default class DataProvider {

	constructor( comConfig = CONFIG){

		if (comConfig == null || comConfig.options == null){
            comConfig = CONFIG;
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