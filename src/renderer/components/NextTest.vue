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

                    <small-road-grid v-if="scope.row.type==='small'" v-show="scope.row.banker"
                                     :result="scope.row.banker"
                                     :item-css="itemCss">

                    </small-road-grid>

                    <big-eye-road-grid v-if="scope.row.type==='bigEye'" v-show="scope.row.banker"
                                       :result="scope.row.banker"
                                       :item-css="itemCss">
                    </big-eye-road-grid>

                    <cock-road-grid v-if="scope.row.type==='cockroach'" v-show="scope.row.banker"
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


                    <big-eye-road-grid v-if="scope.row.type==='bigEye'" v-show="scope.row.banker"
                                       :result="scope.row.player"
                                       :item-css="itemCss">
                    </big-eye-road-grid>

                    <span v-if="scope.row.type ==='text'" class="banker-and-player">{{scope.row.player}}</span>

                    <small-road-grid v-if="scope.row.type ==='small'" v-show="scope.row.banker"
                                     :result="scope.row.player"
                                     :item-css="itemCss">

                    </small-road-grid>

                    <cock-road-grid v-if="scope.row.type ==='cockroach'" v-show="scope.row.banker"
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
    export default {
        /*下路指示*/
        name: "next-test",
        props: {
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
            height:{
                type:Number
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
                tableStyle:'',
                bgStyle:'background-color: rgba(255,255,255,0);'
            }
        },
        computed:{
            tableName(){
                // return this.settings.tableName;
                return '###'
            },
            number(){
                // return `#${this.settings.bootNo}-${this.gameCount}`;
                return '###'
            },
            list(){

                let d = this.roadNextTest;

                let results = [{
                    type:'bead',
                    banker: BaccaratResult.getResult( BResult.B ),
                    player: BaccaratResult.getResult( BResult.P )
                }];

                if (Object.keys(d).length === 3){
                    results.push({
                        type:'bigEye',
                        banker: d.BigEyeRoad.banker,
                        player: d.BigEyeRoad.player
                    });

                    results.push({
                        type:'small',
                        banker: d.SmallRoad.banker,
                        player: d.SmallRoad.player
                    });

                    results.push({
                        type:'cockroach',
                        banker: d.CockroachRoad.banker,
                        player: d.CockroachRoad.player
                    });
                }

                return results ;
            },
            itemCss(){
                /*let el = document.getElementById('main-box');
                let height = el? el.offsetHeight * (30 / 1080): (30 / 1080) * 768;*/
                return `width:2vw;height:2vw;margin: 0 auto;font-size:1.5vw;line-height:2vw;font-family: "Microsoft YaHei"`;
            },
            hrStyle(){
                return `'border-color: ${this.bgColor};'`
            }
        },
        watch:{
            height(){
                this.initTableStyle();
            }
        },
        methods:{
            cellStyle({row, column, rowIndex, columnIndex}){
                return 'border:hidden;';
            },
            rowStyle({row, rowIndex}){
                let el = document.getElementById('main-box');
                let height = el? el.offsetHeight * (45 / 1080): (45 / 1080) * 768;
                if(el && el.offsetHeight <= 800){
                    height = 25;
                }
                return `height:2.6vw;${this.bgStyle}`;
            },
            initTableStyle(){
                let elHeight = this.height;
                //最佳展示高度为175px,但是如果用户的分辨率不是1080的话就按比例获取.
                let height = elHeight * ( 175/1080 );

                //如果用户的分辨率超低,例如1366*768,我不得不为它们做特殊处理.因为此分辨率不足以渲染所有的内容.
                if(elHeight <= 800){
                    height = 108;
                }
                this.tableStyle = `width: 200px;height:10.5vw;margin:0 auto;`;
            }
        }
    }
</script>

<style scoped>

</style>