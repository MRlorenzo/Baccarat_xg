import Color from './Color'
const SuitEnum = {
    /**
     * 黑桃
     */
    SPADE:{ color: Color.BLACK , value:3 , icon:'♠' },
    /**
     * 红心
     */
    HEART:{ color: Color.RED , value:4 , icon:'♥' },
    /**
     * 梅花
     */
    CLUB:{ color: Color.BLACK , value:2 , icon:'♣'},
    /**
     * 方块
     */
    DIAMOND:{ color: Color.RED , value:1 , icon:'♦'},
    /**
     * 大王
     */
    RED_JOKER:{ color: Color.RED , value:11 , icon:'大王'},
    /**
     * 小王
     */
    BLACK_JOKER:{ color: Color.BLACK , value:12 , icon:'小王'},
    getSuit:function(s){
        for(let suit of this.values()){
            if(s === suit.value){
                return suit
            }
        }
        return null;
    },
    values:function(){
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