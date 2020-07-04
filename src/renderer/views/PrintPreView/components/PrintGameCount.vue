<template>
    <!-- 珠盘路 -->
    <el-row class="bead-table">

        <!--珠子路-->
        <el-col :span="10">
            <el-card>
                <bead-road
                        class="bead-load"
                        :result-list="beadResults"
                        :width="666"
                        :height="250"
                >

                </bead-road>
            </el-card>
        </el-col>

        <el-col :span="8">
            <div class="rs-count">
                <!--庄-->
                <div class="count-item">
                    <span class="c-name">
                        <span class="txt">庄</span>
                        <span class="txt">Banker</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.bCount}}
                    </span>
                </div>
                <!--闲-->
                <div class="count-item">
                    <span class="c-name">
                        <span class="txt">闲</span>
                        <span class="txt">Player</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.pCount}}
                    </span>
                </div>
                <!--和-->
                <div class="count-item">
                    <span class="c-name">
                        <span class="txt">和</span>
                        <span class="txt">Tie</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.tCount}}
                    </span>
                </div>
                <!--庄对-->
                <div class="count-item">
                    <span class="c-name">
                        <span class="txt">庄对</span>
                        <span class="txt">Banker Pair</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.pPCount}}
                    </span>
                </div>
                <!--闲对-->
                <div class="count-item">
                    <span class="c-name">
                        <span class="txt">闲对</span>
                        <span class="txt">Player Pair</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.bPCount}}
                    </span>
                </div>
            </div>
        </el-col>

        <el-col :span="6">
            <el-image
                    class="logo-img"
                    :src="img.src"
                    :fit="img.fit"
                    :alt="img.alt"
            >

            </el-image>
        </el-col>

    </el-row>
</template>

<script>
    import Logo from '../../../../../static/images/com_logo.jpg';
    import BeadRoad from '../../../components/road/BeadRoad';
    export default {
        name: "print-game-count",
        components: { BeadRoad },
        props: {
            beadResults: {
                type: Array
            },
            gameCount: {
                type: Object
            }
        },
        data(){
            return {
                img:{
                    src: Logo,
                    fit:'contain',
                    alt:'西港国际娱乐城'
                }
            }
        }
    }
</script>

<style scoped>
    .bead-table{
        padding: 5px;
    }

    .bead-load{
        width: 100%;
        position: relative;
    }

    .bead-load{
        min-height: 100px;
        height: 250px;
    }

    .rs-count{
        margin-top: 20px;
        height: 240px;
    }

    .count-item{
        max-height: 50px;
    }

    .c-name .txt{
        font-size: 20px;
    }
    .c-name+.big-val{
        font-size: 40px;
    }

    .logo-img{
        width:100%;
        height: 250px;
    }
</style>