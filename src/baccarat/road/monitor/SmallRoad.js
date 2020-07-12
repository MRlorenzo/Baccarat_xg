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
		let {x, y} = point.getLocation();
        // 小路起点位置 (3,2) | (4,1);
        return (x + y) >= 5;
    }

	getLeftFootOffset(){
		return 1;
	}

	getRightFootOffset(){
		return 3;
	}

	getPrevColOffset(){
		return 2;
	}
}