<template>
  <div>
    首页
  </div>
</template>

<script>

  export default {
    name: 'app',
    created(){
        this.$electron.ipcRenderer.send('connect-serial-port');
        this.$electron.ipcRenderer.once('connected-helper' , (event , helper)=>{
            console.log(helper);
        })
    }
  }
</script>

<style>
</style>
