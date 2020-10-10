<template>
<el-dialog :title="title" width="50%" :visible.sync="show" :before-close="close">
    <el-form :model="ruleForm" :rules="rules" :inline="false" ref="ruleForm" size="mini" label-width="25%" class="demo-ruleForm" label-position="right">
        <el-form-item label="标签名称:" class="item-form" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入标签名称" class="input-width input-350"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">确定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    props: {
        dialogShow: Boolean,
        title: String,
        operate: String,
        dialogData: Object
    },
    data() {
        return {
            show: false,
            ruleForm: {
                name: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入标签名称',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        this.show = this.dialogShow
    },
    //监听方法
    watch: {
        dialogShow(val) {
            this.show = val
            if (!val) {
                this.$refs['ruleForm'].resetFields();
            }
        },
        dialogData(val) {
            this.ruleForm = val
        }
    },
    methods: {
        // 关闭
        close() {
            this.$emit('close', this.operate, false)
        },
        // 确定
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('dialogSave', this.operate, this.ruleForm)
                    // this.$refs[formName].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
.item-form {
    width: 70%;
    margin-left: 15%;
}

.el-select {
    width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 100%;
}
</style>
