<template>
    <div :style="itemCss" :class="showClassName" v-show="result != null">
            {{tieLen}}
        <div class="pair-point pair-point-b" v-show="isBankerPair"></div>
        <div class="pair-point pair-point-p" v-show="isPlayerPair"></div>
    </div>
</template>

<script>
	import Pairs from '../../../../baccarat/result/Pairs';
	import BResultEnum from "../../../../baccarat/result/BResult";
	import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
    export default {
        name: "big-road-grid",
        props:{
            itemCss:{
                type:String,
                required:true
            },

            result: {
            	type: BaccaratResult
            },
            tie: {
            	type: Array
            },
            shine:{
                type:Boolean
            },
            lastResult:{ type:Object }
        },
        computed:{
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
					clazz += ' border-none'
                }

                if(this.canShine()){
                    clazz += ' shine-border';
                }
                if (this.tie && this.tie.length){
                    clazz += ' tieClass';
                }

                return clazz;
            },
			isBankerPair(){
				if (this.result == null){
					return false;
				}
				const pairs = this.result.getPairs();
				if (pairs == null){
					return false;
				}else {
					return pairs.some(p=> p.index === Pairs.BP.index);
				}
			},
			isPlayerPair(){
				if (this.result == null){
					return false;
				}
				const pairs = this.result.getPairs();
				if (pairs == null){
					return false;
				}else {
					return pairs.some(p=> p.index === Pairs.PP.index);
				}
			},
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
