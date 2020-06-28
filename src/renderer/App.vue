<template>
    <div>
        <loading-page v-show="currView === 'loading'" @done="done"></loading-page>
        <main-panel v-show="currView === 'main'"
                    :setting="userSetting"
                    :limit="limitSetting"
        ></main-panel>
    </div>
</template>

<script>
	import Mousetrap from 'mousetrap';
	import MainPanel from './views/MainPanel';
	import LoadingPage from './views/LoadingPage';

	const VIEW = {LOADING: 'loading', MAIN: 'main'}

	export default {
		name: 'app',
		components: { MainPanel , LoadingPage},
        data(){
			return {
				userSetting: null,
                limitSetting: null,
                currView: VIEW.LOADING
            }
        },
        methods: {
			done( settings ){
			    const {
                    authorizationCode,
                    userSetting,
                    limitSetting
                } = settings;
			    this.userSetting = userSetting;
			    this.limitSetting = limitSetting;
                this.currView = VIEW.MAIN;
            }
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
