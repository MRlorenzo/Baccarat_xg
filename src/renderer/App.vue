<template>
    <div>
        <div v-show="currView === 'loading'">
            欢迎页面....
        </div>
        <main-panel v-show="currView === 'main'" :setting="userSetting"></main-panel>
    </div>
</template>

<script>
	import Mousetrap from 'mousetrap';
	import MainPanel from './views/MainPanel';
	import { setting } from "../local-storage";
	import defaultSetting from '../utils/setting.json';

	const VIEW = {LOADING: 'loading', MAIN: 'main'}

	export default {
		name: 'app',
		components: { MainPanel },
        data(){
			return {
				userSetting: defaultSetting,
                currView: VIEW.LOADING
            }
        },
        methods: {
			async initSetting(){
				let userSetting = await setting.findOne();
				if (userSetting == null){
					userSetting = defaultSetting;
					await setting.save(userSetting);
                }
                this.userSetting = userSetting;
                return userSetting;
            }
        },
        async created(){
			// 初始化配置信息
			await this.initSetting();
			this.currView = VIEW.MAIN;
        },
		mounted() {
			// 小键盘触发按键关闭程序
			Mousetrap.bind('0 0 enter', () => {
				this.$electron.ipcRenderer.send('exitSystem');
			})
		}
	}
</script>

<style>
    #main-box {
    }
</style>
