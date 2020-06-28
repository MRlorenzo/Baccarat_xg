<template>
    
</template>

<script>
	import Mousetrap from 'mousetrap';
	import BaccaratResult from "../../baccarat/result/BaccaratResult";
	export default {
		/*小键盘按键处理器*/
		name: "num-key-code-handler",
        data(){
			return {
				rsTxt: null,
				pairs: new Set(),
				skyCards: new Set()
            }
        },
        methods: {
			setRsTxt( rsTxt ){
				this.rsTxt = rsTxt;
				this.pairs.clear();
				this.skyCards.clear();
				this.$emit('show' , this.getGameResult());
            },
            addPairsCode( pairsCode ){
				this.pairs.add(pairsCode);
				if (this.rsTxt != null){
					this.$emit('show' , this.getGameResult());
                }
            },
            addSkyCardCode( skyCardCode ){
				this.skyCards.add(skyCardCode);
				if (this.rsTxt != null){
					this.$emit('show' , this.getGameResult());
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
            clear(){
				this.rsTxt = null;
				this.pairs.clear();
				this.skyCards.clear();
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
				this.$emit('esc');
				this.clear();
            });
			Mousetrap.bind('7' , ()=> {
				this.$emit('cancel')
            })
        }
	}
</script>

<style scoped>

</style>