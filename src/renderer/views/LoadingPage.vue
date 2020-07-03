<template>
    <div>
        加载中。。。
    </div>
</template>

<script>
    import { setting , limit , auth } from "../../local-storage";
    import defaultSetting from '../assest/def/setting.json';
    import defaultLimit from '../assest/def/limit.json';
    import { getLanguage } from "../../utils/lang";
    import { mac , md5 , decrypt} from "../../utils/auth";

	export default {
        name: "loading-page",
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
            // 初始化配置信息
            const userSetting = await this.initSetting();
            // 初始化限红配置
            const limitSetting = await this.initLimit();
			// 获取授权码
			const authorizationCode = await this.initAuth();
			// 获取序列号
			const serialNumber = await this.initSerialNumber();
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

</style>