/*连接器*/
import NullPointerException from "../exception/NullPointerException";
import UnknownException from "../exception/UnknownException";
import ReOpenException from "../exception/ReOpenException";
import ReCloseException from "../exception/ReCloseException";
import ModuleException from "../exception/ModuleException";
import EmptyPortException from "../exception/EmptyPortException";
import {forTheEnd} from "../utils";
import DataProvider from "./provider/DataProvider";
import ErrorNameException from "../exception/ErrorNameException";
import AccessDeniedException from "../exception/AccessDeniedException";

const handleDisconnect = Symbol(), watchEvent = Symbol();
const watchConnect = Symbol(), timer = Symbol();
const error = Symbol(), hasError = Symbol();
/**
 * 连接器
 * whenData(handler)
 * whenDisconnect(handler)
 * async open(isAccident = true) throw ReOpenException,ModuleException,UnknownException,EmptyPortException,ErrorNameException
 * async close() throw ReCloseException,ModuleException,EmptyPortException,ErrorNameException
 * async reOpen() throw ReOpenException,ModuleException,UnknownException,ReCloseException,EmptyPortException,ErrorNameException
 * async updateComName(comName) throw UnableCloseException,ModuleException,ReOpenException,UnknownException
 */
export default class Connector {

    constructor(provider) {
        if (provider == null) {
            throw new NullPointerException('找不到资源');
        }

        if (!(provider instanceof DataProvider)){
            throw new UnknownException('不支持的类型', 500);
        }

        this.provider = provider;

        // 当端口断开连接时，是否是意外的情况发生
        this.isAccident = false;
        // 断线处理
        this[handleDisconnect] = () => {
        };

        this[error] = null;
        this[hasError] = null;
        // catch异常，如果捕获的异常时EmptyPortException
        // 则将当前Connector实例标记为[没有串口]
        // 此方法非阻塞，在catch执行完回调之前，this[hasError]为null
		this[watchEvent](provider);

        // 定时器id
        this[timer] = null;
    }

    async [watchEvent](provider) {
        // throw EmptyPortException,ErrorNameException
        let port;
        try {
            port = await provider.getPort();
			// 一旦成功执行getPort(),说明没有异常。
			this[hasError] = false;
			this[error] = null;
        }catch (e){
			this[hasError] = true;
			this[error] = e;
			throw e;
        }
        // tip: 当getPort抛出异常时不会执行下面的代码.
        /*
        * 拔掉usb不会触发.
        * */
        port.on('disconnect', err => {
            this[handleDisconnect](new ModuleException(err.message));
            clearInterval(this[timer]);
            this[timer] = null;
        });

        /*
        * 拔掉usb不会触发.
        * */
        port.on('error', err => {
            this[handleDisconnect](new ModuleException(err.message));
            clearInterval(this[timer]);
            this[timer] = null;
        });
    }

    async [watchConnect]() {
        // throw EmptyPortException,ErrorNameException
        const port = await this.provider.getPort();

        // tip: 当getPort抛出异常时，不会执行下面的代码
        if (this[timer] != null) {
            clearInterval(this[timer]);
        }
        /*
        * 不管如何,只要是port.isOpen发生变化都会触发.拔掉usb会触发.
        * */
        this[timer] = setInterval(() => {
            //串口发生了中断或者其他未知情况导致此时是非打开状态
            if (port.isOpen() === false) {
                this[handleDisconnect](new UnknownException('检测到isOpen状态为false', 500));
                clearInterval(this[timer]);
            }
        }, 1000);
    }

    // 获得数据时
    whenData(handler) {
        if (typeof handler === 'function') {
            this.provider.whenCompleteData(handler)
        }
    }

    // 断线时
    whenDisconnect(handler) {
        if (typeof handler === 'function') {
            this[handleDisconnect] = (err) => {
                if (this.isAccident) {
                    // 如果是意外情况
                    handler(err);
                }
            }
        }
    }

    /**
     * 打开连接 throw ReOpenException,ModuleException,UnknownException,
     * EmptyPortException,ErrorNameException
     * @param isAccident    如果port.isOpen()===false是否是意外情况
     * @returns {Promise<any>}
     */
    async open(isAccident = true) {
        await forTheEnd(()=>this[hasError] != null)
        if (this[hasError]){
            throw this[error];
        }
        // 是否是意外情况导致调用open?
        this.isAccident = isAccident;
        // throw EmptyPortException,ErrorNameException
        const port = await this.provider.getPort();

        return new Promise((resolve, reject) => {
            if (port.isOpen() === true) {
                reject(new ReOpenException('资源已经是打开状态'))
                return;
            }
            port.open(err => {
                if (err) {
                    if (!!~err.message.indexOf('Access denied')){
                        // 访问被拒绝(可能已经有程序在使用这个port了)
                        reject(new AccessDeniedException(err.message));
                    }else{
						reject(new ModuleException(err.message));
                    }
                } else {
                    this[watchConnect]();
                    resolve();
                }
            })
        })
    }

    /**
     * 关闭连接 throw ReCloseException,ModuleException,
     * EmptyPortException,ErrorNameException
     * @returns {Promise<any>}
     */
    async close() {
		await forTheEnd(()=>this[hasError] != null)
		if (this[hasError]){
			throw this[error];
		}
        this.isAccident = false;
        // throw EmptyPortException,ErrorNameException
        const port = await this.provider.getPort();
        return new Promise((resolve, reject) => {
            if (port.isOpen() === false) {
                reject(new ReCloseException('资源已经是关闭状态'));
                return;
            }
            port.close(err => {
                if (err) {
					if (!!~err.message.indexOf('Access denied')){
						// 访问被拒绝(可能已经有程序在使用这个port了)
						reject(new AccessDeniedException(err.message));
					}else{
						reject(new ModuleException(err.message));
					}
                    reject(new ModuleException(err.message));
                } else {
                    resolve();
                }
            })
        })
    }

    /**
     * 重启 throw ReOpenException,ModuleException,
     * UnknownException,ReCloseException,
     * EmptyPortException,ErrorNameException
     * @returns {Promise<any>}
     */
    async reOpen() {
        // throw EmptyPortException,ErrorNameException
        const port = await this.provider.getPort();
        if (port.isOpen() === false) {
            await this.open();
        } else {
            await this.close();
            await this.open();
        }
    }

    /**
     * 更新资源 throw UnableCloseException,ModuleException,
     * ReOpenException,UnknownException
     * @param comName
     * @returns {Promise<any>}
     */
    async updateComName(comName) {
        await this.provider.updateComName(comName);
        await this[watchEvent](this.provider);
        await this.open(false);
    }

    getComName(){
        return this.provider.getComName();
    }
}