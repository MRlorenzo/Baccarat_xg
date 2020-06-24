import CONFIG from '../../utils/comConfig.json';
import {com} from "../../local-storage";
import UnableCloseException from "../../exception/UnableCloseException";
import XgSerialPort from './XgSerialPort';
import CompleteData from "../data/CompleteData";
import IllegalDataException from "../../exception/IllegalDataException";

// 代理串口，为串口操作对象初始化数据处理方法。
/*function proxyPort(port, handler) {
    let init = false;
    return clone(port, {
        async open(...arg) {
            if (!init) {
                init = true;
                port.on('data', handler);
            }
            return port.open(...arg);
        },
        close(...arg) {
            return port.close(...arg);
        },
        on(...arg) {
            port.on(...arg);
        },
        isOpen() {
            return port.isOpen;
        }
    })
}*/

const setComConfig = Symbol();
/**
 * 数据提供者
 * async getPort()
 * getComConfig()
 * async updateComName(comName)  throw UnableCloseException
 * whenCompleteData(handler)
 */
export default class DataProvider {

    constructor(comConfig) {
        this[setComConfig](comConfig);
        this.port = null;
        this.complete = data =>{
        }
    }

    /**
     * 获取串口操作对象
     * @returns {Promise<null|*>} XgSerialPort
     */
    async getPort() {
        if (this.port == null) {
            this.port = this._newSerialPort(this.comConfig);
        }
        return this.port;
    }

    // 新的串口操作对象(外部最好不要调用此方法)
    _newSerialPort(comConfig){
        const {comName, options} = comConfig;
        return new XgSerialPort(comName , options , (data)=>{
            this._handleData(data);
        });
    }

    // 处理数据(外部最好不要调用此方法)
    _handleData(data) {
        this.complete(new CompleteData(data));
    }

    // 获取当前串口配置
    getComConfig() {
        return this.comConfig;
    }

    // 设置串口配置
    [setComConfig](comConfig) {
        if (comConfig == null || comConfig.options == null) {
            comConfig = CONFIG;
            com.save(comConfig);
        }
        comConfig.options.autoOpen = false;
        this.comConfig = comConfig;
    }

    /**
     * 更新串口名称 throw UnableCloseException
     * @param comName
     * @returns {Promise<void>}
     */
    async updateComName(comName) {
        // 先停止port
        if (this.port != null) {
            try {
                await this.port.close();
            } catch (e) {
                throw new UnableCloseException(`无法关闭资源:${e.message}`);
            }
        }
        // 将port置空，方便下次getPort()
        this.port = null;
        // 修改配置
        this.comConfig.comName = comName;
        // 更新数据库
        com.update({}, {
            $set: {comName: comName}
        })
    }

    // 当检测到有完整的数据存在时执行(handler)
    whenCompleteData(handler) {
        if (typeof handler === 'function') {
            this.complete = data => {
                if (data instanceof CompleteData){
                    handler(data);
                }else{
                    throw new IllegalDataException('无法解析非CompleteData类型的数据')
                }
            };
        }
        return this;
    }

}