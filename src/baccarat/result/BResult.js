import { enums , dataBean } from "../../utils";
const BResultEnum = enums({
	/**
	 * 庄赢
	 */
	B: dataBean({index:1 , name: 'B'}),
	/**
	 * 闲赢
	 */
	P: dataBean({index:2 , name: 'P'}),
	/**
	 * 和
	 */
	T: dataBean({index:3 , name: 'T'}),

	getBResult(index){
		for(let bResult of this.values()){
			if(index === bResult.index){
				return bResult;
			}
		}
		return null;
	}
})

export default BResultEnum;