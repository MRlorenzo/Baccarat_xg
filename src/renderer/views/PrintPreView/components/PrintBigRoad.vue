<template>
    <el-row  >
        <el-card class="load-table">
            <!-- 大路 -->
            <big-road class="big-load"
                      :point-list="bigRoadResults"
                      :height="230"
                      :width="1638"
            ></big-road>
            <!--分割-->
            <div class="split"></div>
            <!--大眼路-->
            <big-eye-road
                    class="big-eye-load"
                    :point-list="bigEyeRoadResults"
                    :height="120"
                    :width="1638"
            >

            </big-eye-road>
            <div class="split"></div>
            <!--小路-->
            <small-road
                    class="small-load"
                    :point-list="smallRoadResults"
                    :height="120"
                    :width="819"
            >

            </small-road>

            <!--曱甴路-->
            <cock-road
                    class="small-load"
                    :point-list="cockRoadResults"
                    :height="120"
                    :width="819"
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

</style>