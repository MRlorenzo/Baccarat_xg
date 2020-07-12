import BaseRoad from "./BaseRoad";

export default class BigEyeRoad extends BaseRoad{

	getName(){
		return 'BigEyeRoad';
	}

    /**
     * 是否起点
     * @param point
     * @returns {boolean}
     */
    isBoot(point){
		let {x, y} = point.getLocation();
        // 大眼仔起点位置 (2,2) | (3,1);
        return (x + y) >= 4;
    }

    getLeftFootOffset(){
    	return 1;
	}

	getRightFootOffset(){
    	return 2;
	}

	getPrevColOffset(){
    	return 1;
	}
}