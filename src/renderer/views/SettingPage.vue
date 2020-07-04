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
                        <el-select
                                v-model="item.currencyNames"
                                :placeholder="$t('settings.selectCoin')"
                                style="width: 100%"
                                :multiple-limit="2"
                                :multiple="true"
                        >
                            <el-option v-for="name of currencyNames"
                                   :key="name" :label="name" :value="name">

                            </el-option>
                        </el-select>
                    </el-form-item>

                    <!--语言-->
                    <el-form-item :label="$t('settings.language')" class="limit-input">
                        <el-select v-model="language" :placeholder="$t('settings.selectLanguage')" style="width: 100%">
                            <el-option v-for="l of languageNames" :key="l" :label="$t('settings.'+l)" :value="l"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--历史记录-->
                    <el-form-item :label="$t('settings.history')" class="limit-input">
                        <el-button  type="primary" @click="openResultHistory">
                            {{ $t('settings.showHistory') }}
                        </el-button>
                        <el-button type="primary" @click="openLastOneResultView">
                            {{ $t('settings.prevHistory')}}
                        </el-button>
                    </el-form-item>

                    <!--导入、导出配置-->
                    <el-form-item :label="$t('settings.fileio')" class="limit-input">
                        <el-button  type="primary" @click="importSettings">
                            {{ $t('settings.import')}}
                        </el-button>

                        <el-button  type="primary" @click="exportSettings">
                            {{$t('settings.export')}}
                        </el-button>

                    </el-form-item>

                    <!--限红组-->
                    <el-form-item :label="$t('settings.limitGroup')" >
                        <el-select v-model="d.limitGroup" :placeholder="$t('settings.selectLimitGroup')" style="width: 70%">
                            <el-option v-for="name of groupNames"
                               :key="name" :label="name" :value="name"
                            >
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click="openLimitGroup" style="width: 20%;float: right" icon="el-icon-edit">
                            {{$t('settings.updateGroup')}}
                        </el-button>
                    </el-form-item>

                    <!--限红列表-->
                    <div v-for="l of limitList" :key="l.label">
                        <el-tag class="currencyName">
                            {{l.label}}
                        </el-tag>
                        <br>
                        <!--下注最低值-->
                        <el-form-item :label="$t('settings.bet')" class="limit-input">
                            <el-input type="number"
                                      v-model="l.v.bet.min"
                                      autocomplete="off"
                                      suffix-icon="el-icon-edit">

                            </el-input>
                        </el-form-item>

                        <!--下注最高值-->
                        <el-form-item label="" class="limit-input">
                            <el-input type="number"
                                      v-model="l.v.bet.max"
                                      autocomplete="off"
                                      suffix-icon="el-icon-edit">

                            </el-input>
                        </el-form-item>

                        <!--和最低值-->
                        <el-form-item :label="$t('settings.tie')" class="limit-input">
                            <el-input type="number"
                                      v-model="l.v.tie.min"
                                      autocomplete="off"
                                      suffix-icon="el-icon-edit">

                            </el-input>
                        </el-form-item>

                        <!--和最高值-->
                        <el-form-item label="" class="limit-input">
                            <el-input type="number"
                                      v-model="l.v.tie.max"
                                      autocomplete="off"
                                      suffix-icon="el-icon-edit">

                            </el-input>
                        </el-form-item>

                        <!--对子最低值-->
                        <el-form-item :label="$t('settings.pairs')" class="limit-input">
                            <el-input type="number"
                                      v-model="l.v.pairs.min"
                                      autocomplete="off"
                                      suffix-icon="el-icon-edit">

                            </el-input>
                        </el-form-item>

                        <!--对子最高值-->
                        <el-form-item label="" class="limit-input">
                            <el-input type="number"
                                      v-model="l.v.pairs.max"
                                      autocomplete="off"
                                      suffix-icon="el-icon-edit">

                            </el-input>
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

        <limit-group
            ref="limitGroup"
            @submit="limitChange"
        ></limit-group>

        <result-history-view
            ref="last"
            :result="textResult"
            @submit="restoreResult"
        ></result-history-view>

        <result-history ref="history" @submit="restoreResult">

        </result-history>
    </div>
</template>

<script>
    import { clone , mergeSetting } from "../../utils";
    import { languageNames, getLanguage , setLanguage} from "../../utils/lang";
    import Limit from '../assest/def/limit';
    import LimitGroup from '../components/LimitGroup';
    import ResultHistoryView from '../components/ResultHistoryView';
    import ResultHistory from '../views/ResultHistory';
    import { lastOneHistory } from "../../file-system/result";
    import {exportSettingsFile, loadSettingsFile} from "../../file-system/conf";

    const blackList = ['currencyNames'];
    const defaultLimitItem = {
		currencyNames: ['USD'],
        USD: {
			bet: {max:0, min:0},
            tie: {max:0, min:0}
        },
        RMB: {
			bet: {max:0, min:0},
			tie: {max:0, min:0}
        },
        HKD: {
			bet: {max:0, min:0},
			tie: {max:0, min:0}
        }
    }

    export default {
        name: "setting-page",
        components: {LimitGroup , ResultHistoryView , ResultHistory},
        props:{
            /*用户配置*/
            setting:{
                type:Object,
                required: true
            },
            /*
            限红
            {
                'groupName': limitItem,
                ...
            }
            */
            limit: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
				visible: false,
                /*步数*/
                active: 1,
                d: clone(this.setting),
                item: clone(defaultLimitItem),
                limitList: [],
                language: getLanguage(),
				languageNames: languageNames,
				currencyNames: Object.keys(Limit.default).filter(k=> !blackList.includes(k)),
                textResult: ''
            }
        },
        computed: {
        	limitItem(){
				const { limitGroup } = this.d;
				return clone(this.limit[limitGroup]);
            },
            groupNames(){
                return Object.keys(this.limit).filter(k=>k!=='_id');
            }
        },
        watch:{
            language( lang ){
                this.$i18n.locale = lang;
				setLanguage(lang);
            },
			setting( setting ){
            	this.d = clone(setting);
            },
			limitItem(item){
            	this.item = item;
				this.limitList = this.item2List(item);
            },
            'item.currencyNames': function () {
				this.limitList = this.item2List(this.item);
			}
        },
        methods:{
        	open(){
        		this.visible = true;
				// 配置期间不要响应按键
				this.$fnKeyMap.stop();
            },
            close(){
        		this.visible = false;
        		this.$fnKeyMap.start();
            },
        	/*切换颜色*/
            change(val){
                this.$emit('colorChange' , val);
            },
            /*提交表单*/
            submit(){
            	const oldLimit = clone(this.limit);
            	const {limitGroup } = this.d;
            	oldLimit[limitGroup] = clone(this.item);
                this.$emit('submit' , {
                    userSetting: clone(this.d),
                    userLimit: clone(oldLimit)
                });
                this.close();
            },
            /*取消提交表单*/
            cancel(){
				this.close();
            },
            // 限红转列表
            item2List(item){
				const names = item.currencyNames || [];

				return Object.keys(item)
					.filter(name => names.includes(name))
					.map(currency=>{
						return {
							label: currency,
							v: item[currency]
						}
					});
            },
            /*打开限红组编辑页面*/
            openLimitGroup(){
            	this.$refs.limitGroup.open();
            },
            /*(新增/修改)限红组*/
            limitChange({groupName , limitItem}){
				const oldLimit = clone(this.limit);
				oldLimit[groupName] = limitItem;
				const userSetting = clone(this.d);
				userSetting.limitGroup = groupName;

				this.$emit('submit' , {
					userSetting: userSetting,
					userLimit: oldLimit
				});
            },
            /*展示游戏记录*/
            openResultView( result ){
                this.textResult = result;
                this.$refs.last.open();
            },
            /*打开最后一局历史记录*/
            async openLastOneResultView(){

                try {
                    this.openResultView(await lastOneHistory())
                }catch (e){
                    this.$message.error(e.message);
                }
            },
            /*还原游戏记录*/
            restoreResult( baccaratResults ){
            	this.$emit('restore' , baccaratResults);
            	this.close();
            },
            /*打开游戏记录历史页面*/
            openResultHistory(){
                this.$refs.history.open();
            },
            /*导入配置*/
            async importSettings(){
                const msg = '导入配置';
                try {
                    const data = await loadSettingsFile( msg );
                    const { userSettings , limitSettings} = data;
                    this.$emit('submit' , {
                        userSetting: userSettings,
                        userLimit: limitSettings
                    });
                    this.close();
                }catch (e){
                    this.$message.error(e.message);
                }
            },
            /*导出配置*/
            async exportSettings(){
                const msg = '导出配置';
                const userSetting = clone(this.d);
                const userLimit = clone(this.limit);
                userLimit[userSetting.limitGroup] = clone(this.item);
                try {
                    const filePath = await exportSettingsFile(msg , userSetting , userLimit);
                    this.$message.success(`saved at: ${filePath}`);
                }catch (e){
                    this.$message.error(e.message);
                }
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
        	// 打开配置
        	this.$fnKeyMap.addHooks('8', ()=> {
				this.open();
            });
            // 导入配置
            this.$fnKeyMap.addHooks('8 8',()=>{
				this.$message.info('导入配置');
            });

            // 导出配置
            this.$fnKeyMap.addHooks('7 7',()=>{
				this.$message.info('导出配置')
            });
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