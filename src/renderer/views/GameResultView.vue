<template>
    <div v-show="showResult"  class="el-loading-mask is-fullscreen my-mask" >

        <div class="game-result">

            <div class="banker-card-box" :style="boxCss">
                <span class="card-text" style="left: 12vw">
                    {{ $t('road.B') }}
                </span>

                <div v-for="c in bankerStyles" class="card" :style="c.style">
                    <div class="face" :style="c.faceStyle"></div>
                    <div :class="c.left">{{c.point}}</div>
                    <div :class="c.right">{{c.point}}</div>
                </div>

            </div>

            <div class="game-result-center">
                <div :class="showClassName" :style="resultBullStyle">
                    {{name}}
                </div>
                <div class="pair-point pair-point-b" v-show="isBankerPair"></div>
                <div class="pair-point pair-point-p" v-show="isPlayerPair"></div>
            </div>

            <div class="player-card-box" :style="boxCss">
                <span class="card-text" style="right: 12vw">
                    {{ $t('road.P') }}
                </span>

                <div v-for="c in playerStyles" class="card" :style="c.style">
                    <div class="face" :style="c.faceStyle"></div>
                    <div :class="c.left">{{c.point}}</div>
                    <div :class="c.right">{{c.point}}</div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import Pairs from '../../baccarat/result/Pairs';
	import BaccaratResult from "../../baccarat/result/BaccaratResult";
    export default {
    	/*游戏结果(扑克牌)视图*/
        name: "game-result-view",
        props:{
            showResult:{
                type:Boolean,
                required:true
            },
            result: {
            	type: BaccaratResult
            },
            bankerCardList: {
            	type: Array
            },
            playerCardList: {
            	type: Array
            },
            bgColor:{
				type: String,
				default: '#ED8A20'
            },
			bodyWidth: {
            	type: Number,
                default: 0
            }
        },
        computed:{
        	boxCss(){
        		return 'background-color: '+this.bgColor
            },
            showClassName(){
                let className = 'zocial result-bull';
                if (this.result){
                	const bResult = this.result.getResult();
                	switch (bResult.getName()){
						case 'B':className+=' bg-b';break;
						case 'P':className+=' bg-p';break;
						case 'T':className+=' bg-t';break;
                    }
                }
                return className
            },
            isBankerPair(){
            	const pairs = this.result && this.result.getPairs();
                if(pairs){
                    let rs = false;
                    pairs.forEach(p=>{
                        if(p.index === Pairs.BP.index){
                            rs = true;
                        }
                    });
                    return rs;
                }else{
                    return false;
                }
            },
            isPlayerPair(){
				const pairs = this.result && this.result.getPairs();
				if(pairs){
					let rs = false;
					pairs.forEach(p=>{
						if(p.index === Pairs.PP.index){
							rs = true;
						}
					});
					return rs;
				}else{
					return false;
				}
            },
            name(){
                let _name = this.result && this.result.getResult().getName();
                switch (_name){
                    case 'B': _name = '庄';break;
                    case 'P': _name = '闲';break;
                    case 'T': _name = '和';break;
                }
                return _name;
            },
            bankerStyles(){
            	return this.getStyleList(this.bankerCardList);
            },
            playerStyles(){
				return this.getStyleList(this.playerCardList);
            }
        },
        methods:{
            getStyleList(cardList){
                let list = [];
				let styleList = [
					{
                        css:this.leftCardStyle,
                        clazz:{ left:'topleft' , right:'bottomright' }
                    } ,
                    {
                        css:this.rightCardStyle,
                        clazz:{ left:'topleft' , right:'bottomright'}
                    } ,
                    {
                        css:this.bottomCardStyle,
                        clazz:{ left:'leftUp' , right:'rightUp'}
                    }
                ];

				cardList.forEach( (card , index) =>{
					let suitNumber = card.getSuit().getValue() ;
					let pointNumber = card.getPoint().getValue();
					let pointName = card.getPoint().name;
					let imgUrl = `static/images/card/${suitNumber}_${pointNumber}_.svg`;
					let faceStyle = `background-image: url("${imgUrl}");`;
					if(index === 2){
						faceStyle += 'transform: rotate(90deg) scale(1.1 , 1.4);';
					}
					let css = styleList[index] ? styleList[index].css:'';

					if(suitNumber === 1 || suitNumber === 4){
						css += 'color: red;';
					}else{
						css += 'color: #000;';
					}

					let def = styleList[index];
					if( def == null ){
						//index>2说明已经超过三张牌了，不做处理
						//log.warn('游戏结果视图解析数据异常');
						return ;
					}
					let clazz = styleList[index].clazz;
					list.push({
						left: clazz.left,
						right: clazz.right,
						style: css ,
						point: pointName,
						faceStyle:faceStyle
					});
				});
                return list;
            }
        },
        data(){
            return {
                resultBullStyle:'',
                leftCardStyle:'',
                rightCardStyle:'',
                bottomCardStyle:''
            }
        },
        mounted(){

            let count = 0;

            let timer = setInterval(()=>{
                count++;
                let bodyWidth = this.bodyWidth;

                let boxWidth = bodyWidth * 0.8 * 0.2;
                let bankerBoxWidth = bodyWidth *0.8 * 0.4;

                let left = 30;
                let right = 30;
                let top = 10;
                let bottom = 10;
                let cardHeight = ((bankerBoxWidth -top*2 - bottom*2) - 60)/1.7;

                let cardWidth = cardHeight * 0.7;

                this.leftCardStyle = `
                height:${cardHeight}px;
                width:${cardWidth}px;
                left:${left}px;
                top:${top}px;`;

                this.rightCardStyle = `
                height:${cardHeight}px;
                width:${cardWidth}px;
                right:${right}px;
                top:${top}px;`;

                let bottomLeft = (bankerBoxWidth - cardHeight) / 2;

                this.bottomCardStyle = `
                height:${cardWidth}px;
                width:${cardHeight}px;
                left:${bottomLeft }px;
                bottom:${bottom}px;`;

                let fontSize = bodyWidth * (200 / 1920);

                this.resultBullStyle =  `height:${boxWidth}px;font-size:${fontSize}px;line-height:${fontSize * 1.5}px`;

                if(bodyWidth > 1000 || count> 20){
                    clearInterval(timer);
                }

            } , 500);


        }
    }
</script>

<style scoped>
    .my-mask{
        background-color: rgba(255, 255, 255, 0.6);
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
    .banker-card-box{
        width: 40%;
        height: 100%;
        position: absolute;
        border: 1px solid red;
    }

    .banker-card-box .card-text{
        color: red;
    }

    .player-card-box .card-text{
        color: blue;
    }

    .player-card-box{
        width: 40%;
        height: 100%;
        position: absolute;
        left: 60%;
        border: 1px solid blue;
    }

    .banker-card-box,.player-card-box{
        text-align: center;
        font-size: 200px;
        border-radius: 5px;
        box-shadow: 4px 5px 1px rgba(0,0,0,0.3);
    }
    .card-text{
        position: absolute;
        top:  -20vh;
        color: #FFF;
    }

    .result-bull{
        position: absolute;
        border-radius: 100%;
        top: 25%;
        width: 100%;
        height: 50%;
        color: white;
        text-align: center;
    }

    .card {
        position: absolute;
        display: inline-block;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        z-index: 51;
        cursor: move;
        opacity: 1;
    }

    .card .face {
        height: 100%;
        background-position: 50% 50%;
        -webkit-background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .card .topleft {
        top: 0.25rem;
        left: 1rem;
        transform: translate(-50%, 0);
    }
    .card .bottomright {
        font-size: 26px;
        bottom: 0.25rem;
        right: 1rem;
        transform: rotate(180deg) translate(-50%, 0);
    }

    .card .rightUp {
        left: 90%;
        top: 5%;
        transform: rotate(90deg);
    }

    .card .leftUp {
        left: 0;
        bottom: 5%;
        transform: rotate(-90deg);
    }
    .card .leftUp,.card .rightUp{
        width: 26px;
        height: 26px;
        font-size: 30px;
        position: absolute;
    }

    .card .topleft,
    .card .bottomright {
        position: absolute;
        font-size: 30px;
        text-align: center;
        line-height: 38px;
        font-family: 'Ubuntu Condensed', sans-serif;
        white-space: pre;
    }

    .card.spades,
    .card.clubs,
    .card.joker {
        color: #000;
    }
    .card.hearts,
    .card.diamonds {
        color: #f00;
    }

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
        top: 30%;
        left: 0;
    }
    /*闲对*/
    .pair-point-p{
        background-color: blue;
        top: 72%;
        left: 70%;
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