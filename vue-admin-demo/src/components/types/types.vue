<template>
<div class="page-body">
    <div class="page">
        <div class="body-title">
            <!-- 标题 -->
            <common-title></common-title>
            <!-- 工具栏 -->
            <div class="table-btn" ref="btn">
                <el-button-group>
                    <el-button class="text-color" icon="el-icon-circle-plus-outline" @click="add" type="primary" title="添加">添加</el-button>
                </el-button-group>
            </div>
        </div>
        <!-- 搜索 -->
        <div class="search" ref="search">
            <div class="crumbs">
                <div class="search-box">
                    <label class="label-width margin-top">分类名称：</label>
                    <el-input v-model="name" placeholder="分类名称：" class="search-input input-105 margin-right margin-top"></el-input>
                    <el-button class="margin-right confirm margin-top" @click="refresh" type="info">重置</el-button>
                    <el-button class="search-btn confirm margin-top" @click="search" type="primary">搜索</el-button>
                </div>
            </div>
        </div>

        <!-- 表格数据 -->
        <div class="container">
            <ctid-table :data="tableData" @handleSelectionChange="handleSelectionChange" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></ctid-table>
        </div>
        <!-- 添加弹框 -->
        <dialog-form @close="close" @dialogSave="dialogSave" operate="add" ref="addType" title="添加分类" :dialogData="dialogAddData" :dialogShow="dialogAdd"></dialog-form>
        <!-- 编辑弹框 -->
        <dialog-form @close="close" @dialogSave="dialogSave" operate="edit" ref="editType" title="修改分类" :dialogData="dialogEditData" :dialogShow="dialogEdit"></dialog-form>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import ctidTable from '@/components/common/Table.vue'
import common from '@/common/index.js'
import dialogForm from './sub-components/TypesDialog.vue'
import commonTitle from '@/components/common/CommonTitle.vue'
import vFooter from '@/components/common/Footer.vue'
import moment from 'moment'
export default {
    name: '',
    data() {
        return {
            // 操作按钮
            tableData: {
                total: 10, //总条数
                currentPages: 1, //当前页
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                operates: [{
                        id: 1,
                        showType: '-1',
                        label: '修改',
                        class: 'el-icon-edit-outline',
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        },
                    },
                    {
                        id: 3,
                        showType: '-3',
                        label: '删除',
                        class: 'el-icon-delete',
                        method: (index, row) => {
                            this.handleDel(index, row)
                        },
                    },
                ],
                columns: [{
                        prop: '',
                        label: '序号',
                        width: '50',
                        align: 'center',
                        type: 'index',
                    },
                    {
                        prop: 'id',
                        width: '',
                        label: '标签Id',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        prop: 'name',
                        width: '',
                        label: '标签名称',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        width: '200',
                        label: '操作',
                        align: 'center',
                        type: 'operate',
                    },
                ],
                list: [],
            },
            dialogAdd: false, //添加
            dialogEdit: false, //编辑
            dialogAddData: {},
            dialogEditData: {},
            name: '',
        }
    },
    //组件
    components: {
        ctidTable,
        dialogForm,
        commonTitle,
        vFooter,
    },
    //页面一进来就渲染
    mounted() {
        this.getData()
        common.handleFooter()
        window.onresize = () => {
            return (() => {
                common.handleFooter()
            })()
        }
    },
    //方法
    methods: {
        //分页，每页取几条
        handleSizeChange(val) {
            this.tableData.currentPages = 1
            this.tableData.pageSize = val
            this.getData()
        },
        // 分页，当前第几页
        handleCurrentChange(val) {
            this.tableData.currentPages = val;
            this.getData()
        },

        //关闭弹框
        close(obj) {
            this.dialogAdd = false
            this.dialogEdit = false
        },
        // 添加
        add() {
            this.dialogAdd = true
            // this.$refs.addType.refresh()
        },
        //编辑
        handleEdit(index, obj) {
            this.dialogEdit = true
            // this.$refs.editType.refresh()
            this.dialogEditData = JSON.parse(JSON.stringify(obj))
        },
        dialogSave(type, obj) {
            // console.log(this.tableData.list)
            let data = JSON.parse(JSON.stringify(obj))
            this.tableData.list.forEach((item, index) => {
                if (item.id == data.id) {
                    this.$set(this.tableData.list[index], 'name', data.name)
                }
            })
            // return false
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if (type === 'add') {
                this.$axios.post('/type/add', data, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        this.$message.success("添加成功")
                        this.getData()
                        loading.close()
                    })
                    .catch(err => {
                        loading.close()
                    })
            } else if (type == 'edit') {
                this.$axios.post('/type/edit', data, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        this.$message.success("修改成功")
                        this.getData()
                        loading.close()
                    })
                    .catch(err => {
                        loading.close()
                    })
            }
            this.close()
        },
        //搜索
        search() {
            this.getData()
        },
        // 重置
        refresh() {
            this.name = ''
            this.getData()
        },
        //渲染表格
        getData() {
            let data = {
                pageSize: this.tableData.pageSize,
                pageCurrent: this.tableData.currentPages,
                name: this.name
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$axios.post('/type/list', data, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    res = res.data.data
                    this.tableData.total = res.total
                    this.tableData.list = []
                    if (res.records.length > 0) {
                        res.records.forEach((item) => {
                            this.tableData.list.push({
                                id: item.id,
                                name: item.name,
                                flag: true,
                            })
                        })
                    }
                    loading.close()
                })
                .catch(err => {
                    loading.close()
                })
        },
        //删除
        handleDel(index, obj) {
            common
                .confirm(this, '确认删除嘛')
                .then((res) => {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$axios.get('/type/del?id=' + obj.id, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        .then(res => {
                            this.$message.success("删除成功")
                            if (this.tableData.total <= 11) {
                                this.tableData.currentPages = 1
                            }
                            this.getData()
                            loading.close()
                        })
                        .catch(err => {
                            loading.close()
                        })
                })
                .catch((err) => {})
        },
        //checkbox多选
        handleSelectionChange(obj) {
            console.log(obj)
        },
    },
}
</script>

<style scoped></style>
