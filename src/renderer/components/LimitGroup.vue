<template>
    <el-dialog
            :show-close="false"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :title="$t('limit.setting')"
            width="50%"
            top="150px"
            :center="true"
            :visible.sync="visible"
    >

        <el-form  :inline="false" label-width="100px" >

            <el-form-item :label="$t('limit.groupName')">
                <el-input v-model="groupName" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>

            <el-form-item :label="$t('limit.coin')"  style="width: 100%;">
                <el-select
                        v-model="item.currencyNames"
                        :placeholder="$t('limit.selectCoin')"
                        style="width: 100%"
                        :multiple-limit="2"
                        :multiple="true"
                >
                    <el-option v-for="name of currencyNames"
                             :key="name" :label="name" :value="name">

                    </el-option>
                </el-select>
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

        </el-form>

        <!--表单控制区-->
        <div slot="footer" class="dialog-footer">

            <el-button @click="cancel">
                {{ $t('limit.cancel') }}
            </el-button>

            <el-button type="primary" @click="submit">
                {{ $t('limit.new') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
	import Limit from '../assest/def/limit';
	import { clone } from "../../utils";
	const blackList = ['currencyNames'];
	const defaultLimitItem = {
		currencyNames: ['USD'],
		USD: {
			bet: {max:0, min:0},
			tie: {max:0, min:0},
            pairs: {max:0, min:0}
		},
		RMB: {
			bet: {max:0, min:0},
			tie: {max:0, min:0},
			pairs: {max:0, min:0}
		},
		HKD: {
			bet: {max:0, min:0},
			tie: {max:0, min:0},
			pairs: {max:0, min:0}
		}
	}
	export default {
		name: "limit-group",
        data(){
			return {
				visible: false,
				groupName: null,
				currencyNames: Object.keys(Limit.default).filter(k=> !blackList.includes(k)),
				item: clone(defaultLimitItem),
				limitList: []
            }
        },
        methods: {
			cancel(){
				this.clear();
            },
            submit(){
				if (this.groupName == null){
					return ;
                }
				this.$emit('submit',{
					groupName: this.groupName,
                    limitItem: clone(this.item)
                });
				this.clear();
            },
            open(){
				this.visible = true;
            },
            clear(){
				this.visible = false;
				this.item = clone(defaultLimitItem);
				this.limitList = this.item2List(this.item);
				this.groupName = null;
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
			}
        },
        created(){
			this.limitList = this.item2List(this.item);
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