import AngleEyeAnalysis from "./AngleEyeAnalysis";
import Card from '../../face/Card';
import Point from "../../face/Point";
import Suit from '../../face/Suit';

function getCard( datas ) {
	let [arg0 , arg1 , b] = datas;

	if ((b&0xff) !== 0x80){
		let point = Point.getPoint(b&0xf);
		let suit = Suit.getSuit((b>>4)&7);
		return Card.getCard(point, suit);
	}
	return null;
}

const init = Symbol();

/**
 * 扑克牌解析器
 */
export default class CardAnalysis extends AngleEyeAnalysis{
	constructor( completeData ){
		super(completeData);
		this[init]()
	}

	[init](){
		this.card = getCard(super.analysis());
	}

	getCard(){
		return this.card;
	}
}