<template>
  <div>
    首页
  </div>
</template>

<script>

  export default {
    name: 'app',
    created(){
        this.$electron.ipcRenderer.once('connected-helper' , helper=>{
            console.log(helper);
        })
    }
  }
</script>

<style>
</style>
