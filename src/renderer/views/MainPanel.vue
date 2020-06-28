<template>
    <div id="main-box">
        首页
        <div v-for="b in beadResults">
            {{ b }}
        </div>

        <angle-eye @result="angleEyeResult"></angle-eye>

        <com-setting-page ref="comSetting" @update="connectCom"></com-setting-page>

        <num-key-code-handler
            @show="showInputGameResult"
            @confirm="confirmInputGameResult"
            @esc="escInputGame"
            @cancel="cancelGame"
        ></num-key-code-handler>

        <input-game-result-view
            ref="inputGame"
        ></input-game-result-view>
    </div>
</template>

<script>
	import AngleEye from '../components/AngleEye';
	import ComSettingPage from './ComSettingPage';
	import Mousetrap from 'mousetrap';
	import ReOpenException from "../../exception/ReOpenException";
	import UnknownException from "../../exception/UnknownException";
	import UnableCloseException from "../../exception/UnableCloseException";
	import ModuleException from "../../exception/ModuleException";
	import NumKeyCodeHandler from '../components/NumKeyCodeHandler';
	import InputGameResultView from '../views/InputGameResultView';
	export default {
		name: "main-panel",
        props: {
			setting: {
				type: Object
            }
        },
		components: {
			AngleEye,
            ComSettingPage ,
            NumKeyCodeHandler,
            InputGameResultView
        },
        data(){
			return {
				beadResults: []
            }
        },
        watch: {
			beadResults() {
				const { result , nextTest} = this.$road.updateResult();
				console.log(result);
				console.log(nextTest);
            }
        },
		methods: {
			angleEyeResult(baccaratResult) {
				console.log('天使靴解析了百家乐结果:', baccaratResult);
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;
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
			},
            showInputGameResult( baccaratResult ){
				this.$refs.inputGame.open(baccaratResult);
            },
			confirmInputGameResult( baccaratResult ){
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;
				this.$refs.inputGame.close();
            },
            escInputGame(){
				this.$refs.inputGame.close();
            },
			cancelGame(){
				this.$road.pop();
				this.beadResults = this.$road.arr;
            }
		},
		mounted() {

			Mousetrap.bind('. enter', () => {
				this.openComSetting();
			})
            window.vm = this;
		}
	}
</script>

<style scoped>

</style>