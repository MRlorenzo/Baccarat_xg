import Color from './Color'
import { dataBean , enums } from "../../utils";

const SuitEnum = enums({
	/**
	 * 黑桃
	 */
	SPADE: dataBean({ color: Color.BLACK , value:3 , icon:'♠' }),
	/**
	 * 红心
	 */
	HEART: dataBean({ color: Color.RED , value:4 , icon:'♥' }),
	/**
	 * 梅花
	 */
	CLUB: dataBean({ color: Color.BLACK , value:2 , icon:'♣'}),
	/**
	 * 方块
	 */
	DIAMOND: dataBean({ color: Color.RED , value:1 , icon:'♦'}),
	/**
	 * 大王
	 */
	RED_JOKER: dataBean({ color: Color.RED , value:11 , icon:'大王'}),
	/**
	 * 小王
	 */
	BLACK_JOKER: dataBean({ color: Color.BLACK , value:12 , icon:'小王'}),
	getSuit(s){
		for(let suit of this.values()){
			if(s === suit.value){
				return suit
			}
		}
		return null;
	}
});

export default SuitEnum;