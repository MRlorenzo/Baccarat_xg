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
            pageCut(){
                const screenSize = this.$electron.screen.getPrimaryDisplay().workAreaSize;
                const maxDimension = Math.max(screenSize.width, screenSize.height);

                const thumbSize = {
                    width: maxDimension * window.devicePixelRatio,
                    height: maxDimension * window.devicePixelRatio
                };
                /** types : 列出了可以捕获的桌面资源类型, 可用类型为 screen 和 window.
                * thumbnailSize:建议缩略可被缩放的 size, 默认为 {width: 150, height: 150}
                */
                let options = { types: ['screen'], thumbnailSize: thumbSize };

                /* 发起一个请求，获取所有桌面资源
                * */
                this.$electron.desktopCapturer.getSources(options, (error, sources) => {
                    if (error) {
                        log.error(error.toString());
                        return ;
                    }

                    /*
                    * Source 对象数组, 每个 Source 表示了一个捕获的屏幕或单独窗口，并且有如下属性 :
                    * id String - 在 navigator.webkitGetUserMedia 中使用的捕获窗口或屏幕的 id . 格式
                    * name String - 捕获窗口或屏幕的描述名 . 如果资源为屏幕，名字为 Entire Screen 或 Screen <index>; 如果资源为窗口, 名字为窗口的标题.
                    * thumbnail NativeImage - 缩略图.
                    * 注意: 不能保证 source.thumbnail 的 size 和 options 中的 thumnbailSize 一直一致. 它也取决于屏幕或窗口的缩放比例.
                    * */
                    sources.forEach((source) => {
                        if (source.name === 'Entire screen' || source.name === 'Screen 1') {

                            //const screenshotPath = FileUtil.tempPath('screenshot.png');

                            /*
                            * 在 Electron 中, 对所有创建 images 的 api 来说, 你可以使用文件路径或 nativeImage 实例.
                            * 如果使用 null ，将创建一个空的image 对象.
                            * 当前支持 PNG 和 JPEG 图片格式. 推荐 PNG ，因为它支持透明和无损压缩.
                            * toPng() : 返回一个 Buffer ，它包含了图片的 PNG 编码数据.
                            * toJpeg(quality) : quality Integer (必须) - 在 0 - 100 之间  返回一个 Buffer ，它包含了图片的 JPEG 编码数据.
                            * toDataURL() : 返回图片数据的 URL.
                            * */
                            /*FileUtil.saveFile( screenshotPath , source.thumbnail.toPNG())
                                .then( () =>{
                                    this.$electron.shell.openExternal(`file://${screenshotPath}`)

                                    const message = `截图保存到: ${screenshotPath}`
                                    console.log(message);
                                });*/

                            this.$electron.ipcRenderer.send('printImageReady' , source.thumbnail.toDataURL());
                        }
                    });
                });
            }
        }
    }
</script>

<style scoped>

    /*分隔*/
    .split{
        margin-bottom: 10px;width: 100%
    }

</style>
