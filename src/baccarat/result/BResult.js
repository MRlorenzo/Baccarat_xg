import { bean } from "../../utils";
const BResultEnum = (function () {return {
	/**
	 * 庄赢
	 */
	B: bean({index:1 , name: 'B'}),
	/**
	 * 闲赢
	 */
	P: bean({index:2 , name: 'P'}),
	/**
	 * 和
	 */
	T: bean({index:3 , name: 'T'}),

	getBResult(index){
		for(let bResult of this.values()){
			if(index === bResult.index){
				return bResult;
			}
		}
		return null;
	},

	values(){
		let list = [];
		for(let k in this){
			if(k !== 'values' && k!== 'getBResult'){
				list.push(this[k]);
			}
		}
		return list;
	}
}})();

Object.freeze(BResultEnum);

export default BResultEnum;