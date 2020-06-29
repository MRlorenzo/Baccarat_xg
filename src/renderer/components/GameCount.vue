<template>
    <div ref="gameCount">
        <el-table
                :data="gameCountList"
                :show-header="false"
                size="medium"
                :row-style="rowStyle"
                :style="bgStyle"
                :cell-style="cellStyle"
        >
            <el-table-column prop="icon" width="50px" align="left">

                <template slot-scope="scope">
                    <bead-road-grid
                            :item-css="style"
                            :result="scope.row.item"
                    >
                    </bead-road-grid>
                </template>

            </el-table-column>

            <el-table-column prop="name" align="left"> </el-table-column>

            <el-table-column prop="sum" width="100px" align="right"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import BeadRoadGrid from './road/grid/BeadRoadGrid';
    export default {
        name: "game-count",
        props: {
            gameCountList: {
                type: Array,
                required: true
            },
            height:{
                type:Number,
                default: 200
            },
            bgColor:{type:String}
        },
        components: {BeadRoadGrid},
        data(){
            return {
                bgStyle:'background-color: rgba(255,255,255,0);'
            }
        },
        computed: {
            style(){
                return `width:3vh;height:3vh;font-size:2vh;line-height:3vh;`;
            }
        },
        methods:{
            rowStyle({row, rowIndex}){
                let height = this.height * (41 / 1080);
                return `height:${height}px;${this.bgStyle}`;
            },
            cellStyle(){
                return `border-color:${this.bgColor};`
            }
        }
    }
</script>

<style scoped>

</style>