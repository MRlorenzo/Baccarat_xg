<template>
    <div :style="itemCss" :class="showClassName" v-show="result != null"></div>
</template>

<script>
    import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
	import BResultEnum from "../../../../baccarat/result/BResult";

	export default {
        name: "small-road-grid",
        props:{
            itemCss:{
                type:String,
                required:true
            },
            result: {
            	type: BaccaratResult
            },
            shine:{ type:Boolean},
            lastResult:{ type: BaccaratResult }
        },
        computed:{
            showClassName(){
                let className = 'zocial small-grid';
				if (this.result != null){
					const bResult = this.result.getResult();
					switch (bResult){
						case BResultEnum.B: className+=' bg-b';break;
						case BResultEnum.P: className+=' bg-p';break;
						default:;
					}
				}
                if(this.canShine()){
                    className += ' shine-bg-color';
                }
                return className;
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
    /*背景闪烁*/
    .shine-bg-color{
        animation:shineBgColor 0.5s ease infinite;
    }
    @keyframes shineBgColor {
        0% {opacity: 0}
        100%{opacity: 1}
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
    .small-grid{
        margin: 1px;
        border-radius: 100%;
        position: relative;
    }
</style>