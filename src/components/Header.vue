<template>
  <div class="all_header">
    <div>
<!--      <a-breadcrumb separator=">">-->
<!--        <a-breadcrumb-item>Home</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item href="">Application Center</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item href="">Application List</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item>An Application</a-breadcrumb-item>-->
<!--      </a-breadcrumb>-->

      <img src="../assets/image/logo_blue.png" class="header_img">

      <a-breadcrumb separator=">" v-for="(item, index) in state.list" :key="index">
        <a-breadcrumb-item v-if="index < state.list.length-1">
            {{item.meta.title}}
        </a-breadcrumb-item>
        <a-breadcrumb-item @click="toThisPage(item)" v-else>
          {{item.meta.title}}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="login_btn" @click="toLogin">
      登录
    </div>
  </div>
</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import {onMounted, reactive, watch} from "vue";
import {userCourseId} from "@/store/index.js";

const router = useRouter();
const toLogin = () => {
  router.push({name: 'Login'})
}

const route = useRoute()
const state = reactive({
  list: []
})

onMounted(() => {
  let matched = route.matched  //获取菜单对应的路由信息
  state.list = matched
  console.log("--------", state.list)
})

watch(() => route.matched, (newVal, oldValue) => {
  let matched = newVal
  state.list = matched
  console.log("========", state.list)   //更新路由菜单数组
})

const toCourseId = userCourseId()

const toThisPage = (item) => {
  router.push({
    path: item.path,
    query: toCourseId.getCourseId()
  })
}


</script>
<style>
.all_header{
  position: fixed;
  background-color: white;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.login_btn{
  position: absolute;
  top: 30%;
  right: 3vw;
}
.header_img{
  float: left;
  width: 8vw;
  margin-top: 2.5vh;
  margin-left: 2vw;
}
</style>
