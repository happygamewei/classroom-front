<template>
  <div class="login_class">
    <a-form
        :model="formState"
        name="basic"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入账户!' }]"
      >
        <a-input size="large" v-model:value="formState.username" placeholder="请输入邮箱/手机号/账号" />
      </a-form-item>

      <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password size="large" v-model:value="formState.password" placeholder="请输入密码" />
      </a-form-item>

      <a-row>
        <a-col :span="5">
          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="13"></a-col>
        <a-col :span="6">
          <div style="margin-top: 0.5vh">忘记密码？</div>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button size="large" style="width: 25vw" type="primary" html-type="submit" @click="submitLogin">登录</a-button>
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
import {userInfo} from "../../store/index.js"
import {setRoles, setUserId} from "@/utils/user-utils.js";

const formState = reactive({
  username: '',
  password: '',
  code: 'login-front',
  uuid: '',
  remember: false,
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
const userInfoU = userInfo()
const submitLogin = () => {
  login(formState).then(res => {
    setToken(res.token, formState.remember)
    getInfo().then(res => {
      userInfoU.setUserInfo(res)
      setRoles(res?.roles)
      setUserId(res?.user.userId)
      ElMessage.success(res?.msg)
      router.push({name: 'HomePage'})
    })
  })
}
</script>
<style>
.login_class{
  width: 25vw;
  margin: 0 auto;
}
</style>
