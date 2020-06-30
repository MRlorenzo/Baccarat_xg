<template>
    <div id="main-box" :style="mainStyle">

        <el-container>

            <!--头部内容-->
            <el-header :style="styles.head" id="project-title">
                <project-title
                        :limit-item="limitItem"
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
                    :settings="userSetting"
                    :game-count="gameCount"
            ></road-group>

            <el-footer :style="styles.footer">
                <marquee-show :text="marqueeText"></marquee-show>
            </el-footer>

        </el-container>

        <!-- 负责接收天使靴的游戏结果-->
        <angle-eye
                @result="angleEyeResult"
                :body-width="width"
        ></angle-eye>

        <!-- 负责解析按键游戏结果-->
        <num-key-result
                @confirm="confirmInputGameResult"
                @cancel="cancelGame"
        >
        </num-key-result>

        <setting-page
                ref="settingPage"
                :setting="setting"
                :limit="limit"
                @submit="submitSetting"
                @colorChange="changeColor"
        ></setting-page>
    </div>
</template>

<script>
	import AngleEye from '../components/AngleEye';
    import NumKeyResult from '../components/NumKeyResult';
    import RoadGroup from '../components/RoadGroup';
    import ProjectTitle from '../components/ProjectTitle';
    import MarqueeShow from '../components/MarqueeShow';
    import {clone, getLimitItem} from "../../utils";
    import Mousetrap from 'mousetrap';
    import BaccaratResult from "../../baccarat/result/BaccaratResult";
    import Result from "../../baccarat/result/BResult";
    import Pairs from "../../baccarat/result/Pairs";
    import SettingPage from '../views/SettingPage';
	const defaultStyles = {
		bigLoad: '',
		beadLoad: '',
		bigEyeLoad: '',
		smallLoad: '',
		head: '',
		logo: '',
		footer: '',
		card: 'box-shadow: 10px 2px 12px 0 rgba(0,0,0,0.3);'
	};
	import { setting , limit } from "../../local-storage";

    export default {
		name: "main-panel",
		props: {
			setting: {
				type: Object,
                required: true
			},
            limit: {
			    type: Object,
                required: true
            }
		},
		components: {
			AngleEye,
			NumKeyResult,
            RoadGroup,
            ProjectTitle,
            MarqueeShow,
			SettingPage
		},
		data() {
		    const { limitGroup , currencyNames} = this.setting;
		    const item = getLimitItem(this.limit , limitGroup , currencyNames);

			return {
				beadResults: [],
                shine: false, // 是否闪烁
                windowSizeVersion: 0, // 窗口大小变动的次数
                width: 1920,
                height: 1080,
                styles: clone(defaultStyles),
                roadResults: {},
                roadNextTest: {},
                gameCountList: [],
                limitItem: clone(item),
                userSetting: clone(this.setting)
			}
		},
        computed: {
			mainStyle(){
				const backgroundColor = this.userSetting && this.userSetting.backgroundColor;
				let css = `width:${~~this.width}px;height:${~~this.height}px;`
				if (backgroundColor != null){
					css += `background-color: ${backgroundColor}`;
                }
				return css;
            },
            lastResult() {
                let len = this.beadResults.length;
                return this.beadResults[len - 1];
            },
            gameCount(){
				return this.beadResults.length;
            },
            marqueeText(){
			    const lang = this.$i18n.locale;
			    return lang === 'zh' ?
                    this.userSetting.marqueeText:
                    this.userSetting.orderMarqueeText;
            }
        },
		watch: {
            setting(){
                this.userSetting = clone(this.setting);
            },
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
			},
            limit( limit ){
                const { limitGroup , currencyNames} = this.setting;
                this.limitItem = getLimitItem(limit , limitGroup , currencyNames);
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
					logo: `width:100%;height:${~~(bigHeight - 6)}px;`,
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
            },

            async submitSetting({ userSetting, limitItem}){
                this.userSetting = userSetting;
                this.limitItem = limitItem;
                // 更新本地数据库
                await setting.update({} , userSetting);
                const oldLimit = clone(this.limit);

                await limit.update({} , oldLimit);
            },
            async changeColor( style ){
                this.userSetting.backgroundColor = style;
                // 更新本地数据库
                await setting.update({} , {
                    $set: {
                        backgroundColor: style
                    }
                })
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

			// 开新靴
			Mousetrap.bind('9 enter', ()=> {
				this.$message.info('开新靴')
			});
			// 随机
            Mousetrap.bind('9 9 enter', ()=> {
                this.random();
            });
            // 显示最后一次扑克牌记录
            Mousetrap.bind('* enter', ()=> {
            	this.$message.info('显示最后一次扑克牌记录')
            });
            // 打印
            Mousetrap.bind('* * enter', ()=> {
            	this.$message.info('打印')
            });
            // 保存游戏记录
            Mousetrap.bind('/ / enter', ()=> {
            	this.$message.info('保存游戏记录')
            })
        }
	}
</script>

<style scoped>

</style>