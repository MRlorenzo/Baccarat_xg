<template>
    <div>
        <el-container :style="bgImg" class="main">
            <div class="progress">
                <el-progress :percentage="percentage" status="success" >

                </el-progress>
            </div>
            <div class="progress-text">
                {{text}}
            </div>
        </el-container>
    </div>
</template>

<script>
    import { setting , limit , auth } from "../../local-storage";
    import defaultSetting from '../assest/def/setting.json';
    import defaultLimit from '../assest/def/limit.json';
    import { getLanguage } from "../../utils/lang";
    import { mac , md5 , decrypt} from "../../utils/auth";
    import Logo from '../../../static/images/com_logo.jpg';
	export default {
        name: "loading-page",
        data(){
            return {
                actionCount: 0,
                text: '初始化语言包'
            }
        },
        computed: {
            bgImg(){
                return `background-image: url(${Logo})`
            },
            percentage(){
                return (this.actionCount / 4) *100
            }
        },
        methods: {
            async initSetting(){
                let userSetting = await setting.findOne();
                if (userSetting == null){
                    userSetting = defaultSetting;
                    await setting.save(userSetting);
                }
                return userSetting;
            },
            async initLimit(){
                let limitSetting = await limit.findOne();
                if (limitSetting == null){
                    limitSetting = defaultLimit;
                    await limit.save(limitSetting);
                }
                return limitSetting;
            },
            async initAuth(){
            	const data = await auth.findOne();
            	if (data == null){
            		auth.save({code: ''});
            		return null;
                }
                return data.code;
            },
            // 序列号
            async initSerialNumber(){
            	const macAddress = await mac();
            	return await md5(macAddress);
            },
            async doAuth(serialNumber , authorizationCode){
            	try {
					return serialNumber === await decrypt(authorizationCode);
                }catch (e){
            		return false;
                }
            }
        },
        async created(){
            // 初始化国际化
            this.$i18n.locale = getLanguage();
            this.actionCount++;
            this.text = this.$t('loading.language');

            // 初始化配置信息
            const userSetting = await this.initSetting();
            this.actionCount++;
            this.text = this.$t('loading.userSetting');

            // 初始化限红配置
            const limitSetting = await this.initLimit();
            this.actionCount++;
            this.text = this.$t('loading.limitSetting');

			// 获取授权码
			const authorizationCode = await this.initAuth();
			// 获取序列号
			const serialNumber = await this.initSerialNumber();
            this.actionCount++;
            this.text = this.$t('loading.auth');

			// 检查是否正确
            const auth = await this.doAuth(serialNumber , authorizationCode);

            this.$emit('done' , {
                auth,
				serialNumber,
                userSetting,
                limitSetting
            })
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
    }
    .main{
        width:600px;
        height:400px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .progress{
        width: 100%;
        height: 16px;
        position: absolute;
        bottom: 10px;
    }

    .progress-text{
        height: 16px;
        position: absolute;
        bottom: 15px;
        width: 100%;
        text-align: center;
    }
</style>