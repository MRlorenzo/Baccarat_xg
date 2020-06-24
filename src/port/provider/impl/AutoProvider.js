import DataProvider from '../DataProvider';
import {getComNameList, newSerialPort} from "../../utils";
import {clone} from "../../../utils";
import EmptyPortException from "../../../exception/EmptyPortException";
import ErrorNameException from "../../../exception/ErrorNameException";

// 代理串口，为串口操作对象初始化数据处理方法。
function proxyPort(port, handler) {
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
}

const checkComList = Symbol(), autoSet = Symbol();
export default class AutoProvider extends DataProvider {
    constructor(comConfig) {
        super(comConfig);
    }

    async getPort() {
        if (this.port == null) {
            const names = await this[checkComList]();
            const comConfig = await this[autoSet](names);

            const {comName, options} = comConfig;
            const port = newSerialPort(comName, options);
            this.port = proxyPort(port, data => {
                this.handleData(data);
            });
        }
        return this.port;
    }

    async [checkComList]() {
        const names = await getComNameList();
        if (names.length === 0) {
            throw new EmptyPortException('找不到串口列表');
        }
        return names;
    }

    async [autoSet](names) {
        const configName = this.comConfig.comName;
        if (!names.includes(configName)) {
            if (names.length === 1) {
                let [comName] = names;
                // 修改配置
                this.updateComName(comName);
            } else {
                throw new ErrorNameException(`无法识别的配置:${configName}`);
            }
        }
        return this.comConfig;
    }
}