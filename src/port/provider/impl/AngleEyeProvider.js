import AutoProvider from './AutoProvider';
import AngleEyeDataParseChain from '../../parser/chain/AngleEyeDataParserChain';
import AngleEyeData from '../../data/impl/AngleEyeData';
import CONFIG from '../../../utils/angleConfig.json';
import {angle} from "../../../local-storage";
import { sourceLog , angleLog } from '../../../file-system/angleLog';
import UnknownException from "../../../exception/UnknownException";
/**
 * 天使靴数据提供者
 * async getPort() throw EmptyPortException,ErrorNameException
 * getComConfig()
 * async updateComName(comName)  throw UnableCloseException
 * whenCompleteData(handler)
 * getAngleConfig()
 */
export default class AngleEyeProvider extends AutoProvider {

    constructor(comConfig, angleConfig) {
        super(comConfig);
        if (angleConfig == null) {
            angleConfig = CONFIG;
            // 保存到数据库
            angle.save(angleConfig);
        }
        this.angleConfig = angleConfig;
        this.parserChain = new AngleEyeDataParseChain(angleConfig.endFlag);
    }

    // 串口数据处理(外部最好不要调用此方法)
    _handleData(data) {
        // 天使靴日志
		sourceLog(data).catch(e=>{
            new UnknownException(e.message , -1);
        });
        let dataList = this.parserChain.parse(data);

        if (dataList.length > 0) {
            dataList.forEach(d => {
                angleLog(d).catch(e=>{
                    new UnknownException(e.message , -1);
                })
                this.complete(new AngleEyeData(d, this.angleConfig));
            })
        }
    }

    // 获取天使靴(串口数据)配置
    getAngleConfig() {
        return this.angleConfig;
    }
}