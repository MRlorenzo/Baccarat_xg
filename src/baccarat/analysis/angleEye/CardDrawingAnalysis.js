import CardAnalysis from "./CardAnalysis";
import { clone } from "../../../utils/index";
const _ = {
	banker: 'banker',
	player: 'player'
}
const res = {
	master: '', // banker or player
	index: 0 , // 第几张牌
}
const DIRECT = {
	NEW_BOOT: 'newBoot',
	DEFAULT: 'default'
}

function _allot(datas) {
	const [arg0 , b , arg1] = datas;
	const rs = clone(res);
	if(((b >>4)&1) === 1){
		rs.master = _.banker;
	}else {
		rs.master = _.player;
	}
	rs.index = (b & 0xf);
	return rs;
}
const init = Symbol();
/**
 * 解析荷官抽牌数据
 */
export default class CardDrawingAnalysis extends CardAnalysis{

	constructor( completeData ){
		super(completeData);
		this[init]();
	}

	[init](){
		this.lot = _allot(super.analysis());
	}

	/**
	 * 指令, 返回 'newBoot'代表此次抽牌为开新靴，否则返回'default'代表正常的抽牌
	 * @returns {string}
	 */
	direct(){
		let rs = DIRECT.DEFAULT;
		const lot = this.allot();
		// 如果发给闲的第0张牌可以解析卡片,则代表此次抽牌为开新靴操作
		// 注意，发牌顺序没有'第0张'，所有的发牌顺序以1开始。第0张牌不是发给player或者banker的.它用来代表开新靴。
		if (lot.master === _.player && lot.index === 0){
			const card = super.getCard();
			if (card != null){
				let count = card.getPoint().value;
				if (count > 10){
					count = 10;
				}
				console.log(`开新靴，抽掉${count}张牌`);
				rs = DIRECT.NEW_BOOT;
			}
		}

		return rs;
	}

	/**
	 * 获取发牌顺序
	 */
	allot(){
		return this.lot;
	}

}