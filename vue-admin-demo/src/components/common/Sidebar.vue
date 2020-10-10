<template>
<div class="sidebar">
    <!-- 折叠按钮 -->
    <div :class="['collapse-btn', collapse ? 'collapse-right' : 'collapse-left']" @click="collapseChage">
        <i :class="[
          'collapse-icon',
          collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
        ]" :style="{ right: collapse ? '2px' : '-21px' }"></i>
    </div>
    <div class="system">
        <div class="system-title">博客管理系统</div>
    </div>
    <el-menu style="background:#eaedf1" id="sidebar" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" :unique-opened="true" :default-openeds="openeds" @open="handleOpen" :router="true">
        <template v-for="item in routes">
            <template v-if="item.subs">
                <el-submenu :index="item.index" class="menu-sub" id="ddd" :key="item.index">
                    <template slot="title">
                        <!-- <i :class="item.icon"></i> -->
                        <span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.subs">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" class="menu-sub-child-list">
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index" class="menu-sub-child-list">
                                {{ threeItem.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else class="menu-sub-child" :index="subItem.index" :key="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else-if="item.title">
                <el-menu-item :index="item.index" class="menu-ul-li" :key="item.index">
                    <!-- <i :class="item.icon"></i> -->
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
                <!-- <el-menu-item :index="item.index" class="menu-ul-li" :key="item.index" v-show="!item.flag">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item> -->
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
import bus from '../common/bus'
export default {
    data() {
        return {
            collapse: false,
            openeds: [],

        }
    },
    methods: {
        handleOpen(obj) {
            console.log(obj)
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse
            if (this.collapse == true) {
                document.querySelector('.collapse-btn').style.right = '-21px'
                document.querySelector('.sidebar').style.marginLeft = '-180px'
                // document.querySelector('.content-box').style.width = (document.documentElement.clientWidth || document.body.clientWidth) + 'px';
            } else {
                document.querySelector('.sidebar').style.marginLeft = '0px'
                document.querySelector('.collapse-btn').style.right = '0px'
                // document.querySelector('.content-box').style.width = (document.documentElement.clientWidth || document.body.clientWidth) - 180 + 'px';
            }
            // alert(document.documentElement.clientHeight)
            setTimeout(() => {
                let v_height = document.querySelector('#header').offsetHeight
                document.querySelector('#sidebar').style.height =
                    (document.documentElement.clientHeight || document.body.clientHeight) -
                    v_height -
                    64 +
                    'px'
            }, 300)
            // bus.$emit('collapse', this.collapse) content-box;
        },
    },
    mounted() {
        // document.querySelector('#sidebar').style.height =
        //   (document.documentElement.clientHeight || document.body.clientHeight) -
        //   v_height -
        //   64 +
        //   'px'
        // document.querySelector('.collapse-btn').style.top =
        //   (document.documentElement.clientHeight || document.body.clientHeight) /
        //   2 -
        //   100 +
        //   'px'
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '')
        },
        routes() {
            return global.antRouter
        },
    },
    created() {
        // 默认当前的标签
        if (this.routes.length > 0) {
            this.routes.forEach(item => {
                if (this.$route.path == '/dashboard') {
                    this.openeds = []
                    this.openeds.push('0')
                } else {
                    if (item.path == this.$route.path) {
                        this.openeds = []
                        this.openeds.push(item.index)
                    }
                }
            })
        }
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg
        })
    },
}
</script>

<style>
.el-menu-item:focus,
.el-menu-item:hover {
    background: #fff !important;
    color: #333 !important;
}

.el-menu-item.is-active {
    background: #fff !important;
    color: #333 !important;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
    color: #333 !important;
    background: #fff !important;
}

.el-submenu__title i {
    color: #333 !important;
    /* font-weight: bold; */
}

.demonstration {
    font-weight: bold;
}

#sidebar .el-submenu__icon-arrow {
    right: auto;
    left: 15px;
    margin-top: -4px !important;
}

.el-menu--collapse {
    width: 0px !important;
    transition-duration: 0.2s;
}

.el-menu-item,
.el-submenu__title {
    height: 36px !important;
    line-height: 36px !important;
    /* color: #353535 !important; */
}

.el-menu .menu-ul-li,
.el-menu .menu-sub>div {
    padding: 0 0 0 30px !important;
    font-size: 12px !important;
    /* color: #353535 !important; */
}

.el-menu-item [class^="el-icon-"],
.el-submenu [class^="el-icon-"] {
    margin-right: 10px !important;
}

.el-menu .menu-sub .el-menu-item {
    height: 36px !important;
    line-height: 36px !important;
}

.el-menu .menu-sub-child-list>div {
    height: 36px !important;
    line-height: 36px !important;
}

.el-menu .menu-sub-child,
.el-menu .menu-sub-child-list>div {
    padding: 0 0 0 46px !important;
    font-size: 12px !important;
}

.el-menu {
    background: #eaedf1 !important;
}

.el-menu {
    border-right: 0px solid transparent !important;
}
</style><style scoped>
.system {
    background: #d9dee4;
    color: #000;
    font-size: 12px;
    font-weight: bold;
}

.system-title {
    line-height: 28px;
    padding: 18px 0;
    margin-left: 15px;
}

.collapse-btn {
    right: 0px;
    height: 40px;
    position: absolute;
    /* top: 50%; */
    /* margin-top: -50px; */
    cursor: pointer;
    z-index: 999;
    background: transparent;
}

.collapse-left {
    border-bottom: 10px solid transparent;
    border-right: 20px solid #fff;
    border-top: 10px solid transparent;
}

.collapse-left:hover {
    border-right: 25px solid #fff;
}

/* .collapse-right:hover {
  border-left: 20px solid #ccc;
} */
.collapse-right {
    border-bottom: 10px solid transparent;
    border-left: 25px solid #ccc;
    border-top: 10px solid transparent;
}

.collapse-icon {
    position: absolute;
    top: 10px;
    font-size: 20px;
}

.el-menu-item [class^="el-icon-"] {
    font-size: 18px;
}

.el-submenu [class^="el-icon-"] {
    font-size: 18px;
}

.el-menu-item * {
    display: inline-block;
}

.sidebar {
    display: block;
    background: #eaedf1;
    transition-duration: 0.2s;
    position: relative;
    width: 180px;
    /* overflow: hidden; */
    /* width: 270px; */
    /* box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3); */
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 180px;
}

.sidebar>ul {
    /* height: 100%; */
    overflow-y: auto;
}

.el-submenu__title {
    background: #f8f9fb;
}

.el-menu-item [class^="el-icon-"],
.el-submenu [class^="el-icon-"] {
    margin-right: 0px !important;
}

.el-submenu .el-menu-item {
    min-width: 160px !important;
}
</style>
