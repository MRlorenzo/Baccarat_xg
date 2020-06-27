<template>
  <div id="main-box">
    首页

    <angle-eye @result="angleEyeResult"></angle-eye>

  </div>
</template>

<script>
    import AngleEye from './components/AngleEye';
    export default {
        name: 'app',
        components: {AngleEye},
        methods: {
        	angleEyeResult( baccaratResult ){
        		console.log('天使靴解析了百家乐结果:' ,  baccaratResult);
        		this.$road.push(baccaratResult);
            }
        }
    }
</script>

<style>
  #main-box{}
</style>
