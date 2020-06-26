import Color from './Color'
import { bean } from "../../utils";

const SuitEnum = {
    /**
     * 黑桃
     */
    SPADE: bean({ color: Color.BLACK , value:3 , icon:'♠' }),
    /**
     * 红心
     */
    HEART: bean({ color: Color.RED , value:4 , icon:'♥' }),
    /**
     * 梅花
     */
    CLUB: bean({ color: Color.BLACK , value:2 , icon:'♣'}),
    /**
     * 方块
     */
    DIAMOND: bean({ color: Color.RED , value:1 , icon:'♦'}),
    /**
     * 大王
     */
    RED_JOKER: bean({ color: Color.RED , value:11 , icon:'大王'}),
    /**
     * 小王
     */
    BLACK_JOKER: bean({ color: Color.BLACK , value:12 , icon:'小王'}),
    getSuit(s){
        for(let suit of this.values()){
            if(s === suit.value){
                return suit
            }
        }
        return null;
    },
    values(){
        let list = [];
        for(let k in this){
            if(k !== 'values' && k!== 'getSuit'){
                list.push(this[k]);
            }
        }
        return list;
    }
}

//不能向对象中新添加属性和方法
Object.freeze(SuitEnum);

export default SuitEnum;