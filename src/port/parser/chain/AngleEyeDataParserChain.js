import DataParserChain from './DataParserChain';
import CombinationDataParser from "../impl/CombinationDataParser";
import DuplicateDataParser from "../impl/DuplicateDataParser";

/**
 * 百家乐处理链
 */
export default class AngleEyeDataParserChain extends DataParserChain {

    constructor(endFlag) {
        super(
            new CombinationDataParser(endFlag),
            new DuplicateDataParser(endFlag)
        );
    }

    /**
     * 将串口数据解析成可识别的
     * @param data 一维数组
     */
    parse(data) {
        return super.parse(data);
    }

}