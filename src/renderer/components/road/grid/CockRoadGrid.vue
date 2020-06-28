<template>
    <div :style="itemCss" :class="showClassName" v-show="result != null">
        <svg class="defs">
            <defs>
                <svg id="slash" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
                    <rect :x="x" :y="y" :width="width" :height="height"/>
                </svg>
            </defs>
        </svg>
        <svg class="slash" aria-hidden="true" role="image" :style="svgWH"><use xlink:href="#slash"/></svg>

    </div>
</template>

<script>
    import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
	import BResultEnum from "../../../../baccarat/result/BResult";

	export default {
        name: "cock-road-grid",
        props:{
            itemCss:{
                type:String,
                required:true
            },
            result: {
            	type: BaccaratResult
            },
            shine:{ type: Boolean},
            lastResult:{ type: Object },
            enlarge:{ type: String, default: "1"},
            size:{ type:Array, default: ()=> [0,0,4,20]},
        },
        computed:{
            showClassName(){
                let className = 'game-text';
				if (this.result != null){
					const bResult = this.result.getResult();
					switch (bResult){
						case BResultEnum.B: className+=' text-b';break;
						case BResultEnum.P: className+=' text-p';break;
						default:;
					}
				}
                if(this.canShine()){
                    className += ' shine-text';
                }
                return className;
            },
            viewBox(){
                let size = this.size, enlarge = parseFloat(this.enlarge);
                return size[0]*enlarge + " " + size[1]*enlarge + " " + size[2]*enlarge + " " + size[3]*enlarge;
            },
            x(){
                return this.getSize(0);
            },
            y(){
                return this.getSize(1);
            },
            width(){
                return this.getSize(2);
            },
            height(){
                return this.getSize(3);
            },
            svgWH(){
                return "width:" + this.getSize(2) + "px;height:" + this.getSize(3) + "px;";
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
            },
            getSize(index){
                return this.size[index] * parseFloat(this.enlarge);
            }
        }
    }
</script>

<style scoped>

    .defs {
        width: 0;
        height: 0;
    }
    .slash {
        width: 4px;
        height: 40px;
        -webkit-transform: rotate(45deg) translateZ(0);
        transform: rotate(45deg) translateZ(0);
        -webkit-transition: none;
        transition: none;
    }

</style>
