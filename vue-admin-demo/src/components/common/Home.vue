<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="v-body">
      <v-sidebar></v-sidebar>
      <div class="content-box"
           :class="{ 'content-collapse': collapse }">
        <!-- <v-tags></v-tags> -->
        <div class="content">
          <transition name="move"
                      mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
        <!-- <v-footer></v-footer> -->
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import vTags from './Tags.vue'
import bus from './bus'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false,
    }
  },
  components: {
    vHead,
    vSidebar,
    vTags,
  },
  mounted () {
    let v_height = document.querySelector('#header').offsetHeight
    let v_foot = document.querySelector('#footer').offsetHeight
    document.querySelector('.content').style.height =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      v_height +
      'px'
    // window.onresize = () => {
    //   return (() => {
    //     document.querySelector('.content').style.height = (document.documentElement.clientHeight || document.body.clientHeight) - v_height + 'px';
    //   })()
    // }

    // setTimeout(() => {
    //   if (
    //     document.querySelector('.page-body').offsetHeight + v_foot + v_height <
    //     (document.documentElement.clientHeight || document.body.clientHeight)
    //   ) {
    //     document.querySelector('.footer').style.marginTop =
    //       (document.documentElement.clientHeight || document.body.clientHeight) -
    //       document.querySelector('.page-body').offsetHeight -
    //       v_foot -
    //       v_height +
    //       'px'
    //   } else {
    //     document.querySelector('.footer').style.marginTop = 0 + 'px'
    //   }
    // }, 700)
  },
  created () {
    bus.$on('collapse', (msg) => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', (msg) => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  },
}
</script>
<style scoped>
.v-body {
  display: flex;
}
</style>
