<template>
<el-dialog :title="title" width="50%" :visible.sync="show" :before-close="close">
    <el-form :model="ruleForm" :rules="rules" :inline="false" ref="ruleForm" size="mini" label-width="25%" class="demo-ruleForm" label-position="right">
        <!-- <el-form-item label="用户昵称：" class="item-form" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户昵称：" class="input-width input-350" ></el-input>
        </el-form-item> -->
        <el-form-item label="内容：" class="item-form" prop="content">
            <el-input v-model="ruleForm.content" placeholder="请输入内容：" class="input-width input-350"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" class="item-form" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱：" class="input-width input-350"></el-input>
        </el-form-item>
        <el-form-item label="是否显示:" class="item-form" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择是否显示" class="input-width input-350">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
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
        var checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (!value) {
                return callback(new Error('邮箱不能为空'))
            }
            setTimeout(() => {
                if (mailReg.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的邮箱格式'))
                }
            }, 100)
        }
        return {
            show: false,
            ruleForm: {
                content: '',
                email: '',
                state: ''
            },
            options: [{
                value: 1,
                label: '显示'
            }, {
                value: 2,
                label: '不显示'
            }],
            rules: {
                content: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }],
                state: [{
                    required: true,
                    message: '请选择是否显示',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    validator: checkEmail,
                    trigger: 'blur'
                }],
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
        refresh() {
            this.$refs['ruleForm'].resetFields();
        },
        // 关闭
        close() {
            this.$emit('close', this.operate, false)
        },
        // 确定
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('dialogSave', this.operate, this.ruleForm)
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
