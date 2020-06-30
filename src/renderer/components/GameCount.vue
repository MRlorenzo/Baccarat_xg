<template>
    <div ref="gameCount">
        <el-table
                :data="gameCountList"
                :show-header="false"
                size="medium"
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
            bgColor:{type:String}
        },
        components: {BeadRoadGrid},
        data(){
            return {
                bgStyle:'background-color: rgba(255,255,255,0);',
                style: `width:3vh;height:3vh;font-size:2vh;line-height:3vh;`
            }
        },
        methods:{
            cellStyle(){
            	return { borderColor: this.bgColor };
            }
        }
    }
</script>

<style >

    .el-table .cell{
        max-height: 50px !important;
        overflow: hidden !important;
        font-size: 2.5vh;
        line-height: initial;
        font-family: 'Microsoft YaHei';
        color: black;
    }
    .el-table td{
        padding: 0;
    }
</style>