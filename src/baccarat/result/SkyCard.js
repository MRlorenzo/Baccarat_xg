import { bean } from "../../utils";

function toString() {
    return this.keyCode;
}

const SkyCardEnum = (function () {return {
	/**
	 * 庄天牌
	 */
	B: bean({ index: 7 , name:'庄天牌' , keyCode:'+' , toString:toString }),
	/**
	 * 闲天牌
	 */
	P: bean({ index :8 , name:'闲天牌' , keyCode:'-' , toString:toString}),

	getSkyCards:function(index){
		for(let pairs of this.values()){
			if(index === pairs.index){
				return pairs;
			}
		}
		return null;
	},

	getSkyCardByKeyCode (keyCode) {
		for(let pairs of this.values()){
			if(keyCode === pairs.keyCode){
				return pairs;
			}
		}
		return null;
	},

	values(){
		let list = [];
		for(let k in this){
			if(k !== 'values' && k!== 'getSkyCards' && k!== 'getSkyCardByKeyCode'){
				list.push(this[k]);
			}
		}
		return list;
	}
}})();

Object.freeze(SkyCardEnum);

export default SkyCardEnum;
