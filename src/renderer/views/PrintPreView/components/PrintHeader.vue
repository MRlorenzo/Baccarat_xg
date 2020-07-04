<template>
    <!--头部内容-->
    <el-header height="200px" >
        <!-- 标题 -->
        <el-row class="print-title-row">
            <!-- 百家乐 -->
            <el-col :span="12">
                <div class="pt-left">
                    <span>百家乐 &nbsp;&nbsp;&nbsp;&nbsp; BACCARAT</span>
                </div>
            </el-col>

            <!-- 列印时间  -->
            <el-col :span="12">
                <div class="pt-right">
                <span class="print-at">
                    <span class="txt">列印时间</span> <br>
                    <span class="txt">Printed at</span>
                </span>

                <span class="time"> {{createTimeTxt}} </span>
                </div>
            </el-col>
        </el-row>
        <!-- 限红 与 台号 与 靴号 与 局数-->
        <el-row class="print-title-row">
            <div class="limit">
                <el-col :span="4">
                    <div>
                        <span>
                            <span class="txt">台号</span> <br>
                            <span class="txt"> Table No. </span>
                        </span>
                        <span class="big-val">
                            {{tableName}}
                        </span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <span>
                            <span class="txt">靴牌</span> <br>
                            <span class="txt">Shoes</span>
                        </span>
                        <span class="big-val">
                            {{bootNo}}
                        </span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <span>
                            <span class="txt">局数</span> <br>
                            <span class="txt">Rounds</span>
                        </span>
                        <span class="big-val">
                            {{games}}
                        </span>
                    </div>
                </el-col>
            </div>
        </el-row>
        <!-- 示例 -->
        <el-row class="print-title-row">
            <!--庄-->
            <span class="bp-demo">
                <div class="d-grid">
                    <div class="zocial-shadow big-grid border-b d-grid-box" >

                    </div>
                </div>
                <span class="txt">庄 Banker</span>
            </span>
            <!--闲-->
            <span class="bp-demo">
                <div class="d-grid">
                    <div class="zocial-shadow big-grid border-p d-grid-box" >

                    </div>
                </div>
                <span class="txt">闲 Player</span>
            </span>
            <!--和-->
            <span class="bp-demo">
                <div class="d-grid">
                    <div class="zocial-shadow big-grid border-none tieClass d-grid-box" >

                    </div>
                </div>
                <span class="txt">和 Tie</span>
            </span >
            <!--庄对子-->
            <span class="bp-demo">
                <div class="d-grid">
                    <div class="zocial-shadow big-grid border-none d-grid-box" >
                        <div class="pair-point pair-point-b" style=""></div>
                    </div>
                </div>
                <span class="txt">庄对子 Banker Pair</span>
            </span>
            <!--闲对子-->
            <span class="bp-demo">
                <div class="d-grid">
                    <div class="zocial-shadow big-grid border-none d-grid-box" >
                        <div class="pair-point pair-point-p" style=""></div>
                    </div>
                </div>
                <span class="txt">闲对子 Player Pair</span>
            </span>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        name: "print-header",
        props: {
            createTimeTxt: {
                type: String,
                required: true
            },
            tableName: {
                type: String,
                required: true
            },
            bootNo: {
                type: Number,
                required:true
            },
            games: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>