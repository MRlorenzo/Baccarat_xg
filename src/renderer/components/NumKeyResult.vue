<template>
    <input-game-result-view
            ref="inputGame"
    ></input-game-result-view>
</template>

<script>
	import Mousetrap from 'mousetrap';
	import BaccaratResult from "../../baccarat/result/BaccaratResult";
	import InputGameResultView from '../views/InputGameResultView';
	export default {
		name: "num-key-result",
        components: { InputGameResultView },
		data(){
			return {
				rsTxt: null,
				pairs: new Set(),
				skyCards: new Set()
			}
		},
		methods: {
			show( baccaratResult ){
				this.$refs.inputGame.open(baccaratResult);
            },
			setRsTxt( rsTxt ){
				this.rsTxt = rsTxt;
				this.pairs.clear();
				this.skyCards.clear();
				this.show(this.getGameResult());
			},
			addPairsCode( pairsCode ){
				this.pairs.add(pairsCode);
				if (this.rsTxt != null){
					this.show(this.getGameResult());
				}
			},
			addSkyCardCode( skyCardCode ){
				this.skyCards.add(skyCardCode);
				if (this.rsTxt != null){
					this.show(this.getGameResult());
				}
			},
			getGameResult(){
				let pairs = Array.from(this.pairs).join('');
				let skyCards = Array.from(this.skyCards).join('');
				const str = `${this.rsTxt}${pairs}${skyCards}`;
				return BaccaratResult.getResult(str);
			},
			confirm(){
				if (this.rsTxt != null){
					this.$emit('confirm' , this.getGameResult());
				}
				this.clear();
			},
            cancel(){
				this.$emit('cancel');
            },
			clear(){
				this.rsTxt = null;
				this.pairs.clear();
				this.skyCards.clear();
				this.$refs.inputGame.close();
			}
		},
		mounted(){
			Mousetrap.bind('1' , ()=>{
				this.setRsTxt('1');
			});
			Mousetrap.bind('2' , ()=>{
				this.setRsTxt('2');
			});
			Mousetrap.bind('3' , ()=>{
				this.setRsTxt('3');
			});
			Mousetrap.bind('4', ()=>{
				this.addPairsCode('4');
			});
			Mousetrap.bind('5', ()=>{
				this.addPairsCode('5');
			});
			Mousetrap.bind('+', ()=>{
				this.addSkyCardCode('+');
			});
			Mousetrap.bind('-', ()=>{
				this.addSkyCardCode('-');
			});
			Mousetrap.bind('enter', ()=>{
				this.confirm();
			});
			Mousetrap.bind('esc', ()=> {
				this.clear();
			});
			Mousetrap.bind('7' , ()=> {
				this.cancel();
			})
		}
	}
</script>

<style scoped>

</style>