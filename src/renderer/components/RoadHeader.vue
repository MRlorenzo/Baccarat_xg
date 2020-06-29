<template>
    <!-- 珠盘路,庄家输赢汇总,桌号和下局指示,公司logo -->
    <el-row :gutter="20">

        <!--珠子路-->
        <el-col :span="10">
            <el-card :style="styles.card">
                <bead-road class="bead-load"
                           :result-list="beadResults"
                           :style="styles.beadLoad"
                           :shine="shine"
                           :last-result="lastResult"
                           :size-version="sizeVersion"
                >
                </bead-road>
            </el-card>
        </el-col>

        <!--输赢汇总-->
        <!--<el-col :span="6">
            <el-card :style="styles.card">
                <win-lose-count
                        :way="way"
                        :language="language"
                        :height="styles.height"
                        :bg-color="settings.backgroundColor"
                >

                </win-lose-count>
            </el-card>
        </el-col>-->

        <!--桌号和下局指示-->
        <!-- <el-col :span="5">
             <el-card :style="styles.card">

                 <table-panel
                         :settings="settings"
                         :game-count="way.games"
                         :prognosis="loads.nextTest"
                         :language="language"
                         :height="styles.height"
                         :bg-color="settings.backgroundColor"
                 >

                 </table-panel>

             </el-card>
         </el-col>-->

        <!--公司logo-->
        <!--<el-col :span="3">
            <el-card :style="styles.card">

                <el-image
                        :style="styles.logo"
                        :src="img.src"
                        :fit="img.fit"
                        :alt="img.alt"
                ></el-image>

            </el-card>
        </el-col>-->
    </el-row>

</template>

<script>
    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import BeadRoad from './road/BeadRoad';
    export default {
        name: "road-header",
        components: { BeadRoad },
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
			// 最后一个结果
			lastResult: {
				type: BaccaratResult
			}
        }
    }
</script>

<style scoped>

</style>