<template>
  <div>
    首页
  </div>
</template>

<script>

  import AngleEyeHelper from "../port/AngleEyeHelper";

  export default {
    name: 'app',
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
    created(){
        this.$electron.ipcRenderer.send('getConfig');
        this.$electron.ipcRenderer.on('getConfig' , (event , config)=>{
			const { comConfig, angleConfig} = config;
			let helper = new AngleEyeHelper(comConfig , angleConfig);
			this.initHooks(helper);
			window.helper = helper;
        })
    }
  }
</script>

<style>
</style>
