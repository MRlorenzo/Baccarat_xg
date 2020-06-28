import Road from "./Road";
import BResult from "../result/BResult";
import Point from "./Point";
import BaccaratResult from "../result/BaccaratResult";
import {clone} from "../../utils";

/**
 * 大路
 */
export default class BigRoad extends Road{

    constructor(arr){
        super(arr);
        let
            //有高度柱状
            rsa = this.rsa = [],
            //每一列的最大高度
            colHeight = this.colHeight = [],
            HEIGHT = this.HEIGHT = 6;
            this.monitors = [],
            this.monitorMap = {};

        //去除超过高度的 开始
		this.noHeightWay.forEach(function (p) {
            let x = p.x, y = p.y, height = colHeight[x];
            rsa[y] = rsa[y]||[];
            if (rsa[y][x] && !height){
                height = colHeight[x++] = y - 1;
            }
            if (!height){
                height = HEIGHT;
            }
            if (y > height){
                y = height;
                do{ x++; } while (rsa[y][x]);
            }
            rsa[y][x] = p;
            p.location = {x:x,y:y};
        });
        //去除超过高度的 结束
    }

    push(e){
        //无高度数据的放入
        let p = super.push(e);

        if(p){//是否占位，包括第一局是和（特殊）。
            //有高度的数据处理
            let x = p.x, y = p.y, that = this, colHeight = that.colHeight, height = colHeight[x], rsa = that.rsa, HEIGHT = that.HEIGHT;
            rsa[y] = rsa[y]||[];
            //console.log(`x:${x} y:${y} , height:${height}`);
            if (rsa[y][x] && !height){
                height = colHeight[x] = y - 1;
            }

            if (!height ){
                height = HEIGHT;
            }

            if (y > height){
                y = height;
                rsa[y] = rsa[y]||[];
                do { x++;}while (rsa[y][x])
            }
            //console.log(`set x:${x} set y:${y}`);
            rsa[y][x] = p;
            p.location = {x:x,y:y};
        }
        this.executeMonitor("push", p);
    }

    testPushBanker(name){
        let result = BaccaratResult.getResult( BResult.B );
        return this.testPush(result , name);
    }

    testPushPlayer( name ){
        let result = BaccaratResult.getResult( BResult.P );
        return this.testPush(result , name);
    }

    /**
     * 测试开出某个结果,返回放成功的点
     * @param e
     */
    testPush(e, name){
        if (name){
            return this.monitorMap[name].testPush(this, e);
        }else{
            let previous = this.last(), p;
            let x = previous && previous.x||0, y = previous && previous.y||0;
            //放入 珠盘路
            if (e.result !== BResult.T){
                if (previous && (!previous.z)){//首次出现和局
                    y = 1;
                }else if (previous && previous.z.result === e.result ){//同类
                    y++;
                }else {
                    x++;
                    y = 1;
                }
                p = new Point(x,y,e);
            }
            return p;
        }
    }

    pop(){
        let that = this;
        if (that.games === 1 ){
            //只有一个结果的时候开启新的一局
            that.newGame();
        }else{
            let p = super.pop(), colHeight = that.colHeight;
            //that.rsa[p.location.y].splice(p.location.x , 1 , null)
            p && p.t  && (that.rsa[p.location.y][p.location.x] = p.t.length > 0 ? p : null);
            p && colHeight[p.x] === p.y && (colHeight[p.x]=null);//高度限制解除
            this.executeMonitor("pop", p);
            return p;
        }
    }

    //开始新的一局
    newGame() {
        super.newGame();
        this.rsa = [];
        this.colHeight = [];
        this.executeMonitor("newGame");
    };

    addMonitor(monitor, name){
        monitor.load(this);
        this.monitors.push(monitor);
        this.monitorMap[name] = monitor;
    }

    getResults(name){
        if (name){
            return this.monitorMap[name].getResults();
        }
        return this.rsa;
    }

    executeMonitor(name, val){
        let that = this;
        that.monitors.forEach(function (e) {
            e[name](that, val);
        })
    }

    updateResult(){
        const result = {} , nextTest = {};
        result.BigRoad = [...this.rsa];
        Object.keys(this.monitorMap).forEach(name => {
            const rsa = this.getResults(name);
            result[name] = [...rsa];
            nextTest[name] = {
                banker: this.testPushBanker(name),
                player: this.testPushPlayer(name)
            }
        });

        return { result , nextTest};
    }
}
