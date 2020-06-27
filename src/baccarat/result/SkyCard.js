import { dataBean , enums } from "../../utils";

function toString() {
    return this.keyCode;
}

const SkyCardEnum = enums({
	/**
	 * 庄天牌
	 */
	B: dataBean({ index: 7 , name:'庄天牌' , keyCode:'+' , toString:toString }),
	/**
	 * 闲天牌
	 */
	P: dataBean({ index :8 , name:'闲天牌' , keyCode:'-' , toString:toString}),

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
	}
});

export default SkyCardEnum;
