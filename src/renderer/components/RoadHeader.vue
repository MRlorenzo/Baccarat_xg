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
                           :bg-color="bgColor"
                >
                </bead-road>
            </el-card>
        </el-col>

        <!--输赢汇总-->
        <el-col :span="6">
            <el-card :style="styles.card">
                <game-count
                        :game-count-list="gameCountList"
                        :style="styles.beadLoad"
                ></game-count>
            </el-card>
        </el-col>

        <!--桌号和下局指示-->
         <el-col :span="5">
             <el-card :style="styles.card">

                 <next-test
                     :style="styles.beadLoad"
                     :table-name="tableName"
                     :game-count="gameCount"
                     :boot-no="bootNo"
                     :road-next-test="roadNextTest"
                 >

                 </next-test>

             </el-card>
         </el-col>

        <!--公司logo-->
        <el-col :span="3">
            <el-card :style="styles.card">

                <el-image
                        :style="styles.logo"
                        :src="imgSrc"
                        :fit="fit"
                        :alt="alt"
                ></el-image>

            </el-card>
        </el-col>
    </el-row>

</template>

<script>
    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import BeadRoad from './road/BeadRoad';
    import GameCount from '../components/GameCount';
    import NextTest from '../components/NextTest';
    import ComLogo from '../../../static/images/com_logo.jpg';
    export default {
        name: "road-header",
        components: { BeadRoad , GameCount , NextTest},
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
        data(){
        	const {tableName , bootNo } = this.settings;
            return {
                imgSrc: ComLogo,
                fit: 'contain',
                alt: '西港国际娱乐城',
                tableName: tableName,
                bootNo: bootNo
            }
        },
        watch: {
        	settings( settings ){
				const {tableName , bootNo } = settings;
				this.tableName = tableName;
				this.bootNo = bootNo;
            }
        }
    }
</script>

<style >

</style>