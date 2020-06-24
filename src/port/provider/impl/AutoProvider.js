import DataProvider from '../DataProvider';
import {getComNameList} from "../../utils";
import EmptyPortException from "../../../exception/EmptyPortException";
import ErrorNameException from "../../../exception/ErrorNameException";

const checkComList = Symbol(), autoSet = Symbol();
/**
 * 自动修正配置的数据提供者
 * async getPort() throw EmptyPortException,ErrorNameException
 * getComConfig()
 * async updateComName(comName)  throw UnableCloseException
 * whenCompleteData(handler)
 */
export default class AutoProvider extends DataProvider {
    constructor(comConfig) {
        super(comConfig);
    }

    /*
    * throw EmptyPortException,ErrorNameException
    * */
    async getPort() {
        if (this.port == null) {
            const names = await this[checkComList]();
            const comConfig = await this[autoSet](names);
            this.port = this._newSerialPort(comConfig);
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