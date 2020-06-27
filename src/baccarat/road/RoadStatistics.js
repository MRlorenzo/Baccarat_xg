import BResultEnum from "../result/BResult";
import PairsEnum from "../result/Pairs";
import SkyCardEnum from "../result/SkyCard";
/**
 * 路子统计类
 */
export default class RoadStatistics{

    constructor(){
        this.reSet();
    }

    /**
     * 放入一个结果 统计
     * @param e BaccaratResult
     */
    pushRs(e){
        this.games++;
        //百家乐结果
        switch (e.getResult()){
            case BResultEnum.B:
				this.bCount++;
                break;
            case BResultEnum.P:
				this.pCount++;
                break;
            case BResultEnum.T:
				this.tCount++;
                break;
            default:
                break;
        }

        const pairs = e.getPairs();

        // 是否有对子
		pairs && pairs.forEach( p=>{
			switch (p){
				case PairsEnum.BP:
					this.bPCount++;
					break;
				case PairsEnum.PP:
					this.pPCount++;
					break;
				default:
					break;
			}
        });

		const skyCards = e.getSkyCards();

        //是否有天牌
		skyCards && skyCards.forEach(e => {
			switch (e){
				case SkyCardEnum.B:
					this.bSkyCard++;
					break;
				case SkyCardEnum.P:
					this.pSkyCard++;
					break;
				default:
					break;
			}
        });

        if (skyCards && (skyCards.length > 0)){
            this.skyCard++;
        }

        //是否庄6点赢
        if (e.isBankerSixWin()){
            this.bSixWin ++;
        }
    }


    /**
     * 移除一个结果 统计
     * @returns {*}
     */
    popRs(e){
		this.games--;
        //百家乐结果
        switch (e.getResult()){
            case BResultEnum.B:
				this.bCount--;
                break;
            case BResultEnum.P:
				this.pCount--;
                break;
            case BResultEnum.T:
				this.tCount--;
                break;
            default:
                break;
        }

        const pairs = e.getPairs();
        //是否有对子
		pairs && pairs.forEach(p => {
			switch (p){
				case PairsEnum.BP:
					this.bPCount--;
					break;
				case PairsEnum.PP:
					this.pPCount--;
					break;
				default:
					break;
			}
        });

		const skyCards = e.getSkyCards();
        //是否有天牌
		skyCards && skyCards.forEach(e => {
			switch (e){
				case SkyCardEnum.B:
					this.bSkyCard--;
					break;
				case SkyCardEnum.P:
					this.pSkyCard--;
					break;
				default:
					break;
			}
        });

        if (skyCards && (skyCards.length > 0)){
			this.skyCard--;
        }

        //是否庄6点赢
        if (e.isBankerSixWin()){
			this.bSixWin --;
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
