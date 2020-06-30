<template>
    <el-main>
        <div class="box">

            <!-- 珠盘路,庄家输赢汇总,桌号和下局指示,公司logo -->
            <road-header
                    :styles="styles"
                    :bead-results="beadResults"
                    :last-result="lastResult"
                    :shine="shine"
                    :size-version="sizeVersion"
                    :road-next-test="roadNextTest"
                    :game-count-list="gameCountList"
                    :settings="settings"
                    :game-count="gameCount"
            ></road-header>

            <!--分割-->
            <div class="split-line"></div>

            <!-- 大路 -->
            <el-row>
                <el-card :style="styles.card">
                    <big-road
                            :style="styles.bigLoad"
                            :point-list="bigRoadResults"
                            :last-result="lastResult"
                            :shine="shine"
                            :size-version="sizeVersion"
                            :bg-color="bgColor"
                    ></big-road>

                </el-card>
            </el-row>

            <!--分割-->
            <div class="split-line"></div>

            <!--大眼路-->
            <el-row>
                <el-card :style="styles.card">
                    <big-eye-road
                            class="big-eye-load"
                            :style="styles.bigEyeLoad"
                            :point-list="bigEyeRoadResults"
                            :shine="shine"
                            :last-result="lastResult"
                            :size-version="sizeVersion"
                            :bg-color="bgColor"
                    >

                    </big-eye-road>
                </el-card>
            </el-row>

            <!--分割-->
            <div class="split-line"></div>

            <el-row>
                <el-col :span="12">

                    <el-card :style="styles.card + 'width:99%;margin:0 auto;' ">
                        <!--小路-->
                        <small-road
                                class="small-load"
                                :style="styles.smallLoad"
                                :point-list="smallRoadResults"
                                :shine="shine"
                                :last-result="lastResult"
                                :size-version="sizeVersion"
                                :bg-color="bgColor"
                        >

                        </small-road>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card :style="styles.card + 'width:99%;margin:0 auto;' ">
                        <!--蟑螂路-->
                        <cock-road
                                class="small-load"
                                :style="styles.smallLoad"
                                :point-list="cockRoadResults"
                                :shine="shine"
                                :last-result="lastResult"
                                :size-version="sizeVersion"
                                :bg-color="bgColor"
                        >

                        </cock-road>
                    </el-card>
                </el-col>
            </el-row>

        </div>

    </el-main>
</template>

<script>
    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import RoadHeader from './RoadHeader';
    import BigRoad from './road/BigRoad';
    import BigEyeRoad from './road/BigEyeRoad'
    import CockRoad from './road/CockRoad';
    import SmallRoad from './road/SmallRoad';
    export default {
        name: "road-group",
        props: {
        	// 是否闪烁
            shine: {
                type: Boolean
            },
            // 样式
            styles: {
                type: Object,
                required: true
            },
            // 窗口大小的版本
            sizeVersion: {
            	type: Number,
                default: 0
            },
            // 珠子路结果
            beadResults: {
                type: Array,
                required: true
            },
			/**
			 * 路单的pointList
			 * {
             *  BigEyeRoad: [[]],
             *  BigRoad: [[]],
             *  ...
             * }
			 */
            roadResults: {
            	type: Object,
                default: {}
            },
			/**
			 * 下路指示
			 * {
             *  SmallRoad: { banker: baccaratResult, player: baccaratResult},
             *  ...
             * }
			 */
			roadNextTest: {
            	type: Object,
                default: {}
            },
            // 最后一个结果
            lastResult: {
                type: BaccaratResult
            },
            /*游戏统计数据*/
            gameCountList: {
                type: Array,
                required: true
            },
            /*用户配置*/
			settings: {
				type: Object,
				required: true
			},
			// 游戏局数
			gameCount: {
				type: Number,
				default: 0
			}
        },
		computed: {
			bgColor(){
				return this.settings && this.settings.backgroundColor;
			}
		},
        components: {
            RoadHeader ,
            BigRoad,
            BigEyeRoad,
            CockRoad,
            SmallRoad
        },
        data(){
        	return {
        		bigRoadResults: [],
                bigEyeRoadResults: [],
                cockRoadResults: [],
                smallRoadResults: []
            }
        },
        watch: {
			roadResults( results ){
				const {
					BigRoad,
					BigEyeRoad,
					CockroachRoad,
					SmallRoad
                } = results;

				this.bigRoadResults = BigRoad || [];
				this.bigEyeRoadResults = BigEyeRoad || [];
				this.cockRoadResults = CockroachRoad || [];
				this.smallRoadResults = SmallRoad || [];
            }
        }
    }
</script>
<style>
    /*重新修改el-card样式*/
    .el-card__body{
        padding: 10px;
        border-radius: 6px;
    }
    .el-main{
        padding: 10px;
    }
    /*.el-table__row{*/
        /*height: 50px;*/
    /*}*/
    .el-card{
        border-radius: 10px;
    }
</style>

<style src="../assest/css/main.css"></style>

<style>
    .split-line {
        margin-bottom: 10px;
        width: 100%
    }
    /*路子的名称*/
    .load-name{
        position: absolute;
        right: 20px;
        bottom: 0px;
        color: #CDB79E;
        font-size: 40px;
    }

    /*路子的统一样式*/
    .big-load,
    .small-load,
    .big-eye-load,
    .bead-load{
        width: 100%;
        position: relative;
    }

    /*大路样式*/
    .big-load{
        min-height: 100px;
        height: 0;
    }

    /*小路样式*/
    .small-load{
        min-height: 100px;
        height: 0;
    }

    /*大眼路样式*/
    .big-eye-load{
        min-height: 100px;
        height: 0;
    }

    /*珠子路样式*/
    .bead-load{
        min-height: 100px;
        height: 0;
    }

    /*路子里面的表格*/
    .load table{
        border-collapse: collapse;
        margin: 0 auto;
        position: relative;
        z-index: 2;
    }
    /*路子表格tr*/
    .load table tr{
        overflow: hidden;
        padding: 0;
        margin: 0;
        border-spacing: 0;
    }
    /*路子表格td*/
    .load table tr td{
        border: #000 1px solid ;
        border-spacing: 0px;
        padding: 0;
        margin: 0;
        /*border-color:#8B668B;*/
    }
</style>