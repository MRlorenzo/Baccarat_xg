<template>
    <div id="setting-page">

        <!--对话框-->
        <el-dialog
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :title="$t('settings.setting')"
                width="50%"
                top="50px"
                :center="true"
                :visible.sync="visible">

            <!--表单-->
            <el-form :inline="false" label-width="100px">

                <!--进度条-->
                <el-steps :active="active" finish-status="success">
                    <el-step :title="$t('settings.base')" icon="el-icon-monitor"></el-step>
                    <el-step :title="$t('settings.order')" icon="el-icon-document-copy"></el-step>
                </el-steps>

                <!--表单显示区域1-->
                <div v-show="active === 1">
                    <!--桌号-->
                    <el-form-item :label="$t('settings.tableName')" class="limit-input">
                        <el-input v-model="d.tableName" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                    </el-form-item>

                    <!--靴号-->
                    <el-form-item :label="$t('settings.bootNo')" class="limit-input">
                        <el-input v-model="d.bootNo" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                    </el-form-item>

                    <!--币种-->
                    <el-form-item :label="$t('settings.coin')"  class="limit-input">
                        <!--<el-select
                                v-model="d.currencyIds"
                                :placeholder="$t('settings.selectCoin')"
                                style="width: 100%"
                                :multiple-limit="2"
                                :multiple="true"
                        >
                            <el-option v-for="c in settings.currencyList" :label="c.txt" :value="c.id"></el-option>
                        </el-select>-->
                    </el-form-item>

                    <!--语言-->
                    <el-form-item :label="$t('settings.language')" class="limit-input">
                        <el-select v-model="d.language" :placeholder="$t('settings.selectLanguage')" style="width: 100%">
                            <!--<el-option v-for="l in languages" :label="l.data.typeName" :value="l.id"></el-option>-->
                        </el-select>
                    </el-form-item>

                    <!--限红组-->
                    <el-form-item :label="$t('settings.limitGroup')" >
                        <el-select v-model="d.limitGroup" :placeholder="$t('settings.selectLimitGroup')" style="width: 70%">
                            <!--<el-option v-for="name in limitGroupNames" :label="name" :value="name"></el-option>-->
                        </el-select>
                        <el-button type="primary" style="width: 20%;float: right" icon="el-icon-edit">
                            {{$t('settings.updateGroup')}}
                        </el-button>
                    </el-form-item>

                    <!--限红列表-->
                    <div v-for="l in limitList">
                        <el-tag class="currencyName">
                            {{l.currencyName}}
                        </el-tag>
                        <br>
                        <!--下注最低值-->
                        <el-form-item :label="$t('settings.bet')" class="limit-input">
                            <el-input type="number" v-model="l.betLimit.min" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>

                        <!--下注最高值-->
                        <el-form-item label="" class="limit-input">
                            <el-input type="number" v-model="l.betLimit.max" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>

                        <!--和最低值-->
                        <el-form-item :label="$t('settings.tie')" class="limit-input">
                            <el-input type="number" v-model="l.tieLimit.min" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>

                        <!--和最高值-->
                        <el-form-item label="" class="limit-input">
                            <el-input type="number" v-model="l.tieLimit.max" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>

                        <!--对子最低值-->
                        <el-form-item :label="$t('settings.pairs')" class="limit-input">
                            <el-input type="number" v-model="l.pairLimit.min" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>

                        <!--对子最高值-->
                        <el-form-item label="" class="limit-input">
                            <el-input type="number" v-model="l.pairLimit.max" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                    </div>

                </div>


                <!--表单显示区域2-->
                <div v-show="active === 2">

                    <!--颜色选择器-->
                    <el-form-item :label="$t('settings.bgColor')">
                        <el-color-picker v-model="d.backgroundColor"
                                         color-format="hex"
                                         @active-change="change"></el-color-picker>
                    </el-form-item>


                    <el-form-item :label="$t('settings.fileio')">
                        <el-button  type="primary">
                            {{ $t('settings.import')}}
                        </el-button>

                        <el-button  type="primary">
                            {{$t('settings.export')}}
                        </el-button>

                    </el-form-item>


                    <el-form-item :label="$t('settings.history')">
                        <el-button  type="primary">
                            {{ $t('settings.showHistory') }}
                        </el-button>
                        <el-button type="primary" >
                            {{ $t('settings.prevHistory')}}
                        </el-button>
                    </el-form-item>

                    <el-form-item :label="$t('settings.showResultTime')">
                        <el-input type="number" v-model="d.showResultTime" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('settings.marqueeText')">
                        <el-input
                                type="textarea"
                                :rows="5"
                                :placeholder="$t('settings.enterTxt')"
                                v-model="d.marqueeText">
                        </el-input>
                    </el-form-item>

                    <el-form-item :label="$t('settings.orderMarqueeText')">
                        <el-input
                                type="textarea"
                                :rows="5"
                                :placeholder="$t('settings.enterTxt')"
                                v-model="d.orderMarqueeText">
                        </el-input>
                    </el-form-item>

                </div>


            </el-form>

            <!--表单控制区-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="pre" icon="el-icon-arrow-left">
                    {{ $t('settings.prev') }}
                </el-button>
                <el-button @click="next">
                    {{ $t('settings.next') }}
                    <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
                <el-button @click="cancel">
                    {{ $t('settings.cancel') }}
                </el-button>
                <el-button type="primary" @click="submit">
                    {{ $t('settings.confirm') }}
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { clone } from "../../utils";

	let defaultLimit = {
        betLimit: {max: 0,min: 0},
        pairLimit: {max: 0,min: 0},
        tieLimit: {max: 0,min: 0}
    }

    export default {
        name: "setting-page",
        props:{
            /*表单数据*/
            settings:{
                type:Object,
                required: true
            }
        },
        data(){
            return{
                /*步数*/
                active: 1,
                d: clone(this.settings),
				limitList: [ defaultLimit ],
				visible: false
            }
        },
        watch:{
			settings( settings ){
            	this.d = clone(settings);
            }
        },
        methods:{
        	open(){
        		this.visible = true;
            },
            close(){
        		this.visible = false;
            },
        	/*切换颜色*/
            change(val){
                this.$emit('colorChange' , val);
            },
            /*提交表单*/
            submit(){
                this.$emit('submit' , this.formData);
                this.close();
            },
            /*取消提交表单*/
            cancel(){
				this.close();
            },
            /*打开导出提示框*/
            openSaveDialog(){

            },
            /*打开导入提示框*/
            openImportDialog(){

            },
            /*进度条下*/
            next() {
                this.active++;
                if (this.active > 2){
                    this.active = 1
                }
            },
            /*进度条上*/
            pre(){
                this.active--;
                if(this.active < 1) {
                    this.active = 2
                }
            }
        },
        mounted(){
			Mousetrap.bind('8 enter' , ()=> {
				this.open();
			});
            // 导入配置
            Mousetrap.bind('8 8 enter' , ()=> {

            });

            // 导出配置
            Mousetrap.bind('7 7 enter', ()=> {

            })
        }
    }
</script>

<style scoped>
    .currencyName{
        display: block;
        text-align: center;
        margin: 0 auto;
    }
    .limit-input{
        width: 50%;
        margin-right: -10px;
        display: inline-block;
    }
</style>