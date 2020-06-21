import moment from 'moment';
import { clone } from "../utils";

const ENTITY = {
    KEY: null,           // 标识   (字符串)
    date: null,         // 创建日期(字符串)
    createTime: null,   // 创建时间(number)
    doc: null           // 存储内容
};

export default {
    box( key , doc ){
        return clone(ENTITY , {
            KEY: key,
            date: moment().format('YYYY/MM/DD'),
            createTime: new Date().getTime(),
            doc: doc
        })
    },
    unbox( data ){
        if (data == null || data.doc == null){
            throw new Error('数据异常');
        }
        if (Array.isArray(data)){
            return data.map(d=> d.doc);
        }
        return data.doc;
    }
}