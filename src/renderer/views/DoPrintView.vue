<template>
    <!-- 旋转90° style="transform:rotate(90deg);"-->
    <div>
        <img :src="imgSrc" ref="printImg" alt="" >

    </div>
</template>

<script>
    import { printPage } from "../../utils/for-window";

	export default {
        name: "do-print-view.vue",
        data(){
            return {
                imgSrc: ''
            }
        },
        methods: {
            ready( base64 ){
            	this.imgSrc = base64;
				let img = this.$refs.printImg;
				/*确保img加载完毕，后执行print*/
				let timer = setInterval(()=>{
					if(img.complete){
						this.print();
						clearInterval(timer);
					}
				} , 200);
            },
            async print(){
            	try{
            		await printPage();
					this.$emit('printSuccess');
                }catch (e){
					this.$emit('printError' , e);
                }
            }
        }
    }
</script>

<style scoped>
    @media print {
        @page  {
            /*
            *   测试了 margin,size,padding的支持情况，padding基本不支持
            *   margin 系列 margin-right,margin-bottom并没有达到预期的效果（不产生边距，只会隐藏相应的部分）
            *   size 一旦指定会强制产生默认边距，没办法消掉而且size=A4,A3等的默认边距贼大（目测超过30mm）
            *****/

            /*size: 300mm 550mm ;*/
            /*margin-top: 5mm;*/
            /*margin-right: 0;*/

            /*margin-left: 2cm;
            margin-right: 2cm;*/
            /*margin-top: 0;
            margin-bottom: 0;
            size: A4;*/
        }
    }

    *{
        margin: 0;
        padding: 0;
    }


    img{
        /*适合打印机的宽度*/
        width: 1800px;
    }
</style>