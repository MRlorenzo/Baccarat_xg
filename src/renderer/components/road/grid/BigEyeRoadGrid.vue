<template>
    <div :style="itemCss" :class="showClassName" v-show="result != null"></div>
</template>

<script>
    import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
	import BResultEnum from "../../../../baccarat/result/BResult";

	export default {
        name: "big-eye-road-grid",
        props:{
            itemCss:{
                type:String,
                required:true
            },
            result: {
            	type: BaccaratResult
            },
            shine:{ type:Boolean},
            lastResult:{ type:Object }
        },
        computed:{
            showClassName(){
                let className = 'zocial-shadow big-eye-grid';
                if (this.result != null){
                	const bResult = this.result.getResult();

                	switch ( bResult){
						case BResultEnum.B: className+=' border-b';break;
						case BResultEnum.P: className+=' border-p';break;
                    }
                }

                if(this.canShine()){
                    className += ' shine-border';
                }

                return className;
            }
        },
        methods:{
            canShine(){
                let can = false;

                if(this.shine && this.result  && this.lastResult){
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
    .big-eye-grid{
        margin: 1px;
        border-radius: 100%;
        border-width: 2.5px;
        border-style: solid;
        background-color: #FFF;
        position: relative;
    }

</style>
