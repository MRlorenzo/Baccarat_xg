import DataParser from "../DataParser";

export default class DataParserChain {

    constructor(...parsers) {
        this.list = parsers;
    }

    parse(data) {
        let dp = new DataParser();
        dp.parse(data);
        dp = this.list.reduce((acc, cur) => {
            //console.log(cur);
            while (acc.hasNext()) {
                let n = acc.next();
                cur.parse(n);
            }
            return cur;
        }, dp);

        let rs = [];
        while (dp.hasNext()) {
            rs.push(dp.next())
        }

        return rs;
    }

}
