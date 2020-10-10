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
                    <label class="label-width margin-top">博客标题：</label>
                    <el-input v-model="title" placeholder="博客标题：" class="search-input input-105 margin-right margin-top"></el-input>
                    <label class="label-width margin-top">分类名称：</label>
                    <el-select v-model="type_id" class="search-input input-105 margin-right margin-top" filterable>
                        <el-option v-for="item in typeData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <label class="label-width margin-top">标题名称：</label>
                    <el-select v-model="tag_id" placeholder="请选择标题" class="search-input input-305 margin-right margin-top" multiple filterable>
                        <el-option v-for="item in tagData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
        <!-- <dialog-form @close="close" @dialogSave="dialogSave" operate="add" ref="addType" title="添加分类" :dialogData="dialogAddData" :dialogShow="dialogAdd"></dialog-form> -->
        <!-- 编辑弹框 -->
        <dialog-form @close="close" @dialogSave="dialogSave" operate="edit" ref="editType" title="修改分类" :dialogData="dialogEditData" :dialogShow="dialogEdit"></dialog-form>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import ctidTable from '@/components/common/Table.vue'
import common from '@/common/index.js'
import dialogForm from './sub-components/BlogsDialog.vue'
import commonTitle from '@/components/common/CommonTitle.vue'
import vFooter from '@/components/common/Footer.vue'

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
                        label: '博客Id',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        prop: 'title',
                        width: '',
                        label: '博客标题',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        prop: 'content',
                        width: '',
                        label: '博客内容',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        prop: 'typeName',
                        width: '',
                        label: '分类名称',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        prop: 'tagName',
                        width: '',
                        label: '标签名称',
                        align: 'center',
                        type: 'data',
                    },
                    {
                        prop: 'description',
                        width: '',
                        label: '备注',
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
            title: '',
            typeData: [],
            type_id: '',
            tagData: [],
            tag_id: []
        }
    },
    //组件
    components: {
        ctidTable,
        dialogForm,
        commonTitle,
        vFooter
    },
    //页面一进来就渲染
    mounted() {
        this.getType()
        this.getTag()
        // this.getData()
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
            // this.$router.push({
            //     name: "blogsAdd",
            //     params: {
            //         tagData: this.tagData,
            //         typeData: this.typeData
            //     }
            // })
            this.$router.push("/blogsAdd")
            // this.dialogAdd = true
            // this.$refs.addType.refresh()
        },
        //编辑
        handleEdit(index, obj) {
            this.$router.push({
                name: "blogsEdit",
                params: {
                    data: obj
                }
            })
        },
        dialogSave(type, obj) {
            // console.log(this.tableData.list)
            let data = JSON.parse(JSON.stringify(obj))
            this.tableData.list.forEach((item, index) => {
                if (item.id == data.id) {
                    this.$set(this.tableData.list[index], 'title', data.title)
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
                this.$axios.post('/blog/add', data, {
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
            this.title = ''
            this.tag_id = []
            this.type_id = ''
            this.getData()
        },
        // 根据typeid返回type名称
        getTypeName(obj) {
            let name = ''
            this.typeData.forEach((item, index) => {
                if (item.value == obj) {
                    name = item.label
                }
            })
            return name;
        },
        // 数组排序
        sort(obj) {
            obj.sort(function (a, b) {
                return parseInt(a) - parseInt(b); //降序排列，return a-b; —>升序排列
            })
        },
        // 根据typeid返回type名称
        getTagName(obj) {
            let name = ''
            let objData = obj.split(',')
            this.sort(objData)
            // console.log(objData)
            this.tagData.forEach((item, index) => {
                objData.forEach((list, num) => {
                    if (list == item.value) {
                        if (num == 0) {
                            name += item.label
                        } else {
                            name = name + ',' + item.label
                        }
                    }
                })
            })
            return name
        },
        // 获取分类数据
        getType() {
            let data = {
                pageSize: 20,
                pageCurrent: 1,
                name: ''
            }
            this.$axios.post('/type/list', data, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    res = res.data.data
                    this.typeData = [{
                        value: '',
                        label: '请选择分类'
                    }]
                    if (res.records.length > 0) {
                        res.records.forEach((item) => {
                            this.typeData.push({
                                value: item.id,
                                label: item.name,
                            })
                        })
                    }
                    this.getData();
                    // console.log('type', this.typeData)
                })
                .catch(err => {})
        },
        // 获取标签
        getTag() {
            let data = {
                pageSize: 20,
                pageCurrent: 1,
                name: ''
            }
            this.$axios.post('/tag/list', data, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    res = res.data.data
                    this.tagData = []
                    if (res.records.length > 0) {
                        res.records.forEach((item) => {
                            this.tagData.push({
                                value: item.id,
                                label: item.name,
                            })
                        })
                    }
                    // this.getData()
                    // console.log('tagData', this.tagData)
                })
                .catch(err => {})
        },
        //渲染表格
        getData() {
            let data = {
                pageSize: this.tableData.pageSize,
                pageCurrent: this.tableData.currentPages,
                title: this.title,
                type_id: this.type_id,
                user_id: '1',
                tag_ids: this.tag_id.join(",")
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let that = this
            this.$axios.post('/blog/list', data, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    res = res.data.data
                    this.tableData.total = res.total
                    // this.$set(this.tableData, 'list', [])
                    this.tableData.list = []
                    if (res.records.length > 0) {
                        res.records.forEach((item, index) => {
                            let type_n = this.getTypeName(item.typeId)
                            let tag_n = this.getTagName(item.tagIds)
                            let param = {
                                id: item.id,
                                title: item.title,
                                content: item.content,
                                views: item.views,
                                type_id: item.typeId,
                                typeName: type_n,
                                tagName: tag_n,
                                user_id: item.userId,
                                tag_ids: item.tagIds,
                                description: item.description,
                                flag: true,
                            }
                            this.tableData.list.push(param)
                            // this.$set(this.tableData.list, index, param)
                        })
                        // console.log('table', this.tableData)
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
                    this.$axios.get('/blog/del?id=' + obj.id, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        .then(res => {
                            this.$message.success(res.data.msg)
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

<style scoped>
.input-305 {
    width: 305px
}
</style>
