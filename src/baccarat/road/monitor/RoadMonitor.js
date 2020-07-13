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
        let msg = '';
        let result = null;
        // 每列第一行即‘路头牌’
		/**
		 * ”路头牌”之后在大眼仔上添加的颜色应该是假设大路中
		 * 上一列继续的情况下我们本应在大眼仔上添加的颜色的相反颜色
		 * 如果一个”路头牌”之后紧接着是另一手”路头牌”呢？
		 * 在大眼仔上单跳局面的前两手牌添加的标记颜色可红可蓝，
		 * 取决于之前两列的长度，可一旦进行到单跳的第三手牌及之后，
		 * 在大眼仔上添加的颜色必定是红色。
		 * 只要这个牌靴继续单跳，大眼仔就必定继续填入一连串的红色。
		 * link:https://wgm8.com/szh-fate-in-the-cards-understanding-baccarat-trends-part-2/
		 */
        if (p.isRoot){
        	// 最后一个
        	const last = this.road.getLastPoint();
        	// 如果没有最后一个，就比较齐脚
			if (last == null){
				if (this.isEqHeight(p, that)){
					result = red();
					msg = '齐脚:红';
				}else{
					result = blue();
					msg = '不齐脚:蓝';
				}
			}else{
				if (last.getLocation().rootY === 1){
					// 倒数第二个
					const last2 = this.road.getBackwards(-2);
					// 倒数第1,2个都是‘路头牌’，必定是红色
					if (last2 != null && last2.getLocation().rootY === 1){
						result = red();
						msg = '连续单跳:红'
					}
					// 单跳要对比‘齐脚’
					else {
						if (this.isEqHeight(p, that)){
							result = red();
							msg = '齐脚:红';
						}else{
							result = blue();
							msg = '不齐脚:蓝';
						}
					}
				}
				// 最后一个不是路头牌
				else{
					/**
					 * ”路头牌”之后在大眼仔上添加的颜色应该是假设大路中
					 * 上一列继续的情况下我们本应在大眼仔上添加的颜色的相反颜色
					 * */
						// 由于路头牌绝对是前一个结果相反的，因此可以看下这个点的结果是庄还是闲
						// 然后将它取反，得到一个结果，看看将它放下去后的结果是什么
					const prs = this.testPush(that, p.getObject());
					// 相反的结果
					result = fix(prs);
					msg = '获取上一列的相反结果:?';
				}
			}
        }
        // 每列2行后比较'碰点',没'碰点'后的下一行是否'重复'
        else {
			let pointList = that.getResults();
            // 碰点划红
            if (this.isBump(p , pointList , that)){
				result = red();
				msg = '碰点:红';
            }
            // 没碰点后的下一行是否与前一行相同，相同为红，不同为蓝
            else if(this.isRepeat(p , pointList , that)){
				result = red();
				msg = '没碰点，但重复:红';
            }else {
				result = blue();
				msg = '既没碰到，也不重复:蓝';
            }
        }
        // 为了方便找到目标，将解析后的结果设置同样的id
        result.setId(p.getResultId());
		log(msg);
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
const isDev = process.env.NODE_ENV === 'development';
function log(msg) {
    if (isDev){
		console.log(msg);
    }
}

function logP(p , result) {
	if (isDev){
		const rsName = result.getResult().getName();
		const {x,y,rootX,rootY} = p.getLocation();
		if (x === rootX){
			console.warn(`${rsName}:放入(${x},${y})`)
		}else{
			console.warn(`${rsName}:原:(${rootX},${rootY})放入(${x},${y})`)
		}
    }
}

function fix( rs ) {
	switch (rs.getResult()){
		case BResult.B:
			return blue();
		case BResult.P:
			return red();
	}
}