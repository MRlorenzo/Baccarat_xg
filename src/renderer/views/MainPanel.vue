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
                    :road-results="roadResults"
                    :road-next-test="roadNextTest"
                    :game-count-list="gameCountList"
                    :last-result="lastResult"
                    :shine="shine"
                    :size-version="windowSizeVersion"
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
    import { clone } from "../../utils";
    import Mousetrap from 'mousetrap';
    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import Result from "../../baccarat/result/BResult";
    import Pairs from "../../baccarat/result/Pairs";
	const defaultStyles = {
		bigLoad: '',
		beadLoad: '',
		bigEyeLoad: '',
		smallLoad: '',
		head: '',
		logo: '',
		footer: '',
		card: 'box-shadow: 10px 2px 12px 0 rgba(0,0,0,0.3);',
		height: 0
	};

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
                shine: false, // 是否闪烁
                windowSizeVersion: 0, // 窗口大小变动的次数
                width: 1920,
                height: 1080,
                styles: clone(defaultStyles),
                roadResults: {},
                roadNextTest: {},
                gameCountList: []
			}
		},
        computed: {
			mainStyle(){
				return `width:${~~this.width}px;height:${~~this.height}px;`
            },
            lastResult() {
                let len = this.beadResults.length;
                return this.beadResults[len - 1];
            }
        },
		watch: {
			width(){
				this.styles = this.styleFromSize(this.width , this.height);
            },
            height(){
				this.styles = this.styleFromSize(this.width , this.height);
            },
			beadResults() {
				const {result, nextTest} = this.$road.updateResult();
				/**
                 * 路单的pointList
                 * {
                 *  BigEyeRoad: [[]],
                 *  BigRoad: [[]],
                 *  ...
                 * }
				 */
				this.roadResults = result;
				/**
                 * 下路指示
                 * {
                 *  SmallRoad: { banker: baccaratResult, player: baccaratResult}
                 * }
				 */
				this.roadNextTest = nextTest;
				this.gameCountList = this.getGameCountList();
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
				this.showShine();
			},

			/**
             * 从小键盘输入的命令中解析到的百家乐结果
			 * @param baccaratResult
			 */
			confirmInputGameResult(baccaratResult) {
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;
				this.showShine();

			},
			/**
             * 取消一局
			 */
			cancelGame() {
				this.$road.pop();
				this.beadResults = this.$road.arr;
				this.showShine();
			},

            // 根据窗口的宽度，高度计算样式
            styleFromSize( width , height ){
				let bigHeight = height * (250 / 1080);
				let smallHeight = height * (150 / 1080);
				let headHeight = height * (100 / 1080);
				let footerHeight = height * (40 / 1080);

				//如果用户的分辨率超低,例如1366*768,我不得不为它们做特殊处理.因为此分辨率不足以渲染所有的内容.
				if (height <= 800) {
					headHeight = 50;
				}
				return {
					beadLoad: `height:${~~bigHeight}px;`,
					bigEyeLoad: `height:${~~smallHeight}px;`,
					bigLoad: `height:${~~bigHeight}px;`,
					smallLoad: `height:${~~smallHeight}px;`,
					head: `height:${~~headHeight}px;width:${~~width}px;`,
					logo: `width:100%;height:${~~bigHeight}px;`,
					footer: `width:100%;height:${~~footerHeight}px;`,
                    height: height
                }
            },
            onShow(){
				this.windowSizeVersion ++;
            },

			/*闪烁*/
			showShine(){
				this.shine = true;
				setTimeout(()=>{
					this.shine = false;
				},2000);
			},
            /*随机*/
            random(){
                this.$road.random(30);
                this.beadResults = this.$road.arr;
                this.showShine();
            },
            /*游戏统计数据*/
            getGameCountList(){
                let arr = [];
                arr.push({
                    item: new BaccaratResult(Result.B),
                    name: this.$t('game.bankerWin'),
                    sum: this.$road.bCount
                });

                arr.push({
                    item: new BaccaratResult(Result.P),
                    name: this.$t('game.playerWin'),
                    sum: this.$road.pCount
                });

                arr.push({
                    item: new BaccaratResult(Result.T),
                    name: this.$t('game.tieWin'),
                    sum: this.$road.tCount
                });

                arr.push({
                    item: new BaccaratResult(Result.B , [Pairs.BP]),
                    name: this.$t('game.bankerPairs'),
                    sum: this.$road.bPCount
                });

                arr.push({
                    item: new BaccaratResult(Result.P , [Pairs.PP]),
                    name: this.$t('game.playerPairs'),
                    sum: this.$road.pPCount
                });

                arr.push({
                    item: new BaccaratResult(null),
                    name: this.$t('game.skyCards'),
                    sum: this.$road.skyCard
                });

                return arr;
            }
		},
        created(){
		    this.gameCountList = this.getGameCountList();
        },
        mounted(){
			// 窗口大小发生改变。
			this.$electron.ipcRenderer.on('resize', (event , [width , height]) => {
				this.width = width;
				this.height = height;
				this.windowSizeVersion ++;
			})

            const currentWindow = this.$electron.remote.getCurrentWindow();

            //currentWindow.setFullScreen(true);
            const [width, height] = currentWindow.getContentSize();
            this.styles = this.styleFromSize(width , height);
			this.windowSizeVersion ++;

            Mousetrap.bind('9 enter', ()=> {
                this.random();
            })
        }
	}
</script>

<style scoped>

</style>