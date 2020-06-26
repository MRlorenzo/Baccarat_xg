import Card from './Card'
export default class CardResult{

    constructor(){
        this.index = 0;
        this.cards = [null , null , null];
    }

    /**
     * 放牌
     * @param card
     */
    put(card) {

        if (!(card instanceof Card)) {
            throw new Error('不是卡牌.');
        }
        if (!this.needDraw()) {
            return false;
        }
        this.cards[this.index++] = card;
        return true;
    }

    /**
     * 获得点数
     * @return
     */
    getPoint(){
        let sum = 0;
        for(let card of this.cards){
            if(card != null){
                let point = card.getPoint().getValue();
                sum += (point > 10 ? 0 : point);
            }
        }
        return sum % 10;
    }

    /**
     * 是否需要补牌<br/>
     * 自己3张牌的时候不用补,<br/>
     * 自己8.9点的时候不用补
     * @return boolean
     */
    needDraw(){
        if(this.index < 2){
            return true;
        }else if(this.getPoint() > 7){
            return false;
        }else if(this.index === 3){
            return false;
        }
        return null;
    }

    /**
     * 是否对子
     * @return boolean true是对子 false不是
     */
    isTie(){
        return this.index === 2 &&
            this.cards[0].point.value === this.cards[1].point.value;
    }

    clear(){
        this.index = 0;
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i] = null;
        }
    }

    /**
     * 获取名称
     */
    getName(){}

    /**
     * 获取编号
     */
    getCode(){}

    /**
     * 获取名称
     */
    getNameIndex(){}

    /**
     * 获取对子下标值
     */
    getPairsIndex(){}

}