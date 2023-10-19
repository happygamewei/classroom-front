<template>
  <div class="login_back">
    <div class="all_login">
      <h2>账号登录</h2>
      <a-tabs v-model:activeKey="activeKey" centered size="large" :tabBarGutter=60>
        <a-tab-pane key="1" tab="账户登录">
          <UsernameLogin />
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机短信登录" force-render>
          <PhoneLogin />
        </a-tab-pane>
        <a-tab-pane key="3" tab="微信登录">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
      <div style="margin-left: 16vw">还没账号? <a>去注册</a></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import UsernameLogin from "@/views/loginVue/UsernameLogin.vue";
import PhoneLogin from "@/views/loginVue/PhoneLogin.vue";

const activeKey = ref('1');
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
.login_back{
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat; /* 不重复显示背景图像 */
  background-image: url("../assets/image/newbg.png");
  background-color: #eee;
  background-position: 10vw 15vh;
  position: relative;
}
.all_login{
  width: 30vw;
  height: 65vh;
  margin-top: 15vh;
  margin-left: 55vw;
  padding-top: 3vh;
  background-color: white;
  position: absolute;
}
</style>
