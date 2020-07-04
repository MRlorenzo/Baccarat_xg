<template>

    <div>
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
    </div>
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
    .print-title-row{
        height: 66px;
        margin-top: 5px;
    }

    .pt-left{
        font-size: 45px;
        float: left;
    }
    .pt-right{
        float: right;
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

    /*庄家赢(空心圆)*/
    .border-b{
        border-color: red;
    }

    /*玩家赢(空心圆)*/
    .border-p{
        border-color: blue;
    }

    /*和(不显示空心圆)*/
    .border-none{
        border-color: gray;
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
</style>