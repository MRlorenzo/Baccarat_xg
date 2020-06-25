import CompleteAnalysis from '../CompleteAnalysis';
/*
* 发牌结果
* */
export default class CardDrawingAnalysis extends CompleteAnalysis{
	constructor( completeData ){
		super(completeData);
		this.card = null;
		this.NEW_CAED = 0;
		//所属者(null:无 , true:banker , false:player)
		this.master = null;
		this.newBoot = false;
	}

	analysis() {
		/*let rs = "";
		let datas = this.data.getData();
		let [arg0 , b , arg1] = datas;
		if(((b >>4)&1) == 1){
			rs += "发给庄";
			this.master = true;
		}else {
			rs += "发给闲";
			this.master = false;
		}
		rs += "第" + (b &0xf) + "张牌";
		let card = this.getCard();
		if (card != null){
			rs += "：" + card;
		}
		if(this.NEW_CARD > 0 && (--this.NEW_CARD) == 0){
			console.log("开新靴结束");
		}
		//发给闲第0张牌
		if(((b >>4)&1) == 0 && (b &0xf) == 0 && card != null ){
			this.NEW_CARD = card.getPoint().value;
			if(this.NEW_CARD > 10){
				this.NEW_CARD = 10;
			}
			this.newBoot = true;
			console.log("开新靴，抽掉" + this.NEW_CARD + "张牌");
		}
		return rs;*/
	}

	isNewBoot(){
		return this.newBoot;
	}

	getMaster(){
		return this.master;
	}

	getCard(){
		/*let datas =this.data.getData();
		let [arg0 , arg1 , b] = datas;

		if ((b&0xff) != 0x80){
			let point = Point.getPoint(b&0xf);
			let suit = Suit.getSuit((b>>4)&7);
			return Card.getCard(point, suit);
		}
		return null;*/
	}
}