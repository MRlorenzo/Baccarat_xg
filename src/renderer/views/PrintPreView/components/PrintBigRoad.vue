<template>
    <el-row  >
        <el-card class="load-table">
            <!-- 大路 -->
            <big-road class="big-load"
                      :point-list="bigRoadResults"
                      :size-version="sizeVersion"
            ></big-road>
            <!--分割-->
            <div class="split"></div>
            <!--大眼路-->
            <big-eye-road
                    class="big-eye-load"
                    :point-list="bigEyeRoadResults"
                    :size-version="sizeVersion"
            >

            </big-eye-road>
            <div class="split"></div>
            <!--小路-->
            <small-road
                    class="small-load"
                    :point-list="smallRoadResults"
                    :size-version="sizeVersion"
                    table-style="margin:0"
            >

            </small-road>

            <!--曱甴路-->
            <cock-road
                    class="small-load"
                    :point-list="cockRoadResults"
                    :size-version="sizeVersion"
                    table-style="margin:0"
            >

            </cock-road>
        </el-card>
    </el-row>
</template>

<script>
    import BigRoad from '../../../components/road/BigRoad';
    import BigEyeRoad from '../../../components/road/BigEyeRoad';
    import SmallRoad from '../../../components/road/SmallRoad';
    import CockRoad from '../../../components/road/CockRoad';
    export default {
        name: "print-big-road",
        components: {
            BigRoad,
            BigEyeRoad,
            SmallRoad,
            CockRoad
        },
        props: {
            /**
             * 路单的pointList
             * {
             *  BigEyeRoad: [[]],
             *  BigRoad: [[]],
             *  ...
             * }
             */
            roadResults: {
                type: Object
            },
            sizeVersion: {
                type: Number,
                default: 0
            }
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

<style scoped>
    .load-table , .load-table .el-card__body{
        height: 500px;
    }

    .big-load,
    .small-load,
    .big-eye-load,
    .bead-load{
        width: 100%;
        position: relative;
    }

    .big-load{
        min-height: 100px;
        height: 215px;
    }

    /*分隔*/
    .split{
        margin-bottom: 10px;width: 100%
    }

    .big-eye-load{
        min-height: 100px;
        height: 120px;
    }

    .small-load{
        min-height: 100px;
        height: 120px;
        width: 50%;
        margin: 0;
        float: left;
    }
</style>