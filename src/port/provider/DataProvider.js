import CONFIG from '../../utils/comConfig.json';
import {newSerialPort} from "../utils";
import {com} from "../../local-storage";
import UnableCloseException from "../../exception/UnableCloseException";

function closePort(port) {
    return new Promise((resolve, reject) => {
        port.close(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}
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
        this.complete = () => {
        }
    }

    // 获取串口操作对象
    async getPort() {
        if (this.port == null) {
            const {comName, options} = this.comConfig;
            this.port = newSerialPort(comName, options);
        }
        return this.port;
    }

    // 处理数据
    handleData(data) {
        this.complete(data);
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
                await closePort(this.port);
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
            this.complete = handler;
        }
        return this;
    }

}