<template>
    <div id="main-box">
        首页
        <div v-for="b in beadResults">
            {{ b }}
        </div>

        <!-- 负责接收天使靴的游戏结果-->
        <angle-eye @result="angleEyeResult"></angle-eye>

        <!-- 负责解析按键游戏结果-->
        <num-key-result
                @confirm="confirmInputGameResult"
                @cancel="cancelGame"
        >
        </num-key-result>
    </div>
</template>

<script>
	import AngleEye from '../components/AngleEye';
    import NumKeyResult from '../components/NumKeyResult';
	export default {
		name: "main-panel",
		props: {
			setting: {
				type: Object
			}
		},
		components: {
			AngleEye,
			NumKeyResult
		},
		data() {
			return {
				beadResults: []
			}
		},
		watch: {
			beadResults() {
				const {result, nextTest} = this.$road.updateResult();
				console.log(result);
				console.log(nextTest);
			}
		},
		methods: {
			/**
             * 天使靴解析了百家乐结果
			 * @param baccaratResult
			 */
			angleEyeResult(baccaratResult) {
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;
			},

			/**
             * 从小键盘输入的命令中解析到的百家乐结果
			 * @param baccaratResult
			 */
			confirmInputGameResult(baccaratResult) {
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;

			},
			/**
             * 取消一局
			 */
			cancelGame() {
				this.$road.pop();
				this.beadResults = this.$road.arr;
			}
		}
	}
</script>

<style scoped>

</style>