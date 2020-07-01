export default {
	methods: {
		/**
		 * 天使靴解析了百家乐结果
		 * @param baccaratResult
		 */
		angleEyeResult(baccaratResult) {
			this.$road.push(baccaratResult);
			this.beadResults = this.$road.arr;
			this.showShine();
		}
	}
}