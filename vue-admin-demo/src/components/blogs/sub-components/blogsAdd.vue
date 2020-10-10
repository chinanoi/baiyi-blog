<template>
<div class="page-body">
    <div class="page">
        <div class="body-title">
            <!-- 标题 -->
            <common-title></common-title>
            <!-- 工具栏 -->
            <div class="table-btn" ref="btn">
                <!-- <el-button-group>
                    <el-button class="text-color" icon="el-icon-circle-plus-outline" @click="add" type="primary" title="添加">添加</el-button>
                </el-button-group> -->
            </div>
        </div>
        <!-- 搜索 -->
        <div class="search" ref="search">
            <div class="crumbs">
                <div class="search-box">
                    <label class="label-width margin-top">博客标题：</label>
                    <el-input v-model="title" placeholder="博客标题：" class="search-input input-505 margin-right margin-top"></el-input>
                    <label class="label-width margin-top">标签名称：</label>
                    <el-select v-model="tag_id" placeholder="请选择标题" class="search-input input-305 margin-right margin-top" multiple filterable>
                        <el-option v-for="item in tagData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <label class="label-width margin-top">分类名称：</label>
                    <el-select v-model="type_id" class="search-input input-105 margin-right margin-top" filterable>
                        <el-option v-for="item in typeData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button class="margin-right confirm margin-top" type="info">保存草稿</el-button>
                    <el-button class="search-btn confirm margin-top" @click="submit" type="primary">发布文章</el-button>
                </div>
            </div>
             <div class="bolg-description">
                  <label class="label-width margin-top">博客简介：</label>
                  <el-input v-model="description" placeholder="博客简介：" style="flex:1" class=" margin-right margin-top"></el-input>
            </div>
        </div>
        <!-- 表格数据 -->
        <div class="container">
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" />
        </div>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
import commonTitle from '@/components/common/CommonTitle.vue'
import vFooter from '@/components/common/Footer.vue'
import common from '@/common/index.js'
import {
    mavonEditor
} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'blogsAdd',
    data() {
        return {
            content: '',
            html: '',
            configs: {},
            typeData: [],
            type_id: '',
            tagData: [],
            tag_id: [],
            title: '',
            description:''
        }
    },
    //页面一进来就渲染
    mounted() {
        this.getTag()
        this.getType()
        common.handleFooter()
        window.onresize = () => {
            return (() => {
                common.handleFooter()
            })()
        }
    },
    components: {
        mavonEditor,
        commonTitle,
        vFooter,
    },
    methods: {
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
                })
                .catch(err => {})
        },
        // 将图片上传到服务器，返回地址替换到md中
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.$axios({
                url: '/blog/imageUpload',
                method: 'post',
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.getItem("token")
                },
            }).then((res) => {
                console.log(res.data.data.url)
                this.$refs.md.$img2Url(pos, res.data.data.url);
            })
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        submit() {
            if(this.title==''){
                this.$message.error('博客标题不能为空');
                return
            }
            if(this.description==''){
                this.$message.error('博客简介不能为空');
                return
            }
            if(this.content==''){
                this.$message.error('博客内容不能为空');
                return
            }
            if(this.type_id==''){
                this.$message.error('博客分类不能为空');
                return
            }
            if(this.tag_id==''){
                this.$message.error('博客标签不能为空');
                return
            }
            let data = {
                title: this.title,
                content: this.content,
                type_id: this.type_id,
                user_id: '1',
                tag_ids: this.tag_id.sort().join(","),
                description:this.description
            }
            this.$axios.post("/blog/add", data, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                .then((res) => {
                    this.$message.success(res.data.msg)
                    this.$router.push("/blogs")
                })
            // this.$message.success('提交成功！');
        }
    }
}
</script>

<style scoped>
.input-305 {
    width: 305px
}

.input-505 {
    width: 505px
}

.editor-btn {
    margin-top: 20px;
}
.bolg-description{
    display: flex;
    align-items: center
}
.label-width{}
</style>
