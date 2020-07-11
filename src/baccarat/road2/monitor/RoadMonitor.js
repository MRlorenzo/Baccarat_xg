import BigRoad from "../BigRoad";
import BaccaratResult from "../../result/BaccaratResult";
import BResult from "../../result/BResult";

const analysis = Symbol();
/**
 * 路子监视器(根据大路生成对应的路单)
 */
export default class RoadMonitor {

    constructor(){
        this.road = new BigRoad();
    }

    /**
     * 按照‘大路’的解析一个点，得到相应的（庄/闲）
     * @param that
     * @param point
     */
    push(that , point){
        let rs = this[analysis](that , point);
        if (rs != null){
            this.road.push(rs);
        }
    }

    /**
     * 弹出一个点
     * @param that
     * @param point
     */
    pop(that , point){
        let rs = this[analysis](that, point);
        if (rs != null){
            this.road.pop();
        }
    }

    /**
     * 根据‘大路’解析出下一个点应该返回的结果
     * @param that  instanceof BigRoad
     * @param p     instanceof Point
     * @returns {*} instanceof BaccaratResult
     */
    [analysis](that , p){
        let {x, y} = p.getLocation();
        let pointList = that.getResults();
        // 如果还没有起点，返回Null
        if (!this.isBoot(x , y)){
            return null;
        }
        // 每列第一行比较'齐脚'
        if (y === 1){
            // '齐脚'划红，不'齐脚'划蓝
            return this.isEqHeight(x , y, pointList) ? red() : blue();
        }
        // 每列2行后比较'碰点',没'碰点'后的下一行是否'重复'
        else {
            // 碰点/重复的横坐标要以根节点为主
            x = p.getRoot().x;
            // 碰点划红
            if (this.isBump(x, y, pointList)){
                return red();
            }
            // 没碰点后的下一行是否与前一行相同，相同为红，不同为蓝
            else if(this.isRepeat(x , y, pointList)){
                return red();
            }else {
                return blue();
            }
        }
    }

    // 是否起点
    isBoot(x , y){
        // 大眼仔起点位置 (2,2) | (3,1);
        // 小路起点位置 (3,2) | (4,1);
        // 曱甴路起点位置 (4,2) | (5,1);
        return false;
    }
    
    // 是否齐脚
    isEqHeight(x, y, pointList){
        // 大眼仔齐脚比前1,2列
        // 小路齐脚比前1,3列
        // 曱甴路齐脚比前3,4列
        return false;
    }

    // 是否碰点
    isBump(x, y, pointList){
        // 大眼仔碰点、重复看前1列
        // 小路碰点、重复看前2列
        // 曱甴路碰点、重复看前3列
        return false;
    }
    
    // 是否重复
    isRepeat(x, y, pointList){
        // 大眼仔碰点、重复看前1列
        // 小路碰点、重复看前2列
        // 曱甴路碰点、重复看前3列
        return false;
    }

    /**
     * 检查a列和b列是否是相等的高度
     * @param aCol  a列横坐标
     * @param bCol  b列横坐标
     * @param pointList
     * @returns {boolean}
     */
    checkEqHeight(aCol , bCol , pointList){
        let al=0, bl=0;
        for (let i=1; i< pointList; ++i){
            const rows = pointList[i];
            if (rows[aCol] != null){
                ++al;
            }
            if (rows[bCol] != null){
                ++bl;
            }
        }
        return al === bl;
    }

    /**
     * 开新局
     */
    newGame(){
        this.road.newGame();
    }

    /**
     * 预测下一个,返回（庄/闲）
     * @param that  instanceof BigRoad
     * @param rs
     * @returns {*} instanceof BigRoad
     */
    testPush(that, rs){
        let point = that.testPush(rs);
        return this[analysis](that , point);
    }

    /**
     * 获取路单结果
     * @returns {*} pointList
     */
    getResults(){
        return this.road.getResults();
    }
}

// 拿到一个红
function red() {
    return BaccaratResult.getResult(BResult.B);
}

// 拿到一个蓝
function blue() {
    return BaccaratResult.getResult(BResult.P);
}