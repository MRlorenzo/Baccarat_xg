<template>
    <div>
        加载中。。。
    </div>
</template>

<script>
    import { setting , limit , auth } from "../../local-storage";
    import defaultSetting from '../../utils/setting.json';
    import defaultLimit from '../../utils/limit.json';
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
                }
                return limitSetting;
            },
            async initAuth(){
                return await auth.findOne();
            }
        },
        async created(){
            // 获取授权码
            const authorizationCode = await this.initAuth();
            // 初始化配置信息
            const userSetting = await this.initSetting();
            // 初始化限红配置
            const limitSetting = await this.initLimit();

            this.$emit('done' , {
                authorizationCode,
                userSetting,
                limitSetting
            })
        }
    }
</script>

<style scoped>

</style>