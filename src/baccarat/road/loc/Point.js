/**
 * 存放点对象数据
 */
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
}
