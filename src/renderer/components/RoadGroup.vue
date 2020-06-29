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
                    ></big-road>

                </el-card>
            </el-row>

            <!--分割-->
            <div class="split-line"></div>

            <!--大眼路-->
            <!--<el-row>
                <el-card :style="styles.card">
                    <big-eye-load
                            class="big-eye-load"
                            :style="styles.bigEyeLoad"
                            :state="states.windowSizeVersion"
                            :resultList="loads.bigEyeResults"
                            :shine="states.shine"
                            :last-result="lastResult"
                            :language="language"
                            :bg-color="settings.backgroundColor"
                    >

                    </big-eye-load>
                </el-card>
            </el-row>-->

            <!--分割-->
            <div class="split-line"></div>

            <!--<el-row>
                <el-col :span="12">

                    <el-card :style="styles.card+'width:99%;margin:0 auto;'">
                        &lt;!&ndash;小路&ndash;&gt;
                        <small-load
                                class="small-load"
                                :style="styles.smallLoad"
                                :state="states.windowSizeVersion"
                                :resultList="loads.smallResults"
                                :shine="states.shine"
                                :last-result="lastResult"
                                :language="language"
                                :bg-color="settings.backgroundColor"
                        >

                        </small-load>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card :style="styles.card+'width:99%;margin:0 auto;'">
                        &lt;!&ndash;蟑螂路&ndash;&gt;
                        <cock-load
                                class="small-load"
                                :style="styles.smallLoad"
                                :state="states.windowSizeVersion"
                                :resultList="loads.cockroachResults"
                                :shine="states.shine"
                                :last-result="lastResult"
                                :language="language"
                                :bg-color="settings.backgroundColor"
                        >

                        </cock-load>
                    </el-card>
                </el-col>
            </el-row>-->

        </div>

    </el-main>
</template>

<script>

    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import RoadHeader from './RoadHeader';
    import BigRoad from './road/BigRoad';
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
            }
        },
        components: { RoadHeader , BigRoad },
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

    /*重新修改el-card样式*/
    .el-card__body{
        padding: 10px;
        border-radius: 6px;
    }
    .el-main{
        padding: 10px;
    }

    .zocial:before {
        font-family: 'zocial', sans-serif;
    }

    .zocial {
        *zoom: 1;
        filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FF000000', endColorstr='#FF000000');
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
        box-shadow: inset 0 0.3rem 0.2rem rgba(255, 255, 255, 0.2), inset 0 -0.3rem 0.2rem rgba(0, 0, 0, 0.2), 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
        cursor: pointer;
        text-align: center;
        text-shadow: 0 0.05rem rgba(0, 0, 0, 0.8), 0 0.3rem 0.4rem rgba(0, 0, 0, 0.2), 0 -0.2rem 0.4rem rgba(255, 255, 255, 0.2);
    }
    .zocial:active {
        -moz-transform: scale(0.98);
        -ms-transform: scale(0.98);
        -webkit-transform: scale(0.98);
        transform: scale(0.98);
    }

    .zocial:hover {
        *zoom: 1;
        filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FF000000', endColorstr='#FF000000');
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    }

    .zocial-shadow{
        /*box-shadow: 2px 2px 3px #226*/
    }

    .el-card{
        border-radius: 10px;
    }

    .split-line {
        margin-bottom: 10px;
        width: 100%
    }
</style>