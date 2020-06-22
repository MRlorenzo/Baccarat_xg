<template>
  <div>
    首页
  </div>
</template>

<script>

  import AngleEyeHelper from "../port/AngleEyeHelper";

  export default {
    name: 'app',
    created(){
        this.$electron.ipcRenderer.send('getConfig');
        this.$electron.ipcRenderer.on('getConfig' , (event , config)=>{
			const { comConfig, angleConfig} = config;
			let helper = new AngleEyeHelper(comConfig , angleConfig);
			window.helper = helper;
        })
    }
  }
</script>

<style>
</style>
