import RoadMonitor from "./RoadMonitor";

export default class CockroackRoad extends RoadMonitor{

    /**
     * 是否起点
     * @param x
     * @param y
     * @returns {boolean}
     */
    isBoot(x , y){
        // 曱甴路起点位置 (4,2) | (5,1);
        return (x + y) >= 6;
    }

    /**
     * 是否齐脚
     * @param x
     * @param y
     * @param pointList
     * @returns {boolean}
     */
    isEqHeight(x , y, pointList){
        // 曱甴路齐脚比前3,4列
        let a = x-3, b = x-4;
        return super.checkEqHeight(a , b , pointList);
    }

    /**
     * 是否碰点
     * @param x
     * @param y
     * @param pointList
     * @returns {boolean}
     */
    isBump(x , y, pointList){
        // 曱甴路碰点、重复看前3列
        // 比较前前前列是否有点
        x -= 3;
        // 当前行
        const rows = pointList[y];
        return rows[x] != null;
    }

    isRepeat(x , y, pointList){
        // 曱甴路碰点、重复看前3列
    }
}