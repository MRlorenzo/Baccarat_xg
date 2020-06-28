<template>
    <div class="el-carousel__container">
        <marquee>{{text2}}</marquee>
    </div>
</template>

<script>
    export default {
        name: "marquee-show",
        props:{
            text:{
                type: String
            }
        },
        data(){
            return {}
        },
        computed:{
            text2(){
              return this.text;
            }
        },
        methods:{
        },
        created(){
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
