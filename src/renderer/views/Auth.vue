<template>
    <div class="code-box">
        <el-container >
            <el-header></el-header>
            <el-main>
                <el-form>

                    <el-form-item label="序列号:">
                        <span>{{serialNumber}}</span>
                    </el-form-item>

                    <el-form-item label="授权码:">
                        <el-input type="textarea" v-model="code" :rows="10"></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    import { decrypt } from "../../utils/auth";

	export default {
        name: "login-page",
        props: {
			serialNumber: {
				type: String,
                required: true
            }
        },
        data(){
            return {
                code:''
            }
        },
        methods:{
            async check(){
            	try {
					const checkedCode = await decrypt(this.code);
					if (checkedCode === this.serialNumber){
						this.$emit('done' , this.code);
					}
                }catch (e){

                }
            }
        },
        watch:{
            'code':function(){
                this.check();
            }
        }
    }
</script>

<style scoped>
    .code-box{
        width: 600px;
        height: 400px;
    }

</style>