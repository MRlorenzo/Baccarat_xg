/**
 * 存放点对象数据
 */
import Pairs from "../../result/Pairs";

export default class Point {

	constructor(x, y, brs) {
		this.x = x; // x坐标
		this.y = y; // y坐标
		this.z = brs; // BaccaratResult
		this.location = {
			x: x,
			y: y,
			rootX: x, //逻辑横坐标(忽略列的高度)
			rootY: y // 逻辑纵坐标(忽略列的高度)
		};
		this.tie = []; // Array<Pairs>
		this.isRoot = false;
		this.isForce = false;
		this.fs = ()=>{}
	}

	/**
	 * 修正逻辑坐标
	 * @param x
	 * @param y
	 */
	setRootXY(x , y){
		this.location.rootX = x;
		this.location.rootY = y;
	}

	/**
	 * 获取结果的id,如果这个点全都是‘和局’，那么 this.z==null 为 true
	 * @returns {*}
	 */
	getResultId(){
		if (this.z == null){
			return null;
		}
		return this.z.getId();
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	getObject(){
		return this.z;
	}

	setObject( z ){
		this.z = z;
		this.fs(z);
	}

	onFirstEmptyChange(fn){
		if (typeof fn === 'function'){
			this.fs = fn;
		}
	}

	getLocation(){
		return this.location;
	}

	getTie(){
		return this.tie;
	}

	setTie( tie ){
		this.tie = tie;
	}

	addTie( ti ){
		this.tie.push(ti);
	}

	isFirstPoint(){
		return this.x === 1 && this.y === 1;
	}

	isBankerPair(){

		if (this.z == null){
			return tieHas(this.tie , Pairs.BP.index)
		}

		if (this.isFirstPoint()){
			return rsPairsIs(this.z , Pairs.BP.index)
		}else {
			if (this.tie && this.tie.length > 0){
				return tieHas(this.tie , Pairs.BP.index)
			}else{
				return rsPairsIs(this.z, Pairs.BP.index)
			}
		}

	}

	isPlayerPair(){

		if (this.z == null){
			return tieHas(this.tie , Pairs.PP.index)
		}

		if (this.isFirstPoint()){
			return rsPairsIs(this.z , Pairs.PP.index)
		}else {
			if (this.tie && this.tie.length > 0){
				return tieHas(this.tie , Pairs.PP.index)
			}else{
				return rsPairsIs(this.z, Pairs.PP.index)
			}
		}
	}

	isSkyCard(){
		if (this.z == null){
			return false;
		}
		return this.z.getSkyCards().length > 0
	}
}

function tieHas( tie , flag ) {
	if (tie == null || tie.length === 0){
		return 0;
	}
	const last = tie[tie.length -1];
	return rsPairsIs(last , flag);
}

function rsPairsIs( rs , flag) {
    const pairs = rs.getPairs();
    if (pairs == null){
        return false;
    }else {
        return pairs.some(p=> p.index === flag);
    }
}