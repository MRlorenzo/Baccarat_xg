<template>
    <div :style="itemCss" :class="showClassName()" v-show="result != null || tie != null">
            {{tieLen}}
        <div class="pair-point pair-point-b" v-show="isBankerPair()"></div>
        <div class="pair-point pair-point-p" v-show="isPlayerPair()"></div>
    </div>
</template>

<script>
	import BResultEnum from "../../../../baccarat/result/BResult";
	import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
    import Point from "../../../../baccarat/road/loc/Point";
    export default {
        name: "big-road-grid",
        props:{
            itemCss:{
                type:String,
                required:true
            },
            point: {
                type: Point
            },
            shine:{
                type:Boolean
            },
            lastResult:{ type: BaccaratResult }
        },
        watch: {
        	point( p ){
                if (p != null){
        			if (p.z == null){
						p.onFirstEmptyChange((z)=>{
							this.$set(this.point , 'z', z);
							this.result = z;
						})
                    }
					this.result = this.point && this.point.z;
					this.tie = this.point && this.point.tie;
                }else{
                	this.result = null;
                	this.tie = null;
                }
            }
        },
        data(){
        	return {
        		tie: this.point && this.point.tie,
        		result: this.point && this.point.z
            }
        },
        computed:{
            isSkyCard(){
				if (this.result == null){
					return false;
				}
				const skyCards = this.result.getSkyCards();
				return skyCards.length > 0;
            },
            tieLen(){
                let len = (this.tie && this.tie.length) || 0;
                len = len>1? len : '';
                if (len === '' && this.isSkyCard){
                    len = "N";
                }
                return len;
            }
        },
        methods:{
        	isLastResult(p){
				return p.getObject() === this.$road.getLastResult();
            },
			isBankerPair(){
				const p = this.point;
				if (p == null){
					return false;
                }

                if (!p.isFirstPoint())
                    return p.isBankerPair();

				if (this.isLastResult(p)){
					return p.isBankerPair();
                }else{
					// 第一颗点的位置后面包含了和局
                    return Point.tieHasBankerPair(p.tie);
                }
            },
			isPlayerPair(){
				const p = this.point;
				if (p == null){
					return false;
				}
				if (!p.isFirstPoint())
					return p.isPlayerPair();

				if (this.isLastResult(p)){
					return p.isPlayerPair();
				}else {
					return Point.tieHasPlayerPair(p.tie);
                }
            },
			showClassName(){
				let clazz = 'zocial-shadow big-grid';
				if (this.result != null){
					const bResult = this.result.getResult();
					switch (bResult){
						case BResultEnum.B: clazz += ' border-b';break;
						case BResultEnum.P: clazz += ' border-p';break;
						case BResultEnum.T: clazz += ' border-t';break;
						default:;
					}
				} else {
					clazz += ' border-t'
				}

				if(this.canShine()){
					clazz += ' shine-border';
				}
				if (this.tie && this.tie.length){
					clazz += ' tieClass';
				}

				return clazz;
			},
            canShine(){
				let can = false;

				if(this.shine && this.result && this.lastResult){
					if(this.result.id === this.lastResult.id){
						can = true;
					}
				}
				return can;
            }
        }
    }
</script>

<style >
    /*边框闪烁*/
    .shine-border{
        animation:shineBorder 0.5s ease infinite;
    }
    @keyframes shineBorder {
        0% {opacity: 0}
        100%{opacity: 1}
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

    .big-grid{
        margin: 2px;
        border-radius: 100%;
        text-align: center;
        border-width: 4px;
        border-style: solid;
        background-color: #FFF;
        position: relative;
    }

    .tieClass{
        background: linear-gradient(150deg, transparent 65%, green 80%, green 80%, transparent 65%);
    }
</style>
