<template>
    <div id="main-box" :style="mainStyle">

        <el-container>

            <!--头部内容-->
            <el-header :style="styles.head" id="project-title">
                <project-title
                        :currency-ids="[2]"
                        :limit-list="[
                            {
                                id:2,
                                currencyName:'USD',
                                betLimit: {
                                    max: 0,
                                    min: 0
                                },
                                pairLimit: {
                                    max: 0,
                                    min: 0
                                },
                                tieLimit: {
                                    max: 0,
                                    min: 0
                                }
                            }
                        ]"
                ></project-title>
            </el-header>


            <!--主体-->
            <road-group
                    :styles="styles"
                    :bead-results="beadResults"
                    :last-result="lastResult"
                    :shine="shine"
            ></road-group>

            <el-footer :style="styles.footer">
                <marquee-show
                        text="滚动文字"
                >

                </marquee-show>
            </el-footer>

        </el-container>

        <!-- 负责接收天使靴的游戏结果-->
        <angle-eye @result="angleEyeResult"></angle-eye>

        <!-- 负责解析按键游戏结果-->
        <num-key-result
                @confirm="confirmInputGameResult"
                @cancel="cancelGame"
        >
        </num-key-result>
    </div>
</template>

<script>
	import AngleEye from '../components/AngleEye';
    import NumKeyResult from '../components/NumKeyResult';
    import RoadGroup from '../components/RoadGroup';
    import ProjectTitle from '../components/ProjectTitle';
    import MarqueeShow from '../components/MarqueeShow';
	export default {
		name: "main-panel",
		props: {
			setting: {
				type: Object
			},
            limit: {
			    type: Object
            }
		},
		components: {
			AngleEye,
			NumKeyResult,
            RoadGroup,
            ProjectTitle,
            MarqueeShow
		},
		data() {
			return {
				beadResults: [],
                mainStyle: '',
                shine: false,
                styles: {
                    bigLoad: '',
                    beadLoad: '',
                    bigEyeLoad: '',
                    smallLoad: '',
                    head: '',
                    logo: '',
                    footer: '',
                    card: 'box-shadow: 10px 2px 12px 0 rgba(0,0,0,0.3);',
                    height: 0
                },
			}
		},
        computed: {
            lastResult() {
                let len = this.beadResults.length;
                return this.beadResults[len - 1];
            }
        },
		watch: {
			beadResults() {
				const {result, nextTest} = this.$road.updateResult();
				console.log(result);
				console.log(nextTest);
			}
		},
		methods: {
			/**
             * 天使靴解析了百家乐结果
			 * @param baccaratResult
			 */
			angleEyeResult(baccaratResult) {
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;
			},

			/**
             * 从小键盘输入的命令中解析到的百家乐结果
			 * @param baccaratResult
			 */
			confirmInputGameResult(baccaratResult) {
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;

			},
			/**
             * 取消一局
			 */
			cancelGame() {
				this.$road.pop();
				this.beadResults = this.$road.arr;
			}
		},
        mounted(){
		    const vm = this;
            let currentWindow = vm.$electron.remote.getCurrentWindow();

            currentWindow.setFullScreen(true);
            let [width, height] = currentWindow.getContentSize();
            let bigHeight = height * (250 / 1080);
            let smallHeight = height * (150 / 1080);
            let headHeight = height * (100 / 1080);
            let footerHeight = height * (40 / 1080);

            //如果用户的分辨率超低,例如1366*768,我不得不为它们做特殊处理.因为此分辨率不足以渲染所有的内容.
            if (height <= 800) {
                headHeight = 50;
            }

            vm.styles.beadLoad = `height:${~~bigHeight}px;`;
            vm.styles.bigEyeLoad = `height:${~~smallHeight}px;`;
            vm.styles.bigLoad = `height:${~~bigHeight}px;`;
            vm.styles.smallLoad = `height:${~~smallHeight}px;`;
            vm.styles.head = `height:${~~headHeight}px;width:${~~width}px;`;
            vm.styles.logo = `width:100%;height:${~~bigHeight}px;`;
            vm.styles.footer = `width:100%;height:${~~footerHeight}px;`;

            vm.mainStyle = `width:${~~width}px;height:${~~height}px;`;
            vm.styles.height = height;
        }
	}
</script>

<style scoped>

</style>