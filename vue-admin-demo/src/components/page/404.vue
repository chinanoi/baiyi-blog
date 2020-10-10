<template>
  <div class="page-body">
    <div class="page">

      <div class="body-title">
        <!-- 标题 -->
        <common-title></common-title>
      </div>

      <div class="search"
           ref="search">

      </div>

      <div class="container"
           ref="container">
        <div class="error-page">
          <div class="error-code">4<span>0</span>4</div>
          <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
          <div class="error-handle">
            <router-link to="/">
              <el-button size="large">返回首页</el-button>
            </router-link>
            <el-button class="error-btn"
                       size="large"
                       @click="goBack">返回上一页</el-button>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import common from '@/common/index.js'
import commonTitle from '@/components/common/CommonTitle.vue'
import vFooter from '@/components/common/Footer.vue'
export default {
  components: {
    commonTitle,
    vFooter
  },
  mounted () {
    common.getHeightData()
    common.handleFooter()
    window.onresize = () => {
      return (() => {
        common.handleFooter()
        setTimeout(() => {
          common.getHeightData()
        }, 500);
      })()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  color: #00a854;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  /* padding-bottom: 200px; */
}
.error-btn {
  margin-left: 100px;
}
</style>
