import { bean } from "../../utils";

function toString() {
    return this.name;
}

const PairsEnum = (function () {return {
	/**
	 * 庄对
	 */
	BP: bean({ index: 4 , name:'庄对'  , toString: toString }),
	/**
	 * 闲对
	 */
	PP: bean({ index :5 , name:'闲对' , toString: toString}),

	getPairs(index){
		for(let pairs of this.values()){
			if(index === pairs.index){
				return pairs;
			}
		}
		return null;
	},

	values(){
		let list = [];
		for(let k in this){
			if(k !== 'values' && k!== 'getPairs'){
				list.push(this[k]);
			}
		}
		return list;
	}
}})()

Object.freeze(PairsEnum);

export default PairsEnum;