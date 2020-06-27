<template>
  <div id="main-box">
    首页

    <angle-eye @result="angleEyeResult"></angle-eye>

    <com-setting-page ref="comSetting" @update="connectCom"></com-setting-page>
  </div>
</template>

<script>
    import AngleEye from './components/AngleEye';
    import ComSettingPage from './components/ComSettingPage';
    import Mousetrap from 'mousetrap';

    import ReOpenException from "../exception/ReOpenException";
    import UnknownException from "../exception/UnknownException";
    import UnableCloseException from "../exception/UnableCloseException";
    import ModuleException from "../exception/ModuleException";

    export default {
        name: 'app',
        components: {AngleEye, ComSettingPage},
        methods: {
            angleEyeResult(baccaratResult) {
                console.log('天使靴解析了百家乐结果:', baccaratResult);
                this.$road.push(baccaratResult);
            },
            openComSetting() {
                this.$refs.comSetting.open();
            },
            closeComSetting(){
                this.$refs.comSetting.close();
            },
            async connectCom( comName ){
                const helper = this.$angleEye;
                if (helper != null) {
                    try {
                        await helper.updateComName(comName);
                        this.closeComSetting();
                        console.log('打开成功')
                    } catch (e) {
                        // UnableCloseException,ModuleException,ReOpenException,UnknownException
                        if (e instanceof ReOpenException) {
                            console.log('重复打开')
                        }
                        if (e instanceof UnknownException) {
                            console.log(e.message)
                        }
                        if (e instanceof UnableCloseException) {
                            console.log('无法关闭资源')
                        }
                        if (e instanceof ModuleException) {
                            console.log(e.message);
                        }
                    }
                }else {
                    this.closeComSetting();
                }
            }
        },
        mounted() {
            /*Mousetrap.bind(['f12', 'ctrl+shift+i'], ()=>{
              this.$electron.ipcRenderer.send('openDevTools');
            });*/

            Mousetrap.bind('0 0 enter', () => {
                this.$electron.ipcRenderer.send('exitSystem');
            })

            Mousetrap.bind('. enter', () => {
                this.openComSetting();
            })

        }
    }
</script>

<style>
  #main-box {
  }
</style>
