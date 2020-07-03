<template>
    <div>

        <el-dialog
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                title="history"
                width="50%"
                top="50px"
                :center="true"
                :visible.sync="visible"
        >

            <el-collapse v-model="activeName" accordion >
                <el-collapse-item v-for="res of results"
                                  :key="res.name"
                                  :title="res.name"
                                  :name="res.name"
                >
                    <el-timeline>
                        <el-timeline-item
                                v-for="c of res.children"
                                :key="c.name"
                                :timestamp="c.name"
                                placement="top"
                        >
                            <el-card @dblclick.native="submit(c.dataList)">
                                <bead-road
                                        :height="200"
                                        :width="800"
                                        :result-list="c.dataList"
                                >

                                </bead-road>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-collapse-item>

            </el-collapse>


            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false"> {{ $t('settings.close') }} </el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    import { gameResultDatas } from "../../file-system/result";
    import BeadRoad from '../components/road/BeadRoad';
    import BaccaratResult from "../../baccarat/result/BaccaratResult";

    export default {
        name: "result-history",
        components:{ BeadRoad },
        data(){
            return {
                visible: false,
                activeName: '1',
                textResult: '',
                results: []
            }
        },
        methods:{
            async open(){
                this.visible = true;
                this.results = this.format(await gameResultDatas());
                if( this.results.length> 0){
                    const [first] = this.results;
                    this.activeName = first.name;
                }
            },
            format( results ){
                return results.map(res=>{
                    return {
                        name: res.name,
                        children: res.children.map(c=>{
                            return {
                                name: c.name,
                                dataList: this.textToResult(c.data)
                            }
                        })
                    }
                })
            },
            textToResult( text ){
                const textList = text.split('\r\n');
                return textList.map(BaccaratResult.getResult)
            },
            async submit( baccaratResults ){
            	try {
            		await this.$confirm(
            			this.$t('settings.confirmRestore'),
                        this.$t('settings.restoreGameResult'),
                        {
                            confirmButtonText: this.$t('settings.confirm'),
                            cancelButtonText: this.$t('settings.cancel'),
                            type: 'warning'
                        });
					this.$emit('submit' , baccaratResults);
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