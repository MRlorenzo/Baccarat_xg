/**
 * 游戏位置
 * @type {module.GamePosition}
 */
export default class GamePosition{

    constructor(){
        //当前坐标
        this.x = 0;
        this.y = -1;
        //当前列
        this.currCol= 0;
        //下一个互斥结果列
        this.nextDiffCol= 1
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getCurrCol(){
        return this.currCol;
    }

    getNextDiffCol(){
        return this.nextDiffCol;
    }

}