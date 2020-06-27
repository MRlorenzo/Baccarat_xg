<template>
  <div id="main-box">
    首页

    <angle-eye @result="angleEyeResult"></angle-eye>

  </div>
</template>

<script>
    import AngleEye from './components/AngleEye';
	import Mousetrap from 'mousetrap';
    export default {
        name: 'app',
        components: {AngleEye},
        methods: {
        	angleEyeResult( baccaratResult ){
        		console.log('天使靴解析了百家乐结果:' ,  baccaratResult);
        		this.$road.push(baccaratResult);
            }
        },
        mounted(){
			/*Mousetrap.bind(['f12', 'ctrl+shift+i'], ()=>{
				this.$electron.ipcRenderer.send('openDevTools');
			});*/

			Mousetrap.bind('0 0 enter', ()=> {
				this.$electron.ipcRenderer.send('exitSystem');
            })

			Mousetrap.bind('. enter', ()=> {
				console.log('打开com口配置')
            })

        }
    }
</script>

<style>
  #main-box{}
</style>
