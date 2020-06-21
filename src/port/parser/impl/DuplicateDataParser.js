import DataParser from "../DataParser";

//切割数据，将有效的数据读取出来
function splitEnd( arr , flag){
    let bufs = [];
    let index = -1;
    do{
        index = arr.indexOf(flag);
        if(~index){
            index = index + 3;
            bufs.push(arr.splice(0 , index));
        }else{
            if(arr.length > 0){
                bufs.push(arr);
            }
        }
    }while (~index);

    return bufs;
}

export default class DuplicateDataParser extends DataParser{

    constructor( flag ){
        super(flag);
        this.flag = flag;
        this.key = '';
    }

    parse( data ){
        if(!data.length){
            return;
        }
        let dataArr = splitEnd(data , this.flag);

        dataArr.forEach((d) => {
            let dataKey = d.toString();
            if(dataKey !== this.key){
                this.key = dataKey;
                this.products.push(d);
            }
        });
    }

}
