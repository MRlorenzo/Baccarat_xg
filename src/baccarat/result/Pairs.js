import { dataBean , enums } from "../../utils";

function toString() {
    return this.name;
}

const PairsEnum = enums({
	/**
	 * 庄对
	 */
	BP: dataBean({ index: 4 , name:'庄对'  , toString: toString }),
	/**
	 * 闲对
	 */
	PP: dataBean({ index :5 , name:'闲对' , toString: toString}),

	getPairs(index){
		for(let pairs of this.values()){
			if(index === pairs.index){
				return pairs;
			}
		}
		return null;
	}
})

export default PairsEnum;