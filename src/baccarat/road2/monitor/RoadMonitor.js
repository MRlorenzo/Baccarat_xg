import BigRoad from "../BigRoad";

/**
 * 路子监视器(根据大路生成对应的路单)
 */
export default class RoadMonitor {

    constructor(){
        this.road = new BigRoad();
        this.minx = 1;
        this.all = 1;
    }

    /**
     * 按照‘大路’的解析一个点，得到相应的（庄/闲）
     * @param that
     * @param point
     */
    push(that , point){
        let rs = this.analysis(that , point);
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
        let rs = this.analysis(that, point);
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
    analysis(that , p){
        let {x, y} = p.getLocation();
        let pointList = that.getResults();
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
        return this.analysis(that , point);
    }

    /**
     * 获取路单结果
     * @returns {*} pointList
     */
    getResults(){
        return this.road.getResults();
    }
}