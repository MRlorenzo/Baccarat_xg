import Point from './Point'
import Suit from './Suit'

const CardFactory = {
	CARD_CACHE : {},
	getKey(point , suit){
		return ''+point.value + suit.value;
	},
    getCard(point , suit){
		let key = this.getKey(point , suit);
		return  this.CARD_CACHE[key];
    }
};

export default class Card{

    constructor(point , suit){
        this.point = point;
        this.suit = suit;
    }

	/**
     * 获取Card实例
	 * @param point
	 * @param suit
	 * @returns {*}
	 */
	static getCard(point , suit){
		return CardFactory.getCard(point , suit);
    }

	/**
	 * 获取Card实例
	 * @param json
	 * @returns {*}
	 */
	static getCardByJSONString( json ){
		let card = null;
		try{
			let { point , suit} = JSON.parse(json);
			let pointObj = Point.getPoint(point);
			let suitObj = Suit.getSuit(suit);
			card = new Card( pointObj , suitObj );
		}catch (e){}
		return card;
	}

    getPoint(){
        return this.point;
    }

    getSuit(){
        return this.suit;
    }

    toJson(){
        return JSON.stringify({
            point: this.point.value,
            suit : this.suit.value
        })
    }

    toString(){
        return '['+this.point.name + this.suit.icon + ']';
    }
}

//一副牌的初始化
for (let p of Point.values()){
	for (let s of Suit.values()){
		//都是特别或者都是普通
		if(!(p.value > 20)^(s.value > 10)){
			let key = CardFactory.getKey(p , s);
			CardFactory.CARD_CACHE[key] = new Card(p , s);
		}
	}
}