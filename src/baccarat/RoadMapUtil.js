//游戏结果

import GameResult from './GameResult'
//结果定义
import RD from './ResultDescription'
//游戏位置
import GamePosition from './GamePosition'

/**
 * 路单工具
 * @type {module.RoadMapUtil}
 */
export default class RoadMapUtil {

    constructor(){
        //原始数据列表
        this.dataList = new Array();
        //大路结果
        this.bigRoadResults = new Array();
    }

    //加入一个游戏结果
    push(result = new GameResult()){
        this.dataList.push(result);
    }

    //删除最后一个游戏结果
    pop(){
        this.dataList.pop();
    }

    //清空数据
    clear(){
        this.dataList = new Array();
    }

    //大路
    getBigRoad( {row , col } = { row:6 , col: 24 } ){
        let pos = new GamePosition();
        let list = [];
        for (let i = 0; i < row ; i++) {
            let subList = [];
            for (let j = 0; j < col ; j++) {
                subList.push(null);
            }
            list.push(subList);
        }

        this.dataList.map(result=>new RD(result)).forEach(des=>{

        })

        return list;
    }

    //大眼路
    getBigEyERoad(){

        return new Array();
    }

    //小路
    getSmallRoad(){

        return new Array();
    }

    //蟑螂路
    getCockroachRoad(){

        return new Array();
    }

}