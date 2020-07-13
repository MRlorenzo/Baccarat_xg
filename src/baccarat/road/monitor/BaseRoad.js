import RoadMonitor from "./RoadMonitor";

export default class BaseRoad extends RoadMonitor{
	constructor(){
		super();
	}

	/**
	 * 获取左脚偏移量
	 * @returns {number}
	 */
	getLeftFootOffset(){
		return 0;
	}

	/**
	 * 获取右脚偏移量
	 * @returns {number}
	 */
	getRightFootOffset(){
		return 0;
	}

	/**
	 * 获取对比前x列的偏移量
	 * @returns {number}
	 */
	getPrevColOffset(){
		return 0;
	}

	/**
	 * 是否齐脚
		// 大眼仔齐脚比前1,2列
	 	// 小路齐脚比前2,3列
	 	// 曱甴路齐脚比前3,4列
	 * @param point
	 * @param road
	 * @returns {boolean}
	 */
	isEqHeight(point , road){
		let {rootX} = point.getLocation();
		let x = rootX;
		// 左偏移
		let lf = this.getLeftFootOffset();
		// 右偏移
		let rf = this.getRightFootOffset();
		let al = road.getColumnLength(x - lf);
		let bl = road.getColumnLength(x - rf);
		return al === bl;
	}

	/**
	 * 是否碰点
	 // 大眼仔碰点、重复看前1列
	 // 小路碰点、重复看前2列
	 // 曱甴路碰点、重复看前3列
	 * @param point
	 * @param road
	 * @returns {boolean}
	 */
	isBump(point , road){
		let {rootX , rootY} = point.getLocation();
		// 点的横坐标应该以根节点为准
		// 比较前列是否有点

		// 获取前x列的点的长度
		const pvx = this.getPrevColOffset();
		const plen = road.getColumnLength(rootX - pvx);
		// 如果此列的高度小于或等于前1列的高度，那么说明碰点。
		return rootY <= plen;
	}

	/**
	 * 是否重复
	 // 大眼仔碰点、重复看前1列
	 // 小路碰点、重复看前2列
	 // 曱甴路碰点、重复看前3列
	 * @param point
	 * @param road
	 * @returns {boolean}
	 */
	isRepeat(point, road){
		let { rootX, rootY} = point.getLocation();
		// 点的横坐标应该以根节点为准
		// 获取前x列的点的长度
		const pvx = this.getPrevColOffset();
		// (前1列)下一行是否与前一行相同
		// 获取前一列的点的长度
		const plen = road.getColumnLength(rootX - pvx);
		// 这个点相对于这一列的长度
		// 如果不碰点，说明当前列肯定比前1列要长
		// 当前列比前1列多出1个格子以上时肯定是重复。
		return rootY - plen > 1;

	}


}