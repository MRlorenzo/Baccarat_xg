<template>
    <div >
        <div :style="printOffset">

            <el-container>

                <!--头部内容-->
                <el-header height="200px" >
                    <print-header
                            :create-time-txt="createTimeTxt"
                            :table-name="settings.tableName"
                            :boot-no="settings.bootNo"
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
                settings: {
                    tableName: '',
                    bootNo: 1,
                    marqueeText: '',
                    orderMarqueeText: ''
                },
                sizeVersion: 0,
                gameCount: {
                    bCount: 0,
                    pCount: 0,
                    tCount: 0,
                    bPCount: 0,
                    pPCount: 0,
                    games: 0
                }
            }
        },
        computed: {
            games(){
                return this.beadResults.length;
            }
        },
        methods:{
            change({beadResults , roadResults, settings}){
                this.beadResults = beadResults;
                this.roadResults = roadResults;
                this.settings = settings;
                this.gameCount = this.getGameCount();
                if (this.sizeVersion === 0){
                    this.sizeVersion ++;
                }
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
                console.log(dataURL);
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
