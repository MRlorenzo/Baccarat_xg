import { saveTxtFile, appendTxtFile , fileSize } from './index'
import moment from 'moment';
const LOG_PATH = 'logs/angle.log';
const SOURCE_LOG = 'logs/source.log';
const logMaxSize = 1024 * 1024 * 5 ; //5MB

function dataSerial( buf ) {
	if (Buffer.isBuffer(buf)){
		let values = [];
		for (const v of buf.values()){
			values.push(v);
		}
		return values.toString();
	}
	return buf.toString();
}

async function saveFile( path , data ) {
	const size = await fileSize(path);
	let time = moment().format('YYYY/MM/DD HH:mm:ss');
	const txt = `${time}  ${ dataSerial(data) }\r\n`;
	try {
		if (size < logMaxSize){
			await appendTxtFile(path , txt);
		}else{
			await saveTxtFile(path , txt);
		}
	}catch (e){
		// 不做处理
	}
}

export async function sourceLog( data ) {
	await saveFile(SOURCE_LOG , data);
}

export async function angleLog( data ) {
	await saveFile(LOG_PATH , data);
}
