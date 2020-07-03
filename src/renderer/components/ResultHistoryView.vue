<template>
    <el-dialog
            :show-close="false"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="50%"
            top="50px"
            :center="true"
            :visible.sync="visible"
    >

            <bead-road
                    :height="200"
                    :width="800"
                    :result-list="resultList"
            >
            </bead-road>

        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">{{ $t('settings.cancel') }}</el-button>
            <el-button type="primary" @click="submit">{{ $t('settings.restoreResult') }}</el-button>
        </div>

    </el-dialog>
</template>

<script>

    import BeadRoad from './road/BeadRoad';
    import BaccaratResult from "../../baccarat/result/BaccaratResult";

    export default {
        name: "result-history-view",
        props: ['result'],
        data(){
            return {
                resultList:[],
                visible: false
            }
        },
        watch:{
            result( result ){
                let resultList = [];
                if(typeof result === 'string'){
                    const textList = result.split('\r\n');
                    resultList = textList.map(BaccaratResult.getResult);
                } else
                if (Array.isArray(result)){
                    if (result.some(r=> typeof r === 'string')){
                        resultList = result.map(BaccaratResult.getResult);
                    }else if(result.some(r=> r instanceof BaccaratResult)){
                        resultList =[ ...this.result];
                    }
                }

                this.resultList = resultList;
            }
        },
        components:{BeadRoad},
        methods:{
            open(){
                this.visible = true;
            },
            async submit(){
				try {
					await this.$confirm(
						this.$t('settings.confirmRestore'),
						this.$t('settings.restoreGameResult'),
						{
							confirmButtonText: this.$t('settings.confirm'),
							cancelButtonText: this.$t('settings.cancel'),
							type: 'warning'
						});
					this.$emit('submit' , this.resultList);
					this.visible = false;
				}catch (e){
					this.$message.info(this.$t('settings.canceled'))
				}

            }
        }
    }
</script>

<style scoped>

</style>