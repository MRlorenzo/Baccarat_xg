<template>
    <div :style="itemCss" :class="showClassName" v-show="result != null">
        {{name}}
        <div class="pair-point pair-point-b" v-show="isBankerPair"></div>
        <div class="pair-point pair-point-p" v-show="isPlayerPair"></div>
    </div>
</template>

<script>
    import Pairs from '../../../../baccarat/result/Pairs';
	import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
	import BResultEnum from "../../../../baccarat/result/BResult";
    export default {
        name: "bead-road-grid",
        props:{
            itemCss:{
                type:String,
                required:true
            },
            result: {
            	type: BaccaratResult
            },
            shine:{ type: Boolean},
            lastResult:{ type: Object }
        },
        computed:{
            showClassName(){
                let className = 'zocial bead';
                if (this.result != null){
                	const bResult = this.result.getResult();

                	switch (bResult){
						case BResultEnum.B: className+=' bg-b';break;
						case BResultEnum.P: className+=' bg-p';break;
						case BResultEnum.T: className+=' bg-t';break;
						default:
							className = 'zocial sky-card';
                    }
                }

                if(this.canShine()){
                    className += ' shine-bg-color';
                }

                return className
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
            name(){
                let txt = '';
				if (this.result != null){
					const bResult = this.result.getResult();
					switch (bResult){
						case BResultEnum.B: txt = this.$t('road.B');break;
						case BResultEnum.P: txt = this.$t('road.p');break;
						case BResultEnum.T: txt = this.$t('road.t');break;
						default : txt = 'N';break;
					}
				}

                return txt;
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

<style scoped>

    .bead{
        border-radius: 100%;
        color: #FFF;
        line-height: 33px;
        font-size: 25px;
        text-align: center;
        margin: 1px;
        position: relative;
        font-family: 'Microsoft YaHei';
    }

    .sky-card{
        border-radius: 100%;
        color: #000;
        line-height: 33px;
        font-size: 20px;
        text-align: center;
        margin: 1px;
        position: relative;
    }

    /*庄对*/
    .pair-point-b{
        background-color: red;
        top: 0%;
        left: 0%;
    }
    /*闲对*/
    .pair-point-p{
        background-color: blue;
        top: 70%;
        left: 70%;
    }

</style>
