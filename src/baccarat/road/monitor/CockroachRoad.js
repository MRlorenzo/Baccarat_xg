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
		let {x, y} = point.getLocation();
        // 曱甴路起点位置 (4,2) | (5,1);
        return (x + y) >= 6;
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