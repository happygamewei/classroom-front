<template>
  <div class="login_class">
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="账户"
          name="username"
          :rules="[{ required: true, message: '请输入账户!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 16, span: 16 }">
        <a-button type="primary" html-type="submit" @click="submitLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import {onMounted, reactive} from 'vue';
import {getCodeImg, getInfo, login} from "@/api/login.js";
import {setToken} from "@/utils/token-utils.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const formState = reactive({
  username: '',
  password: '',
  code: 'login-front',
  uuid: '',
  remember: true,
});
const onFinish = values => {
};
const onFinishFailed = errorInfo => {
};

onMounted(() => {
  getCodeImg().then(res => {
    formState.uuid = res
  })
})

const router = useRouter();

//登录操作
const submitLogin = () => {
  login(formState).then(res => {
    setToken(res.token, formState.remember)
    getInfo().then(res => {
      console.log(res)
      ElMessage.success(res?.msg)
      router.push({name: 'HomePage'})
    })
  })
}
</script>
<style>
.login_class{
  width: 30vw;
  margin: 30vh auto;
}
</style>
