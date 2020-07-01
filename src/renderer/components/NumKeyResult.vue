<template>
    <div ref="box" tabindex="1">
        <input-game-result-view
                ref="inputGame"
        ></input-game-result-view>
    </div>
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
				this.$refs.box.focus();
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
			/*全局按键绑定*/
			this.$fnKeyMap.keyIn('1' , ()=>{
				this.setRsTxt('1');
            });

			this.$fnKeyMap.keyIn('2' , ()=>{
				this.setRsTxt('2');
			});

			this.$fnKeyMap.keyIn('3' , ()=>{
				this.setRsTxt('3');
			});

			/*全局的按键绑定(支持重复按键)*/
			this.$fnKeyMap.addHooks('7' , ()=>{
				this.cancel();
            });

            /*在结果视图有效*/
			const box = new Mousetrap(this.$refs.box);
			box.bind('esc', ()=> {
				this.clear();
			});

			box.bind('4', ()=>{
				this.addPairsCode('4');
			});
			box.bind('5', ()=>{
				this.addPairsCode('5');
			});
			box.bind('+', ()=>{
				this.addSkyCardCode('+');
			});
			box.bind('-', ()=>{
				this.addSkyCardCode('-');
			});
			box.bind('enter', ()=>{
				this.confirm();
			});
		}
	}
</script>

<style scoped>

</style>