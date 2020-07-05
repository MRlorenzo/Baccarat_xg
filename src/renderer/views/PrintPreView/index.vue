<template>
    <div :style="pageStyle">
        <div :style="printOffset">

            <el-container>

                <!--头部内容-->
                <el-header height="200px" >
                    <print-header
                            :create-time-txt="createTimeTxt"
                            :table-name="settings.tableName"
                            :boot-no="settings.bootNo"
                            :limit-item="limitItem"
                            :games="games"
                    ></print-header>
                </el-header>


                <!--主体-->
                <el-main style="padding: 0;overflow: hidden">
                    <div class="box" >

                        <print-big-road
                            :road-results="roadResults"
                            :size-version="sizeVersion"
                        ></print-big-road>

                        <!--分割-->
                        <div class="split"></div>

                        <print-game-count
                            :bead-results="beadResults"
                            :game-count="gameCount"
                        ></print-game-count>

                    </div>

                </el-main>

                <el-footer>
                    <print-footer
                            :marquee-text="settings.marqueeText"
                            :order-marquee-text="settings.orderMarqueeText"
                    ></print-footer>
                </el-footer>

            </el-container>
        </div>
    </div>
</template>

<script>
    import PrintHeader from './components/PrintHeader';
    import PrintFooter from './components/PrintFooter';
    import PrintGameCount from './components/PrintGameCount';
    import PrintBigRoad from './components/PrintBigRoad';
    import { cutFullScreen } from "../../../utils/for-window";
    import { clone } from "../../../utils";
    import Limit from '../../assest/def/limit.json';
    import moment from 'moment'
	const defaultCount = {
		bCount: 0,
		pCount: 0,
		tCount: 0,
		bPCount: 0,
		pPCount: 0,
		games: 0
	}
	const defaultSettings = {
		tableName: '',
		bootNo: 1,
		marqueeText: '',
		orderMarqueeText: '',
        limitGroup: 'default'
	}

    export default {
        name: 'print-pre-view',
        components:{
            PrintHeader,
            PrintBigRoad,
            PrintGameCount,
            PrintFooter
        },
        data(){
            return {
                createTimeTxt: '',
                printOffset: `padding-right: 250px;`,
                beadResults: [],
                roadResults: {},
                settings: clone(defaultSettings),
				limit: clone(Limit),
                sizeVersion: 0,
                gameCount: clone(defaultCount),
                height: 1080
            }
        },
        computed: {
            games(){
                return this.beadResults.length;
            },
            pageStyle(){
            	return `height: ${this.height}px;`
            },
			limitItem(){
				const { limitGroup } = this.settings;
				return clone(this.limit[limitGroup]);
			}
        },
        methods:{
            change(data){
            	const {
            		beadResults ,
                    roadResults,
                    settings ,
					limit,
                    height
            	} = data;
                this.beadResults = beadResults;
                this.roadResults = roadResults;
                this.settings = settings;
                this.limit = limit;
                this.height = height;
                this.createTimeTxt = moment().format('YYYY/MM/DD HH:mm:ss')
                this.gameCount = this.getGameCount();
                if (this.sizeVersion === 0){
                    this.sizeVersion ++;
                }
                // 2秒后截屏
                setTimeout(()=> {
                	this.pageCut();
                } , 2000)
            },
            getGameCount(){
                const road = this.$road;
                return {
                    bCount: road.bCount,
                    pCount: road.pCount,
                    tCount: road.tCount,
                    bPCount: road.bPCount,
                    pPCount: road.pPCount,
                    games: road.games
                }
            },
            async pageCut(){
                const dataURL= await cutFullScreen();
                this.$emit('cut' , dataURL);
            }
        },
        created(){
            window.pt = this;
        }
    }
</script>

<style scoped>

    /*分隔*/
    .split{
        margin-bottom: 10px;width: 100%
    }

</style>
