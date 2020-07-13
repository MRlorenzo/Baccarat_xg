import BaseRoad from "./BaseRoad";

export default class CockroachRoad extends BaseRoad{

	getName(){
		return 'CockroachRoad';
	}

    /**
     * 是否起点
     * @param point
     * @returns {boolean}
     */
    isBoot(point){
		let { rootX, rootY} = point.getLocation();
        // 曱甴路起点位置 (4,2) | (5,1);
		return (rootX>=4 && rootY >= 2) || (rootX>=5 && rootY >= 1);
    }

	getLeftFootOffset(){
		return 2;
	}

	getRightFootOffset(){
		return 4;
	}

	getPrevColOffset(){
		return 3;
	}
}