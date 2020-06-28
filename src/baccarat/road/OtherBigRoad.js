
import BigRoad from "./BigRoad";
import BResult from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";

/**
 * 其他大路，需要根据大路来生成的
 * @param bw
 * @constructor
 */
export default class OtherBigRoad {

    constructor(){
        this.way = new BigRoad();
    }

    load(that, val){
        let t = this;
        let noHeightWay =  that.noHeightWay;
        noHeightWay.forEach(function (e) {
            let p = t.analysis(that, e);
            p&&t.way.push(p);
        });
    }

    push(that, val){
        let p = this.analysis(that, val);
        p && this.way.push(p);
    }

    pop(that, val){
        let p = this.analysis(that, val);
        p && this.way.pop();
    }

    newGame(that, val){
        this.way.newGame();
    }

    /**
     * 预测下一路
     * @param that
     * @param e
     */
    testPush(that, e){
        let p = that.testPush(e);
        return this.analysis(that, p);
    }


    analysis(that, e){
        if (!(e && e.location)){
            return e;
        }

        let x = e.x, y = e.y, rsa = that.noHeightRs, p, minx = this.minx ;

        if (y + x > this.all && x > minx){
            if ( y === 1) {
                //看看是不是齐脚 齐脚红 不起脚蓝
                if (OtherBigRoad.getNotNullMaxLength(rsa, x - 1 - minx) === OtherBigRoad.getNotNullMaxLength(rsa, x - 1)) {
                    p = new BaccaratResult(BResult.B)
                    //console.log('红')
                } else {
                    p = new BaccaratResult(BResult.P)
                    //console.log('蓝')
                }
            }else if ( y === 2){
                //看看是不是有点 有点画红 没点蓝
                if (rsa[y] && rsa[y][x - minx]){
                    p = new BaccaratResult(BResult.B)
                    //console.log('红')
                }else{
                    p = new BaccaratResult(BResult.P)
                    //console.log('蓝')
                }
            }else{
                //看看是不是相同 相同红  不同蓝
                if (!(rsa[y - 1]&&rsa[y - 1][x - minx]) === !(rsa[y]&&rsa[y][x - minx])){
                    p = new BaccaratResult(BResult.B)
                    //console.log('红')
                }else{
                    p = new BaccaratResult(BResult.P)
                    //console.log('蓝')
                }
            }
        }

        /*为了可以找到每个路子的最后一个结果,因此需要保留大路的BaccaratResult的id*/
        if(e && e.z){
            p && p.setId(e.z && e.z.getId() );
        }

        /*返回的路子结果中带有与之对应的baccaratResult的id,注意!它们并不是同一个结果*/
        return p;
    }



    static getNotNullMaxLength(arr, x) {
        let i = 1;
        while (arr[i]&&arr[i][x]){i++;}
        return i - 1;
    }

    /**
     * 获取大眼路结果
     * @returns {Array}
     */
    getResults(){
        return this.way.getResults();
    }
}
