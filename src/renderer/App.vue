<template>
    <div>
        <loading-page
                v-show="currView === 'loading'"
                @done="done"
        ></loading-page>

        <auth-page
                v-show="currView === 'auth'"
                :serial-number="serialNumber"
                @done="authDone"
        ></auth-page>

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
	import AuthPage from './views/Auth';
	import defaultSetting from './assest/def/setting.json';
	import defaultLimit from './assest/def/limit.json';
	import { clone } from "../utils";
	import { auth } from "../local-storage";

	const VIEW = {LOADING: 'loading', MAIN: 'main', AUTH: 'auth'}

	export default {
		name: 'app',
		components: { MainPanel , LoadingPage , AuthPage},
        data(){
			return {
				userSetting: clone(defaultSetting),
                limitSetting: clone(defaultLimit),
				serialNumber: '',
                currView: VIEW.LOADING
            }
        },
        methods: {
			done( settings ){
			    const {
                    auth,
					serialNumber,
                    userSetting,
                    limitSetting
                } = settings;
			    this.serialNumber = serialNumber;
			    this.userSetting = userSetting;
			    this.limitSetting = limitSetting;
			    if (auth){
			    	this.showMain();
                }else{
			    	this.showAuth();
                }
            },
            async authDone( code ){
				await auth.update({},{code: code});
				this.showMain();
            },
            showAuth(){
				this.currView = VIEW.AUTH;
            },
            showMain(){
				this.currView = VIEW.MAIN;
				// 由于'main'一开始是隐藏的，所以它在计算样式的时候元素高度为0，
				// 因此需要在它完全显示的时候重新计算一次。
				this.$refs.main.onShow( clone(this.userSetting) );
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
