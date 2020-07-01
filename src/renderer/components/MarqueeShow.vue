<template>
    <div class="el-carousel__container">
        <marquee ref="el" onmouseover="this.stop();" onmouseout="this.start();">{{text2}}</marquee>
    </div>
</template>

<script>
    export default {
        name: "marquee-show",
        props:{
            text:{
                type: String
            },
            showed: {
            	type: Boolean,
                default: false
            }
        },
        watch: {
        	showed(bl){
        		if(bl){
					this.$refs.el.start()
                }
            }
        },
        computed:{
            text2(){
              return this.text;
            }
        }
    }
</script>

<style scoped>
    .el-carousel__container{
        position: relative;
        height: 40px;
        overflow: hidden;
        font-size: 28px;
    }
</style>
