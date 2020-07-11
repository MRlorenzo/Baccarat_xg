import RoadMonitor from "./RoadMonitor";

export default class SmallRoad extends RoadMonitor{

    /**
     * 是否起点
     * @param x
     * @param y
     * @returns {boolean}
     */
    isBoot(x , y){
        // 小路起点位置 (3,2) | (4,1);
        return (x + y) >= 5;
    }

    /**
     * 是否齐脚
     * @param x
     * @param y
     * @param pointList
     * @returns {boolean}
     */
    isEqHeight(x , y, pointList){
        // 小路齐脚比前1,3列
        let a = x-1, b = x-3;
        return super.checkEqHeight(a,b, pointList);
    }

    /**
     * 是否碰点
     * @param x
     * @param y
     * @param pointList
     * @returns {boolean}
     */
    isBump(x , y, pointList){
        // 小路碰点、重复看前2列
        // 比较前前列是否有点
        x -= 2;
        // 当前行
        const rows = pointList[y];
        return rows[x] != null;
    }

    isRepeat(x , y, pointList){
        // 小路碰点、重复看前2列
    }
}