
import Point from './Point'
import Suit from './Suit'

const CardFactory = {
    CARD_CACHE : {}
};
CardFactory.getCard = function(point , suit){
    let key = CardFactory.getKey(point , suit);
    return  CardFactory.CARD_CACHE[key];
}

CardFactory.getKey= function(point , suit){
    return ''+point.value + suit.value;
}

class Card{

    constructor(point , suit){
        this.point = point;
        this.suit = suit;
    }

    static getCard(point , suit){
        return CardFactory.getCard(point, suit);
    }

    getPoint(){
        return this.point;
    }

    getSuit(){
        return this.suit;
    }

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
CardFactory.putCard = function(point , suit){
    let key = CardFactory.getKey(point , suit);
    CardFactory.CARD_CACHE[key] = new Card(point , suit);
}

//一副牌的初始化
for (let p of Point.values()){
    for (let s of Suit.values()){
        //都是特别或者都是普通
        if(!(p.value > 20)^(s.value > 10)){
            CardFactory. putCard(p,s);
        }
    }
}

export default Card;