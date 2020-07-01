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
                :body-width="width"
                :body-height="height"
        >
        </num-key-result>

        <setting-page
                ref="settingPage"
                :setting="userSetting"
                :limit="userLimit"
                @submit="submitSetting"
                @colorChange="changeColor"
        ></setting-page>
    </div>
</template>

<script>
	import AngleEye from '../../components/AngleEye';
    import NumKeyResult from '../../components/NumKeyResult';
    import RoadGroup from '../../components/RoadGroup';
    import ProjectTitle from '../../components/ProjectTitle';
    import MarqueeShow from '../../components/MarqueeShow';
    import {clone, getLimitItem} from "../../../utils/index";
    import SettingPage from '../SettingPage';
    import SizeStyle from './mixins/SizeStyle';
    import GameCount from './mixins/GameCount';
    import UpdateSettings from './mixins/UpdateSettings';
    import AngleEyeResult from './mixins/AngleEyeResult';
    import InputResult from './mixins/InputResult';
    import RandomGame from './mixins/RandomGame';

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

    export default {
		name: "main-panel",
        mixins: [
			/*根据窗口大小调整样式*/
        	SizeStyle,
            /*统计游戏结果*/
            GameCount,
            /*更新配置*/
            UpdateSettings,
            /*处理天使靴结果*/
			AngleEyeResult,
            /*处理键盘输入结果*/
			InputResult,
            /*随机游戏*/
			RandomGame
        ],
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
                userSetting: clone(this.setting),
                userLimit: clone(this.limit)
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
            },
			limitItem(){
				const { limitGroup } = this.userSetting;
				return clone(this.userLimit[limitGroup]);
			}
        },
		watch: {
            setting(){
                this.userSetting = clone(this.setting);
            },
			limit(){
                this.userLimit = clone(this.limit);
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

            onShow(){
				this.windowSizeVersion ++;
            },

			/*闪烁*/
			showShine(){
				this.shine = true;
				setTimeout(()=>{
					this.shine = false;
				},2000);
			}
		},
        created(){
		    this.gameCountList = this.getGameCountList();
        },
        mounted(){

			// 开新靴
            this.$fnKeyMap.addHooks('9', ()=>{
				this.$message.info('开新靴');
            });

            // 打印
            this.$fnKeyMap.addHooks('* *', ()=>{
				this.$message.info('打印');
            });
            // 保存游戏记录
            this.$fnKeyMap.addHooks('/ /',()=>{
				this.$message.info('保存游戏记录')
            });
        }
	}
</script>

<style scoped>

</style>