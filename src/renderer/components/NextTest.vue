<template>
    <div id="table-panel">
        <span class="table-name-text">{{tableName}}</span> <span class="text">{{number}}</span>
        <hr :style="hrStyle">
        <el-table
                :data="list"
                :show-header="false"
                :style="tableStyle"
                :border="true"
                :cell-style="cellStyle"
                :row-style="rowStyle"
        >
            <el-table-column  align="center">
                <template slot-scope="scope">

                    <bead-road-grid
                            v-if="scope.row.type ==='bead'"
                            :item-css="itemCss"
                            :result="scope.row.banker"
                    >

                    </bead-road-grid>

                    <small-road-grid v-if="scope.row.type==='SmallRoad'" v-show="scope.row.banker"
                                     :result="scope.row.banker"
                                     :item-css="itemCss">

                    </small-road-grid>

                    <big-eye-road-grid v-if="scope.row.type==='BigEyeRoad'" v-show="scope.row.banker"
                                       :result="scope.row.banker"
                                       :item-css="itemCss">
                    </big-eye-road-grid>

                    <cock-road-grid v-if="scope.row.type==='CockroachRoad'" v-show="scope.row.banker"
                                    :result="scope.row.banker"
                                    :item-css="itemCss"
                                    enlarge="1.5">

                    </cock-road-grid>

                </template>

            </el-table-column>

            <el-table-column  align="center" >

                <template slot-scope="scope">

                    <bead-road-grid
                            v-if="scope.row.type ==='bead'"
                            :item-css="itemCss"
                            :result="scope.row.player"
                    >

                    </bead-road-grid>

                    <span v-if="scope.row.type ==='text'" class="banker-and-player">{{scope.row.player}}</span>

                    <small-road-grid v-if="scope.row.type ==='SmallRoad'" v-show="scope.row.banker"
                                     :result="scope.row.player"
                                     :item-css="itemCss">
                    </small-road-grid>

                    <big-eye-road-grid v-if="scope.row.type==='BigEyeRoad'" v-show="scope.row.banker"
                                       :result="scope.row.player"
                                       :item-css="itemCss">
                    </big-eye-road-grid>

                    <cock-road-grid v-if="scope.row.type ==='CockroachRoad'" v-show="scope.row.banker"
                                    :result="scope.row.player"
                                    :item-css="itemCss"
                                    enlarge="1.5">
                    </cock-road-grid>

                </template>

            </el-table-column>

        </el-table>

    </div>
</template>

<script>
    import BeadRoadGrid from './road/grid/BeadRoadGrid';
    import BigEyeRoadGrid from './road/grid/BigEyeRoadGrid';
    import SmallRoadGrid from './road/grid/SmallRoadGrid';
    import CockRoadGrid from './road/grid/CockRoadGrid';
    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import BResult from "../../baccarat/result/BResult";
	import {clone} from "../../utils";
    export default {
        /*下路指示*/
        name: "next-test",
        props: {
        	// 桌号
        	tableName: { type: String },
            // 靴号
            bootNo: { type: Number },
            // 游戏局数
            gameCount: { type: Number },
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
            bgColor:{type:String}
        },
        components: {
            BigEyeRoadGrid,
            BeadRoadGrid ,
            SmallRoadGrid,
            CockRoadGrid
        },
        data(){
            return {
                tableStyle: `width: 200px;height:10.5vw;margin:0 auto;`,
                bgStyles: { backgroundColor: 'rgba(255,255,255,0)'},
				itemCss: `width:2vw;height:2vw;margin: 0 auto;font-size:1.5vw;line-height:2vw;font-family: "Microsoft YaHei"`
            }
        },
        computed:{
            number(){
				return `#${this.bootNo}-${this.gameCount}`;
            },
            list(){

                let d = this.roadNextTest;

                let results = [{
                    type:'bead',
                    banker: BaccaratResult.getResult( BResult.B ),
                    player: BaccaratResult.getResult( BResult.P )
                }];

				Object.keys(d).forEach(k => {
					const v = d[k];
					const {banker , player} = v;
					results.push({
						type: k,
						banker,
						player
					})
				})

                return results ;
            },
            hrStyle(){
                return `'border-color: ${this.bgColor};'`
            }
        },
        methods:{
            cellStyle({row, column, rowIndex, columnIndex}){
                return { border: 'hidden'};
            },
            rowStyle({row, rowIndex}){
                return clone({ height: '2.6vw'} , this.bgStyles);
            }
        }
    }
</script>
<style>

</style>
<style scoped>

    span{
        width: 100%;
        text-align: center;
        display: block;
    }

    .banker-and-player{
        font-size: 30px;
        line-height: 30px;
    }

    .table-name-text{
        display: inline-block;
        width: 35%;
        color: black;
        /*color:darkviolet;*/
        font-size: 2.2vw;
        line-height: 1.4vw;
        font-weight:bold;
        /*animation:shine 3s ease infinite;*/
    }

    @keyframes shine {
        0% {opacity: 0}
        10% {opacity: 0.15}
        20% {opacity: 0.3}
        30% {opacity: 0.45}
        40% {opacity: 0.6}
        50% {opacity: 0.8}
        75% {opacity: 0.9}
        100%{opacity: 1}
    }

    .text{
        display: inline-block;
        width: 63%;
        font-size: 2.2vw;
        line-height: 1.4vw;
        color: black;
        text-align: right;
    }

    hr{
        margin: 4px 0;
    }

</style>