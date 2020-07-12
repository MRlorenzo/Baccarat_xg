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

    getName(){}

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
        // 如果还没有起点，返回Null
        if (!this.isBoot(p)){
            return null;
        }
        let result = null;
        // 每列第一行比较'齐脚'
        if (this.isRoot(p)){
			result = this.isEqHeight(p , that) ? red() : blue();
        }
        // 每列2行后比较'碰点',没'碰点'后的下一行是否'重复'
        else {
			let pointList = that.getResults();
            // 碰点划红
            if (this.isBump(p , pointList , that)){
				result = red();
            }
            // 没碰点后的下一行是否与前一行相同，相同为红，不同为蓝
            else if(this.isRepeat(p , pointList , that)){
				result = red();
            }else {
				result = blue();
            }
        }
        return result;
    }

    // 是否是根节点
    isRoot(point){
		let {x, y} = point.getLocation();
		const rootX = point.root.x;
		return y === 1 && x === rootX;
	}

    // 是否起点
    isBoot(point){
        // 大眼仔起点位置 (2,2) | (3,1);
        // 小路起点位置 (3,2) | (4,1);
        // 曱甴路起点位置 (4,2) | (5,1);
        return false;
    }
    
    // 是否齐脚
    isEqHeight(point, road){
        // 大眼仔齐脚比前1,2列
        // 小路齐脚比前1,3列
        // 曱甴路齐脚比前3,4列
        return false;
    }

    // 是否碰点
    isBump(point , pointList, road){
        // 大眼仔碰点、重复看前1列
        // 小路碰点、重复看前2列
        // 曱甴路碰点、重复看前3列
        return false;
    }
    
    // 是否重复
    isRepeat(point , pointList , road){
        // 大眼仔碰点、重复看前1列
        // 小路碰点、重复看前2列
        // 曱甴路碰点、重复看前3列
        return false;
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

	invoke(method , road , arg){
        let returnVal = null;
        switch (method){
            case 'newGame':
				returnVal = this.newGame();
                break;
            case 'push':
				returnVal = this.push(road , arg);
                break;
            case 'pop':
				returnVal = this.pop(road , arg);
                break;
            case 'testPush':
				returnVal = this.testPush(road , arg);
                break;
            case 'getResults':
                returnVal = this.getResults();
                break;
        }
        return returnVal;
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