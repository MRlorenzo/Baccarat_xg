export default {
	methods: {
		/*随机*/
		random(){
			this.$road.random(30);
			this.beadResults = this.$road.arr;
			this.showShine();
		}
	},
	mounted(){
		// 随机
		this.$fnKeyMap.addHooks('9 9', ()=> {
			this.random();
		});
	}
}
