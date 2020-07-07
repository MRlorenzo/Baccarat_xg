/**
 * 存放点对象数据
 */
export default class Point {

	constructor(x, y, brs) {
		this.x = x; // x坐标
		this.y = y; // y坐标
		this.z = brs; // BaccaratResult
		this.location = {x: x, y: y};
		this.tie = []; // Array<Pairs>
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
