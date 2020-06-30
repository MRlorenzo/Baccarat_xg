<template>
    <div>
        <loading-page v-show="currView === 'loading'" @done="done"></loading-page>
        <main-panel ref="main"
                    v-show="currView === 'main'"
                    :setting="userSetting"
                    :limit="limitSetting"
        ></main-panel>
    </div>
</template>

<script>
	import Mousetrap from 'mousetrap';
	import MainPanel from './views/MainPanel';
	import LoadingPage from './views/LoadingPage';
	import defaultSetting from './assest/def/setting.json';
	import defaultLimit from './assest/def/limit.json';
	import { clone } from "../utils";

	const VIEW = {LOADING: 'loading', MAIN: 'main'}

	export default {
		name: 'app',
		components: { MainPanel , LoadingPage},
        data(){
			return {
				userSetting: clone(defaultSetting),
                limitSetting: clone(defaultLimit),
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
                // 由于'main'一开始是隐藏的，所以它在计算样式的时候元素高度为0，
                // 因此需要在它完全显示的时候重新计算一次。
                this.$refs.main.onShow();
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
