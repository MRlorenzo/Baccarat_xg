<template>
    <div v-show="showResult"  class="el-loading-mask is-fullscreen my-mask" >

        <div class="game-result">

            <div class="game-result-center">
                <div :class="showClassName" :style="style">
                    {{name}}

                    <div class="pair-point pair-point-b" :style="pairB" v-show="isBankerPair"></div>
                    <div class="pair-point pair-point-p" :style="pairP" v-show="isPlayerPair"></div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import Pairs from '../../baccarat/result/Pairs';
    export default {
        name: "input-game-result-view",
        data(){
            return {
                style:'',
                pairB:'',
                pairP:'',
				showResult: false,
				showClassName: '',
				isBankerPair: false,
				isPlayerPair: false,
                name: null
            }
        },
        methods: {
        	open(baccaratResult){
        		this.gen(baccaratResult);
				this.showResult = true;
            },
            gen( baccaratResult ){
        		if (baccaratResult == null){
        			return ;
                }
                const bResult = baccaratResult.getResult();
        		this.name = bResult.getName();
				const pairs = baccaratResult.getPairs();
				if (pairs == null){
					this.isBankerPair = false;
					this.isPlayerPair = false;
				}else {
					this.isBankerPair = pairs.some(p=> p.index === Pairs.BP.index);
					this.isPlayerPair = pairs.some(p=> p.index === Pairs.PP.index);
                }

				let className = 'result-bull';
				const name = this.name;
				if (name != null){
					switch (name){
						case 'B':className+=' bg-b';break;
						case 'P':className+=' bg-p';break;
						case 'T':className+=' bg-t';break;
					}
				}
				console.log(name);
				this.showClassName = className;
            },
            close(){
        		this.showResult = false;
            }
        },
        mounted(){

            let count = 0;

            let timer = setInterval(()=>{
                let el = document.getElementById('main-box');
                let bodyWidth = el.offsetWidth;

                let boxWidth = el.offsetWidth * 0.8 * 0.2;
                let warpHeight = el.offsetHeight*0.5;

                let offset = 10;

                let fontSize = boxWidth ;

                this.pairB = `left:${offset}px;top:${offset}px;`;
                /*之所以右下的这颗圆点要-3是因为右下有偏差*/
                let top = boxWidth - 50 - offset -3;
                this.pairP = `left:${boxWidth - 50 - offset -3}px;top:${top}px;`;
                let margetTop = (warpHeight - boxWidth) / 2;
                this.style = `height:${boxWidth}px;margin-top:${margetTop}px;font-size:${fontSize}px;line-height:${fontSize}px`;

                if(bodyWidth > 1000 || count> 20){
                    clearInterval(timer);
                }
            } , 500);


        }
    }
</script>

<style scoped>

    /*对子圆点样式*/
    .pair-point{
        width:50px;
        height: 50px;
        border:1px solid #FFF;
        border-radius: 100%;
        position: absolute;
    }
    /*庄对*/
    .pair-point-b{
        background-color: red;
    }
    /*闲对*/
    .pair-point-p{
        background-color: blue;

    }

    .my-mask{
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 2001;
    }
    .game-result{
        top: 25%;
        height: 50%;
        width: 80%;
        margin: 0 10%;
        position: absolute;
    }
    .game-result-center{
        position: absolute;
        left: 40%;
        width: 20%;
        height: 100%;
    }
    .result-bull{
        border-radius: 100%;
        text-align: center;
        color: white;
        position: relative;
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
</style>