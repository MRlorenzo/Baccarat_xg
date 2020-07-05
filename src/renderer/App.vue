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
                    @preView="printPreView"
        ></main-panel>

        <print-pre-view
                ref="preView"
                v-show="currView === 'preView'"
                :settings="userSetting"
                @cut="pageCut"
        >

        </print-pre-view>

        <do-print ref="dp"
            @printSuccess="printSuccess"
            @printError="printError"
        ></do-print>
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
	import PrintPreView from './views/PrintPreView/index';
	import DoPrint from './views/DoPrintView';

	const VIEW = {LOADING: 'loading', MAIN: 'main', AUTH: 'auth', PRE_VIEW: 'preView' , PRINT: 'print'}

	export default {
		name: 'app',
		components: { MainPanel , LoadingPage , AuthPage , PrintPreView , DoPrint},
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
            },
            showPreView(){
			    this.currView = VIEW.PRE_VIEW;
            },
            printPreView( data ){
			    this.$refs.preView.change(data);
                this.showPreView();
            },
            pageCut( dataURL ){
				this.currView = VIEW.PRINT;
				this.$refs.dp.ready(dataURL);
            },
			printSuccess(){
				this.currView = VIEW.MAIN;
            },
            printError(e){
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
