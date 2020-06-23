<template>
    
</template>

<script>
	import AngleEyeHelper from "../../port/AngleEyeHelper";
    import { com , angle } from '../../local-storage';
	export default {
		name: "angle-eye",
		methods: {
			initHooks( helper ){
				helper.setHooks({
					boot( d ){
						console.log('天使靴开机', d.getData());
					},
					standBy( d ){
						console.log('待机')
					},
					cardDrawing( d ){
						console.log(d.getData())
					},
					systemError(d){},
					gameResult(d){

					},
					cardDrawingEgig(d){},
					cancellationOfError(d){},
					lockOperation(d){},
					changeOfPresetValue(d){},
					cardDrawingRetransmission(d){

					},
					dealCardsShow(d){

					},
					revokeMultipleCards(d){},
					default(d){}
				});
			}
		},
		async created(){
            let comConfig = await com.findOne();
            let angleConfig = await angle.findOne();
            let helper = new AngleEyeHelper(comConfig , angleConfig);

            helper.whenDisconnect(err=>{
                console.log('失去连接');
                console.error(err);
            });

            try {
            	await helper.open();
            }catch(e){
            	// 打开失败
            	console.log(e);
            	console.error()
            }

            this.initHooks(helper);

            window.helper = helper;

            this.$electron.ipcRenderer.on('stopPort', event => {
            	helper.close();
            })
		}
	}
</script>

<style scoped>

</style>