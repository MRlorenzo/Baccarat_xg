<template>
    <div id="main-box">
        首页
        <div v-for="b in beadResults">
            {{ b }}
        </div>

        <angle-eye @result="angleEyeResult"></angle-eye>

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
			angleEyeResult(baccaratResult) {
				console.log('天使靴解析了百家乐结果:', baccaratResult);
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;
			},

			confirmInputGameResult(baccaratResult) {
				this.$road.push(baccaratResult);
				this.beadResults = this.$road.arr;

			},
			cancelGame() {
				this.$road.pop();
				this.beadResults = this.$road.arr;
			}
		}
	}
</script>

<style scoped>

</style>