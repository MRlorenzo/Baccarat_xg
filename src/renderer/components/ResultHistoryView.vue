<template>
    <el-dialog
            :show-close="false"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="50%"
            top="50px"
            :center="true"
            :visible.sync="visible"
            @opened="sizeVersion ++"
    >

            <bead-road :result-list="resultList" :size-version="sizeVersion">
            </bead-road>

        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">{{ $t('settings.cancel') }}</el-button>
            <el-button type="primary" @click="submit">{{ $t('settings.confirm') }}</el-button>
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
                visible: false,
                sizeVersion: 1
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
            submit(){
                this.$emit('submit' , this.resultList);
                this.visible = false;
            }
        }
    }
</script>

<style scoped>

</style>