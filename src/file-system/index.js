import _fs from 'fs';
import _os from 'os';
import {remote} from 'electron';
import path from 'path';
const fs = _fs == null ? remote.require('fs'): _fs;
const os = _os == null ? remote.require('os'): _os;
import log from '../utils/log';

const isDev = process.env.NODE_ENV === 'development';
// 程序的安装目录
export const installPath = isDev ?
	path.resolve(__dirname, '../'):
	path.resolve(__dirname , '../../../../');

// 相对程序安装目录的path
function withAppPath( _path ) {
	return path.resolve(installPath , _path);
}

export async function exists( _path ){
    _path = withAppPath(_path);
	return new Promise(resolve => {
		fs.exists(_path, exi=> {
			resolve(exi);
		});
	})
}

function getFolderName( url ){
	let lastIndex = url.lastIndexOf('\\');
	lastIndex = ~lastIndex?lastIndex:url.lastIndexOf('/');
	return url.substring(0,lastIndex);
}

async function safetyURL( _path ){
	if(!_path){
		throw new Error();
	}
	const folderName = getFolderName(_path);
	const exi = await exists(folderName);

	if (!exi){
		await new Promise((resolve, reject) => {
			fs.mkdir(folderName , { recursive: true } , err=>{
				if (err){
					reject(err);
				}else{
					resolve();
				}
			});
		})
	}
}

export function stat( _path ){
	_path = withAppPath(_path)
	return new Promise((resolve, reject) => {
		fs.stat(_path , function (err, stats) {
			if(err){
				reject(err);
			}else{
				resolve(stats);
			}
		})
	})
}

export async function fileSize( _path ) {
	_path = withAppPath(_path);
	const exi = await exists(_path);
	if (!exi){
		return 0;
	}
	const stats = await stat(_path);
	return stats.size;
}

export function tempPath( _path ){
	return path.join(os.tmpdir(), _path);
}
/**
 * 保存文本文件
 * @param _path
 * @param data
 * @returns {Promise<any>}
 */
export async function saveTxtFile(_path , data){
	_path = withAppPath(_path);
	if (!isDev){
		log.info('save at:' , _path)
	}
	await safetyURL(_path);

	return new Promise((resolve, reject) => {
		fs.writeFile( _path , data , ( err , data ) =>{
			if ( err ){
				reject(err);
			}else{
				resolve( _path );
			}
		});
	})
}
/**
 * 往文本文件追加内容
 * @param _path
 * @param data
 * @returns {Promise<any>}
 */
export async function appendTxtFile( _path , data){
	_path = withAppPath(_path);
	await safetyURL(_path);
	return new Promise((resolve, reject) => {
		fs.appendFile( _path , data , ( err , data ) =>{
			if ( err ){
				reject(err);
			}else{
				resolve( data );
			}

		});
	})
}
/**
 * 读取文本
 * @param _path
 * @returns {Promise<any>}
 */
export async function readTxtFile( _path ){
	_path = withAppPath(_path);
	const exi = await exists(_path);
	if (!exi){
		throw new Error('文件不存在');
	}
	return new Promise((resolve, reject) => {
		fs.readFile( _path , 'utf-8',  ( err , data ) => {
			if (err) {
				reject(err);
			}else{
				resolve(data);
			}
		});
	})
}
/**
 * 读取json文件
 * @param _path
 * @returns {Promise<any>}
 */
export async function readJsonFile(_path){
	const jsonData = await readTxtFile(_path);
	if (typeof jsonData === 'string'){
		try {
			const obj = JSON.parse(jsonData);
			if (obj && typeof obj === 'object'){
				return obj;
			}else{
				throw new Error('无法解析可用的数据')
			}
		}catch (e){
			throw new Error('error：'+data+'!!!'+e.toString())
		}
	}
}
/**
 * 保存json文件
 * @param _path
 * @param data
 * @returns {Promise<void>}
 */
export async function saveJsonFile( _path , data){
	let txt;
	if (typeof data === 'string'){
		//为了确保我们写入json文件的数据一定是js对象
		try {
			txt = JSON.stringify(JSON.parse(data) , "" ,"\t");
		}catch (e){
			txt = '{}';
		}
	}else{
		txt = JSON.stringify(data ,"" ,"\t")
	}
	return await saveTxtFile(_path , txt);
}
/**
 * 创建文件夹
 * @param dir
 * @returns {Promise<any>}
 */
export function mkdir( dir ){
	dir = withAppPath(dir)
	return new Promise( (resolve, reject) => {
		fs.mkdir(dir, err => {
			if(err){
				reject(err);
			}else{
				resolve(true);
			}
		})
	});
}

export function files( _path ){
    _path = withAppPath(_path);
	return new Promise((resolve, reject) => {
		fs.readdir( _path , ( err , files)=>{
			if(err){
				reject(err);
			}else{
				resolve(files);
			}
		} );
	});
}
/**
 * 拷贝文件
 * @param src
 * @param dst
 * @returns {Promise<any>}
 */
export function copy( src, dst ){
	src = withAppPath(src);
	dst = withAppPath(dst);
	// 读取目录中的所有文件/目录
	return new Promise((resolve, reject) => {
		fs.readdir( src, function( err, paths ){
			if( err ){
				reject(err);
				return;
			}
			const tasks = paths.map( _path => {
				return new Promise((resolve2, reject2) => {
					let _src = src + '/' + _path,
						_dst = dst + '/' + _path,
						readable, writable;

					fs.stat( _src, function( err, st ){
						if( err ){
							reject2(err);
							return;
						}

						// 判断是否为文件
						if( st.isFile() ){
							// 创建读取流
							readable = fs.createReadStream( _src );
							// 创建写入流
							writable = fs.createWriteStream( _dst );
							// 通过管道来传输流
							readable.pipe( writable );
						}
						resolve2();
					});
				})
			});

			Promise.all(tasks).then(resolve);
		});
	})
}

export async function deleteAll(_path){
	const exi = await exists(_path);
	if (exi){
		const files = await files(_path);
		files.forEach( (file) =>{
			const curPath = _path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) { // recurse
				deleteAll(curPath).catch(e=>{});
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(_path);
	}
}