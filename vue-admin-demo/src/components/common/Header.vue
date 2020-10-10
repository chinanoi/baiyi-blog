<template>
<div class="header" id="header">
    <div class="logo" style="color:#000"><img src="../../assets/img/logo-index.png" />
    </div>
    <!-- <div class="logo-title">CTID易捷云管理平台</div> -->
    <div class="header-right">
        <div class="header-user-con">
            <!-- 全屏显示 -->
            <div class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <!-- 换肤 -->
            <!-- <div class="btn-fullscreen">
          <el-dropdown>
            <span class="el-dropdown-link"
                  style="color:#000">
              <i class="el-icon-info"
                 style="font-size:22px"
                 title="换肤"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item title="红色"><span style="display:block;width:20px;height:20px;background:#e61518"
                      @click="switchTheme('light_red')"></span></el-dropdown-item>
              <el-dropdown-item title="浅绿色"><span style="display:block;width:20px;height:20px;background:#07c4a8"
                      @click="switchTheme('light_green')"></span></el-dropdown-item>
              <el-dropdown-item title="蓝色"><span style="display:block;width:20px;height:20px;background:#0974cc"
                      @click="switchTheme('light_blue')"></span></el-dropdown-item>
              <el-dropdown-item title="橙色"><span style="display:block;width:20px;height:20px;background:#ee720c"
                      @click="switchTheme('light_orange')"></span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
            <!-- 消息中心 -->
            <!-- <div class="btn-bell"
             style="color:#000">
          <el-tooltip effect="dark"
                      :content="message?`有${message}条未读消息`:`消息中心`"
                      placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge"
                v-if="message"></span>
        </div> -->
            <!-- 用户头像 -->
            <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
            <!-- 用户名下拉菜单 -->
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link" style="color:#000">
                    {{username}} <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">

                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</div>
</template>

<script>
// import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: true,
            fullscreen: false,
            name: 'linxin',
            message: 2
        }
    },
    computed: {
        username() {
            let username = sessionStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('/admin/logout', {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        sessionStorage.removeItem('ms_username')
                        loading.close()
                        this.$router.push('/login');
                    })
                    .catch(err => {
                        loading.close()
                    })
            }
        },
        // // 侧边栏折叠
        // collapseChage () {
        //   this.collapse = !this.collapse;
        //   bus.$emit('collapse', this.collapse);
        // },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        //换肤
        switchTheme(theme) {
            sessionStorage.setItem('theme', theme)
            document.querySelector('link[name="index"]').setAttribute('href', './static/' + theme + '/index.css')
            document.querySelector('link[name="color"]').setAttribute('href', './static/' + theme + '/color.css')
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            // this.collapseChage();
        }
    }
}
</script>

<style scoped>
@import "../../assets/css/header.css";
</style>
