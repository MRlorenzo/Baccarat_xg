import BResultEnum from "../result/BResult";
import PairsEnum from "../result/Pairs";
import SkyCardEnum from "../result/SkyCard";
/**
 * 路子统计类
 */
export default class LoadStatistics{

    constructor(){
        this.reSet();
    }

    /**
     * 放入一个结果 统计
     * @param e
     */
    pushRs(e){
        let that = this;
        that.games++;
        //百家乐结果
        switch (e.result){
            case BResultEnum.B:
                that.bCount++;
                break;
            case BResultEnum.P:
                that.pCount++;
                break;
            case BResultEnum.T:
                that.tCount++;
                break;
            default:
                break;
        }

        e.pairs&&e.pairs.forEach(function (p) {
            switch (p){
                case PairsEnum.BP:
                    that.bPCount++;
                    break;
                case PairsEnum.PP:
                    that.pPCount++;
                    break;
                default:
                    break;
            }
        });

        //是否有天牌
        e.skyCards && e.skyCards.forEach(function (e) {
            switch (e){
                case SkyCardEnum.B:
                    that.bSkyCard++;
                    break;
                case SkyCardEnum.P:
                    that.pSkyCard++;
                    break;
                default:
                    break;
            }
        });

        if (e.skyCards && (e.skyCards.length > 0)){
            that.skyCard++;
        }

        //是否庄6点赢
        if (e.bSixWin){
            that.bSixWin ++;
        }
    }


    /**
     * 移除一个结果 统计
     * @returns {*}
     */
    popRs(e){
        let that = this;
        that.games--;
        //百家乐结果
        switch (e.result){
            case BResultEnum.B:
                that.bCount--;
                break;
            case BResultEnum.P:
                that.pCount--;
                break;
            case BResultEnum.T:
                that.tCount--;
                break;
            default:
                break;
        }

        //是否有对子
        e.pairs&&e.pairs.forEach(function (p) {
            switch (p){
                case PairsEnum.BP:
                    that.bPCount--;
                    break;
                case PairsEnum.PP:
                    that.pPCount--;
                    break;
                default:
                    break;
            }
        });

        //是否有天牌
        e.skyCards && e.skyCards.forEach(function (e) {
            switch (e){
                case SkyCardEnum.B:
                    that.bSkyCard--;
                    break;
                case SkyCardEnum.P:
                    that.pSkyCard--;
                    break;
                default:
                    break;
            }
        });

        if (e.skyCards && (e.skyCards.length > 0)){
            that.skyCard--;
        }

        //是否庄6点赢
        if (e.bSixWin){
            that.bSixWin --;
        }
    }


    /**
     * 清除计数器
     */
    reSet(){
        // 当前游戏局数
        this.games = 0;
        //庄赢出现多少局
        this.bCount = 0;
        //闲赢出现多少局
        this.pCount = 0;
        //和出现多少局
        this.tCount = 0;
        //庄对出现多少局
        this.bPCount = 0;
        //闲对出现多少局
        this.pPCount = 0;
        //天牌
        this.skyCard = 0;
        //庄天牌
        this.bSkyCard = 0;
        //闲天牌
        this.pSkyCard = 0;
        //庄6点赢
        this.bSixWin = 0;
    }
}
