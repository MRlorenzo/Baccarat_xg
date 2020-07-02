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
		// 触发随机的指令：9 9 enter
		this.$fnKeyMap.addHooks('9 9', ()=> {
			this.random();
		});
	}
}
