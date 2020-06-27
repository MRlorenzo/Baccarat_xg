<template>
    <div id="main-box">
        首页

        <angle-eye @result="angleEyeResult"></angle-eye>

        <com-setting-page ref="comSetting"></com-setting-page>
    </div>
</template>

<script>
	import AngleEye from './components/AngleEye';
	import ComSettingPage from './components/ComSettingPage';
	import Mousetrap from 'mousetrap';

	export default {
		name: 'app',
		components: {AngleEye, ComSettingPage},
		methods: {
			angleEyeResult(baccaratResult) {
				console.log('天使靴解析了百家乐结果:', baccaratResult);
				this.$road.push(baccaratResult);
			},
            openComSetting(){
				this.$refs.comSetting.open();
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
