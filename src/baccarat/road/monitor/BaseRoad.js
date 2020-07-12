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
	 	// 小路齐脚比前1,3列
	 	// 曱甴路齐脚比前3,4列
	 * @param point
	 * @param road
	 * @returns {boolean}
	 */
	isEqHeight(point , road){
		let x = point.root.x;
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
	 * @param pointList
	 * @param road
	 * @returns {boolean}
	 */
	isBump(point , pointList, road){
		let {x , y} = point.getLocation();
		// 点的横坐标应该以根节点为准
		let rootX = point.root.x;
		// 获取前x列的点的长度
		const pvx = this.getPrevColOffset();
		// 比较前列是否有点
		// '直线'部分
		if (rootX === x){
			x -= pvx;
			// 当前行
			const rows = pointList[y];
			// 如果在它前一个点存在即碰点。
			return rows !=null && rows[x] != null;
		}
		// '右拐'部分,(可能是因为超过6行而右拐也可能是受到其他列的影响)
		else {
			// 获取前x列的点的长度
			const pvx = this.getPrevColOffset();
			const plen = road.getColumnLength(rootX - pvx);
			// 这个点相对于这一列的长度
			const len = x - rootX + y;
			// 如果此列的高度小于或等于前1列的高度，那么说明碰点。
			return len <= plen;
		}
	}

	/**
	 * 是否重复
	 // 大眼仔碰点、重复看前1列
	 // 小路碰点、重复看前2列
	 // 曱甴路碰点、重复看前3列
	 * @param point
	 * @param pointList
	 * @param road
	 * @returns {boolean}
	 */
	isRepeat(point, pointList, road){
		let {x , y} = point.getLocation();
		// 点的横坐标应该以根节点为准
		let rootX = point.root.x;
		// 获取前x列的点的长度
		const pvx = this.getPrevColOffset();
		// (前1列)下一行是否与前一行相同
		// '直线'部分
		if (rootX === x){
			x -= pvx;
			let prev = pointList[y-1][x];
			let curr = pointList[y][x];
			// 全部是空也算重复,全部不是空也是
			return ((prev == null && curr == null) || (prev != null && curr != null));
		}
		// '右拐'部分,(可能是因为超过6行而右拐也可能是受到其他列的影响)
		else {
			// 获取前一列的点的长度
			const plen = road.getColumnLength(rootX - pvx);
			// 这个点相对于这一列的长度
			const len = x - rootX + y;
			// 如果不碰点，说明当前列肯定比前1列要长
			// 当前列比前1列多出1个格子以上时肯定是重复。
			return len - plen > 1;
		}

	}


}