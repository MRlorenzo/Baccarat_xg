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
		let { rootX, rootY} = point.getLocation();
        // 大眼仔起点位置 (2,2) | (3,1);
        return (rootX>=2 && rootY >= 2) || (rootX>=3 && rootY >= 1);
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