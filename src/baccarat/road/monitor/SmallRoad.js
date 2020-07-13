import BaseRoad from "./BaseRoad";

export default class SmallRoad extends BaseRoad{

	getName(){
		return 'SmallRoad';
	}

    /**
     * 是否起点
     * @param point
     * @returns {boolean}
     */
    isBoot(point){
		let {rootX, rootY} = point.getLocation();
        // 小路起点位置 (3,2) | (4,1);
		return (rootX>=3 && rootY >= 2) || (rootX>=4 && rootY >= 1);
    }

	getLeftFootOffset(){
		return 2;
	}

	getRightFootOffset(){
		return 3;
	}

	getPrevColOffset(){
		return 2;
	}
}