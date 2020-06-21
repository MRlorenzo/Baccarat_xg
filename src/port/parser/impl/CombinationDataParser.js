import DataParser from "../DataParser";

/**
 * 数据重组,根据停止位重组
 */
export default class CombinationDataParser extends DataParser{

    constructor(flag){
        super();
        this.temp = [];
        this.flag = flag;
    }

    parse( arr ){

        let rs = [], _temp = [], temp = this.temp;
        arr.forEach(function (e) {
            temp.push(e);
        });
        let len = temp.length;
        let stopIndex = -1;
        for (let i =0 ; i <len; i++){
            if (temp[i] === this.flag ){
                stopIndex = i;
            }
        }
        if (stopIndex !== -1 && stopIndex + 2 < len){//属于完整的数据
            stopIndex += 3;
            for (let i =0 ; i <len; i++){
                if (i < stopIndex){
                    rs.push(temp[i]);
                }else{
                    _temp.push(temp[i]);
                }
            }
            this.temp.length = 0;
            for (let i =0 ; i <_temp.length; i++){
                this.temp.push(_temp[i]);
            }
        }
        this.products.push(rs);
    }
}
