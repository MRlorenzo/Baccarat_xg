<template>
    
</template>

<script>
	import AngleEyeHelper from "../../port/AngleEyeHelper";
  import { com , angle } from '../../local-storage';
  import defaultComConfig from '../../utils/comConfig.json';
  import defaultAngleConfig from '../../utils/angleConfig.json';
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

        if (comConfig == null){
            comConfig = defaultComConfig;
            com.save(comConfig);
        }
        if (angleConfig == null){
            angleConfig = defaultAngleConfig;
            angle.save(angleConfig);
        }

        let helper = new AngleEyeHelper(comConfig , angleConfig);
        this.initHooks(helper);
        window.helper = helper;
		}
	}
</script>

<style scoped>

</style>