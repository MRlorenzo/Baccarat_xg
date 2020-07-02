export default {
	methods: {
		/**
		 * 从小键盘输入的命令中解析到的百家乐结果
		 * @param baccaratResult
		 */
		confirmInputGameResult(baccaratResult) {
			// 将解析的结果添加到路单中
			this.addResult(baccaratResult);
		},
		/**
		 * 取消一局
		 */
		cancelGame() {
			this.$road.pop();
			this.beadResults = this.$road.arr;
			this.showShine();
		}
	}
}