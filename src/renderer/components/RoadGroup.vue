<template>
    <el-main>
        <div class="box">

            <!-- 珠盘路,庄家输赢汇总,桌号和下局指示,公司logo -->
            <road-header
                    :styles="styles"
                    :bead-results="beadResults"
                    :last-result="lastResult"
                    :shine="shine"
            ></road-header>

            <!--分割-->
            <div style="margin-bottom: 10px;width: 100%"></div>

            <!-- 大路 -->
            <!--<el-row>
                <el-card :style="styles.card">

                    <big-load class="big-load"
                              :style="styles.bigLoad"
                              :state="states.windowSizeVersion"
                              :resultList="loads.bigResults"
                              :shine="states.shine"
                              :last-result="lastResult"
                              :language="language"
                              :bg-color="settings.backgroundColor"
                    ></big-load>

                </el-card>
            </el-row>-->

            <!--分割-->
            <div style="margin-bottom: 10px;width: 100%"></div>

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
            <div style="margin-bottom: 10px;width: 100%"></div>

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
    export default {
        name: "road-group",
        props: {
            shine: {
                type: Boolean
            },
            styles: {
                type: Object,
                required: true
            },
            beadResults: {
                type: Array,
                required: true
            },
            lastResult: {
                type: BaccaratResult
            }
        },
        components: { RoadHeader }
    }
</script>

<style scoped>

</style>