/*连接器*/
import NullPointerException from "../exception/NullPointerException";
import UnknownException from "../exception/UnknownException";
import ReOpenException from "../exception/ReOpenException";
import ReCloseException from "../exception/ReCloseException";
import ModuleException from "../exception/ModuleException";

const handleDisconnect = Symbol(), watchEvent = Symbol();
const watchConnect = Symbol(), timer = Symbol();
export default class Connector {

    constructor(provider) {
        if (provider == null) {
            throw new NullPointerException('找不到资源');
        }

        this.provider = provider;

        // 当端口断开连接时，是否是意外的情况发生
        this.isAccident = false;
        // 断线处理
        this[handleDisconnect] = () => {
        };
        this[watchEvent](provider);

        // 定时器id
        this[timer] = null;
    }

    async [watchEvent](provider) {
        const port = await provider.getPort()
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
        const port = await this.provider.getPort();

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

    // 打开连接
    async open(isAccident = true) {
        // 是否是意外情况导致调用open?
        this.isAccident = isAccident;
        const port = await this.provider.getPort();
        return new Promise((resolve, reject) => {
            if (port.isOpen() === true) {
                reject(new ReOpenException('资源已经是打开状态'))
                return;
            }
            port.open(err => {
                if (err) {
                    reject(new ModuleException(err.message));
                } else {
                    this[watchConnect]();
                    resolve();
                }
            })
        })
    }

    // 关闭连接
    async close() {
        this.isAccident = false;
        const port = await this.provider.getPort();
        return new Promise((resolve, reject) => {
            if (port.isOpen() === false) {
                reject(new ReCloseException('资源已经是关闭状态'));
                return;
            }
            port.close(err => {
                if (err) {
                    reject(new ModuleException(err.message));
                } else {
                    resolve();
                }
            })
        })
    }

    // 重启
    async reOpen() {
        const port = await this.provider.getPort();
        if (port.isOpen() === false) {
            return this.open();
        } else {
            await this.close();
            return this.open();
        }
    }

    // 更新资源
    async updateComName(comName) {
        await this.provider.updateComName(comName);
        this[watchEvent](this.provider);
        return this.open(false);
    }
}