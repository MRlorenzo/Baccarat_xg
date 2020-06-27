<template>
  <el-dialog
          :show-close="false"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          title="串口设置"
          width="50%"
          top="50px"
          :center="true"
          :visible.sync="visible"
  >

    <!--表单-->
    <el-form :inline="false" label-width="100px">

      <el-form-item label="串口列表">
        <el-select v-model="comName" placeholder="请选择串口" style="width: 90%;float: left;">
          <el-option v-for="comName in comNames" :label="comName" :value="comName"></el-option>
        </el-select>
        <el-button class="el-icon-refresh" @click="refresh" style="float: right"></el-button>
      </el-form-item>

      <el-form-item label="波特率">
        <el-input v-model="comConfig.baudRate" :disabled="true" autocomplete="off"
                  suffix-icon="el-icon-edit"></el-input>
        <!--<el-select v-model="comConfig.baudRate" placeholder="请选择" style="width: 100%">
            <el-option label="1200" :value="1200"></el-option>
            <el-option label="2400" :value="2400"></el-option>
            <el-option label="4800" :value="4800"></el-option>
            <el-option label="9600" :value="9600"></el-option>
        </el-select>-->

      </el-form-item>

      <el-form-item label="数据位">
        <el-input v-model="comConfig.dataBits" :disabled="true" autocomplete="off"
                  suffix-icon="el-icon-edit"></el-input>
      </el-form-item>

      <el-form-item label="校验位">
        <el-input v-model="comConfig.parity" :disabled="true" autocomplete="off"
                  suffix-icon="el-icon-edit"></el-input>
        <!--<el-select v-model="comConfig.parity" placeholder="请选择" style="width: 100%">
            <el-option label="none" value="none"></el-option>
            <el-option label="odd" value="odd"></el-option>
            <el-option label="even" value="even"></el-option>
            <el-option label="mark" value="mark"></el-option>
            <el-option label="space" value="space"></el-option>
        </el-select>-->
      </el-form-item>

      <el-form-item label="停止位">
        <el-input v-model="comConfig.stopBits" :disabled="true" autocomplete="off"
                  suffix-icon="el-icon-edit"></el-input>
      </el-form-item>

    </el-form>

    <!--表单控制区-->
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">连接</el-button>
    </div>

  </el-dialog>
</template>

<script>
    import {getComNameList} from "../../port/utils";

    export default {
        name: "com-setting-page",
        data() {
            return {
                comNames: [],
                comName: null,
                comConfig: {
                    baudRate: 4800,
                    dataBits: null,
                    parity: 'none',
                    stopBits: null
                },
                visible: false
            }
        },
        methods: {
            open() {
                this.visible = true;
            },
            close() {
                this.visible = false;
            },
            /*连接*/
            async submit() {
                if (this.comName != null){
                    this.$emit('update' , this.comName)
                }else{
                    this.close();
                }
            },
            async refresh() {
                this.comNames = await getComNameList();
            }
        },
        created() {
            this.refresh().catch(e => {
                console.error(e);
            })
        }
    }
</script>

<style scoped>

</style>