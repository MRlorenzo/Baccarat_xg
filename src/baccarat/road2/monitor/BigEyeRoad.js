import RoadMonitor from "./RoadMonitor";

export default class BigEyeRoad extends RoadMonitor{

    /**
     * 是否起点
     * @param x
     * @param y
     * @returns {boolean}
     */
    isBoot(x , y){
        // 大眼仔起点位置 (2,2) | (3,1);
        return (x + y) >= 4;
    }

    /**
     * 是否齐脚
     * @param x
     * @param y
     * @param pointList
     * @returns {boolean}
     */
    isEqHeight(x ,y , pointList){
        // 大眼仔齐脚比前1,2列
        // 比较前列、前前列是否齐脚(相同的高度)

        let a = x-1, b = x-2;

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
        // 大眼仔碰点、重复看前1列
        // 比较前列是否有点
        --x;
        // 当前行
        const rows = pointList[y];
        return rows[x] != null;
    }

    isRepeat(x , y, pointList){
        // 大眼仔碰点、重复看前1列
        // (前1列)下一行是否与前一行相同
        --x;
        let prev = pointList[y-1][x];
        let curr = pointList[y][x];
        // 全部是空也算重复
        if (prev == null && curr == null){
            return true;
        }else{
            // 只有一个为空则肯定不重复
            if (prev == null || curr == null){
                return false;
            }else{

            }
        }
    }
}