<template>
    
</template>

<script>
	import AngleEyeHelper from "../../port/AngleEyeHelper";
    import { com , angle } from '../../local-storage';
	import ReOpenException from "../../exception/ReOpenException";
	import UnknownException from "../../exception/UnknownException";
	import EmptyPortException from "../../exception/EmptyPortException";
	import ErrorNameException from "../../exception/ErrorNameException";
	import ModuleException from "../../exception/ModuleException";
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
            	if (err instanceof UnknownException){
            		if (err.code === 500){
            			// 定时器检查到isOpen状态为false
                    }
                }
                if (err instanceof ModuleException){
					// 模块异常
                }
				// 真.未知异常
				console.error(err)
            });

            try {
            	await helper.open();
            }catch(e){
				if (e instanceof ModuleException){
					// 模块异常
				}
				// 没有串口
				if (e instanceof EmptyPortException){

                }
                // 存在多个串口，但是配置的串口名称不匹配
                if (e instanceof ErrorNameException){

                }
				if (e instanceof ReOpenException){
                    // 重复打开资源，无需处理
				}
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