export default {
	methods: {
		/**
		 * 天使靴解析了百家乐结果
		 * @param baccaratResult
		 */
		angleEyeResult(baccaratResult) {
			// 将解析的结果添加到路单
			this.addResult(baccaratResult);
		}
	}
}