import BigRoad from "../BigRoad";
import { fix , red , blue , log , logP } from "../utils";

const analysis = Symbol(),
    analysisHead = Symbol(), // 解析'路头牌'
    analysisBody = Symbol(); // 解析'路中牌'
/**
 * 路子监视器(根据大路生成对应的路单)
 */
export default class RoadMonitor {

    constructor(){
        this.road = new BigRoad();
        this.isTest = true;
    }

    getName(){}

    /**
     * 按照‘大路’的解析一个点，得到相应的（庄/闲）
     * @param that
     * @param point
     */
    push(that , point){
        this.isTest = false;
        let rs = this[analysis](that , point);
        if (rs != null){
            const p = this.road.push(rs);
			logP(p, rs);
        }
    }

    /**
     * 弹出一个点
     * @param that
     * @param point
     */
    pop(that , point){
        this.isTest = false;
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
        // 每列（逻辑）第一行即‘路头牌’
        if (p.isRoot){
        	result = this[analysisHead](that , p);
        }
        // 每列2行后即‘路中牌’
        else {
			result = this[analysisBody](that , p);
        }
        // 为了方便找到目标，将解析后的结果设置同样的id
        result.setId(p.getResultId());
        return result;
    }

    /**
     * ”路头牌”之后在大眼仔上添加的颜色应该是假设大路中
     * 上一列继续的情况下我们本应在大眼仔|小路|曱甴路上添加的颜色的相反颜色
     * 如果一个”路头牌”之后紧接着是另一手”路头牌”呢？
     * 在大眼仔上单跳局面的前两手牌添加的标记颜色可红可蓝，
     * 取决于之前两列的长度，可一旦进行到单跳的第三手牌及之后，
     * 在大眼仔上添加的颜色必定是红色。
     * 只要这个牌靴继续单跳，大眼仔|小路|曱甴路就必定继续填入一连串的红色。
     * link:https://wgm8.com/szh-fate-in-the-cards-understanding-baccarat-trends-part-2/
     * @param that
     * @param p
     * @returns {*}
     */
    [analysisHead](that , p){
        let result = null;
        let msg = '';
        // 上一个
        // 预测下一个点，(大路还没有真正放入这个点，所以这个点是虚拟的)
        // (由于大路已经放入了一个点了，所以这个点的上一个是大路的倒数第2个)
        let last = that.getBackwards(this.isTest ? -1: -2);
        let last2 = that.getBackwards(this.isTest ? -2: -3);

        // 如果(大路)它的上一个点是路头，上上一个还是路头，只能比较齐脚了
        if (last.getLocation().rootY === 1 && last2.getLocation().rootY === 1){
            if (this.isEqHeight(p, that)){
                result = red();
                msg = '齐脚:红';
            }else{
                result = blue();
                msg = '不齐脚:蓝';
            }
        }
        // 它的上一个点不是路头，就看它上一个点本该连续放入的结果的取反
        else{
            /**
             * ”路头牌”之后在大眼仔上添加的颜色应该是假设大路中
             * 上一列继续的情况下我们本应在大眼仔|小路|曱甴路上添加的颜色的相反颜色
             * */
            // 由于路头牌绝对是前一个结果相反的，因此可以看下这个点的结果是庄还是闲
            // 然后将它取反，得到一个结果，看看将它放下去后的结果是什么

            // 放入相反的结果,得到假设大路中上一列继续的情况下我们本应在大眼仔|小路|曱甴路上添加的颜色
            // console.log(`这个点是${p.getObject().getResultName()}(${p.x},${p.y})`);
            const point = that.testPush(fix(p.getObject()));
            if (point == null){
				if (this.isEqHeight(p, that)){
					result = red();
					msg = '齐脚:红';
				}else{
					result = blue();
					msg = '不齐脚:蓝';
				}
            }else {
				const prs = this[analysisBody](that, point);

				// console.log('如果放入它的相反的颜色'+fix(p.getObject()).getResultName());
				// console.log(`得到的结果为:${prs.getResultName()}`);
				// 再取反，得到结果
				result = fix(prs);

				// msg = '获取上一列的相反结果:?'+ result.getResultName();
				// console.log(`取反后的结果为:${result.getResultName()}`)
            }
        }
        if (!this.isTest){
            log(msg);
        }
        return result;
    }

    /**
     * 原对比路头牌逻辑，(某些情况下有问题)
     * @param that
     * @param ps
     * @returns {*}
     */
    /*[analysisHead](that , p){
        let result = null;
        let msg = '';
        if (this.isEqHeight(p , that)){
            result = red();
            msg = '齐脚:红';
        }else {
            result = blue();
            msg = '不齐脚:蓝';
        }
        if (!this.isTest){
            log(msg);
        }
        return result;
    }*/

    /**
     * 每列2行后（路中牌）比较'碰点',没'碰点'后的下一行是否'重复'
     * @param that
     * @param p
     * @returns {*}
     */
    [analysisBody](that , p){
        let result = null;
        let msg = '';
        // 碰点划红
        if (this.isBump(p , that)){
            result = red();
            msg = '碰点:红';
        }
        // 没碰点后的下一行是否与前一行相同，相同为红，不同为蓝
        else if(this.isRepeat(p  , that)){
            result = red();
            msg = '没碰点，但重复:红';
        }else {
            result = blue();
            msg = '既没碰到，也不重复:蓝';
        }
        if (!this.isTest){
            log(msg);
        }
        return result;
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
        // 小路齐脚比前2,3列
        // 曱甴路齐脚比前3,4列
        return false;
    }

    // 是否碰点
    isBump(point , road){
        // 大眼仔碰点、重复看前1列
        // 小路碰点、重复看前2列
        // 曱甴路碰点、重复看前3列
        return false;
    }
    
    // 是否重复
    isRepeat(point  , road){
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
        this.isTest = true;
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

