<template>
    <div id="print" >
        <div id="main-box" :style="printOffset">

            <el-container>

                <!--头部内容-->
                <print-header
                        :create-time-txt="createTimeTxt"
                        :table-name="settings.tableName"
                        :boot-no="settings.bootNo"
                        :games="games"
                ></print-header>


                <!--主体-->
                <el-main style="padding: 0;overflow: hidden">
                    <div class="box" >

                        <print-big-road
                            :road-results="roadResults"
                        ></print-big-road>

                        <!--分割-->
                        <div class="split"></div>

                        <print-game-count
                            :bead-results="beadResults"
                        ></print-game-count>

                    </div>

                </el-main>

                <print-footer
                    :marquee-text="settings.marqueeText"
                    :order-marquee-text="settings.orderMarqueeText"
                ></print-footer>

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
    .logo-img{
        width:100%;
        height: 250px;
    }
    /*分隔*/
    .split{
        margin-bottom: 10px;width: 100%
    }

    .print-title-row{
        height: 66px;
        margin-top: 5px;
    }

    .load-table , .load-table .el-card__body{
        height: 500px;
    }

    .el-card,
    .bead-table .el-card__body,
    .load-table .el-card__body{
        padding: 5px;
    }

    /*对子圆点样式*/
    .pair-point{
        width: 10px;
        height: 10px;
        border:1px solid #FFF;
        border-radius: 100%;
        position: absolute;
    }
    /*庄对*/
    .pair-point-b{
        background-color: red;
        top: -10%;
        left: -10%;
    }
    /*闲对*/
    .pair-point-p{
        background-color: blue;
        top: 75%;
        left: 75%;
    }


    /*庄家赢(实心圆)*/
    .bg-b{
        background-color: red;
    }
    /*玩家赢(实心圆)*/
    .bg-p{
        background-color: blue;
    }
    /*和(实心圆)*/
    .bg-t{
        background-color: green;
    }

    /*庄家赢(空心圆)*/
    .border-b{
        border-color: red;
    }

    /*玩家赢(空心圆)*/
    .border-p{
        border-color: blue;
    }

    /*和(空心圆)*/
    .border-t{
        border-color: green;
    }

    /*和(不显示空心圆)*/
    .border-none{
        border-color: gray;
    }
    .text-b .slash{
        fill:red;
    }

    /*闲家赢(字体)*/
    .text-p .slash{
        fill:blue;
    }

    .load-name{
        position: absolute;
        right: 20px;
        bottom: 0px;
        color: #CDB79E;
        font-size: 40px;
    }

    .big-load,
    .small-load,
    .big-eye-load,
    .bead-load{
        width: 100%;
        position: relative;
    }

    .big-load{
        min-height: 100px;
        height: 230px;
    }

    .small-load{
        min-height: 100px;
        height: 120px;
        width: 50%;
        margin: 0;
        float: left;
    }

    .big-eye-load{
        min-height: 100px;
        height: 120px;
    }

    .bead-load{
        min-height: 100px;
        height: 250px;
    }

    .load table{
        border-collapse: collapse;
        margin: 0;
        position: relative;
        z-index: 2;
        width: 100%;
    }
    .load table tr{
        overflow: hidden;
        padding: 0;
        margin: 0;
        border-spacing: 0;
    }
    .load table tr td{
        border: #000 1px solid ;
        border-spacing: 0px;
        padding: 0;
        margin: 0;
        /*border-color:#8B668B;*/
    }


    .zocial:before {
        font-family: 'zocial', sans-serif;
    }

    .zocial {
        *zoom: 1;
        filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FF000000', endColorstr='#FF000000');
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
        box-shadow: inset 0 0.3rem 0.2rem rgba(255, 255, 255, 0.2), inset 0 -0.3rem 0.2rem rgba(0, 0, 0, 0.2), 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
        cursor: pointer;
        text-align: center;
        text-shadow: 0 0.05rem rgba(0, 0, 0, 0.8), 0 0.3rem 0.4rem rgba(0, 0, 0, 0.2), 0 -0.2rem 0.4rem rgba(255, 255, 255, 0.2);
    }
    .zocial:active {
        -moz-transform: scale(0.98);
        -ms-transform: scale(0.98);
        -webkit-transform: scale(0.98);
        transform: scale(0.98);
    }

    .zocial:hover {
        *zoom: 1;
        filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FF000000', endColorstr='#FF000000');
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    }

    .zocial-shadow{
        /*box-shadow: 2px 2px 3px #226*/
    }

    .pt-left{
        font-size: 45px;
        float: left;
    }

    .pt-right{
        float: right;
    }

    .big-val{
        font-size: 30px;
        margin-left: 20px;
        font-weight: bold;
    }

    .bp-demo{
        display: inline-block;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        margin-right: 60px;
    }

    .bp-demo .txt{
        line-height: 50px;
    }

    .d-grid{
        width: 37px;
        height: 37px;
        border: 1px solid;
        margin-right: 10px;
    }
     .d-grid ,.d-grid+.txt{
        float: left;
    }
    .d-grid-box{
        width: 26px;
        height: 26px;
        line-height: 26px;
    }
    .c-name{
        display: inline-block;
        width: 250px;
        margin-left: 50px;
        height: 50px;
    }
    .c-name .txt{
        font-size: 20px;
    }
    .c-name+.big-val{
        font-size: 40px;
    }
    .rs-count{
        margin-top: 20px;
        height: 240px;
    }
    .print-at{
        margin-right: 50px;
    }

    .limit .txt{
        font-size: 20px;
        line-height: 18px;
    }

    .txt{
        font-size: 25px;
        line-height: 18px;
    }

    .time{
        font-size: 25px;
        line-height: 18px;
    }

    .limit{
        height: 66px;
        overflow: hidden;
    }
</style>
