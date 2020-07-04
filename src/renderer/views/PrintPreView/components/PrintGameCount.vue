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
                <div>
                    <span class="c-name">
                        <span class="txt">庄</span> <br>
                        <span class="txt">Banker</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.bCount}}
                    </span>
                </div>
                <!--闲-->
                <div>
                    <span class="c-name">
                        <span class="txt">闲</span><br>
                        <span class="txt">Player</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.pCount}}
                    </span>
                </div>
                <!--和-->
                <div>
                    <span class="c-name">
                        <span class="txt">和</span> <br>
                        <span class="txt">Tie</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.tCount}}
                    </span>
                </div>
                <!--庄对-->
                <div>
                    <span class="c-name">
                        <span class="txt">庄对</span> <br>
                        <span class="txt">Banker Pair</span>
                    </span>
                    <span class="big-val">
                        {{gameCount.pPCount}}
                    </span>
                </div>
                <!--闲对-->
                <div>
                    <span class="c-name">
                        <span class="txt">闲对</span> <br>
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
        },
        computed: {
            gameCount() {
                const road = this.$road;
                return {
                    bCount: 0,
                    pCount: 0,
                    tCount: 0,
                    bPCount: 0,
                    pPCount: 0,
                    games: 0
                };
            }
        },
    }
</script>

<style scoped>

</style>