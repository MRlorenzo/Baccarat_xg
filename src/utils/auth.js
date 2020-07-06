import crypto from 'crypto';
import macUtil from 'getmac';
import WinReg from 'winreg';
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArsIemA23WuMA9EwBArm9
m/oZt1qWEjIWZKV1a+69jEgKeVSvoHxecZUKJf4xYug5zrLts2xGdjcck6QhF5oM
TasXiplCkC1RNEUN2rfcbUD1/9ent1RXnKN12yJtG5U/pjpmuD3CT5g185AaRODL
HTtkM9kA7s6sg2QoD647FISh4aRf2JizpV/Odrh+edboe2aJ49DCDyrgfjpNIvn0
BDeyCohIuNeDjT2nIw4bfazuXJUqojk0w1lIQTa32d6gabd3H2hrm4tz3hMbiOQa
vMZv50KHVy40pifs1snfgJvZYbhipk1O5aGxlmu1Ag7OlD0bBLV36253KM4tF+DM
0wIDAQAB
-----END PUBLIC KEY-----`;
/*md5加密*/
export function md5(data) {
	// 以md5的格式创建一个哈希值
	let hash = crypto.createHash('md5');
	return hash.update(data).digest('hex');
}

/**
 * 解密
 * @param data
 */
export function decrypt( data ) {
	return new Promise((resolve, reject) => {
		try {
			let val = crypto.publicDecrypt( publicKey , Buffer.from(data , 'base64') ).toString('utf8');
			resolve( val );
		}catch (e){
			reject(e);
		}
	});
}

/**
 * 获取网卡地址
 * @returns {Promise<any>}
 */
export function mac(){
	return new Promise(( resolve, reject ) => {
		macUtil.getMac(function( err , macAddress ){
			if(err){
				reject(err);
			}else{
				resolve(macAddress);
			}
		});
	});
};

const AUTH_LOCATION = '\\Software\\BaccaratXg';
/**
 * 从注册表中获取授权码，如果没有则返回空
 */
export async function getAuthCodeFromWinReg() {
	let name = 'AUTH_CODE';
	let key = new WinReg({
		hive: WinReg.HKCU,
		key: AUTH_LOCATION
	});
	return new Promise((resolve) => {
		key.get(name , (err , result) =>{
			if(result){
				resolve(result.value);
			}else{
				resolve(null);
			}
		});
	});
}