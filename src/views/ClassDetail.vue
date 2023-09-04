<template>
  <div style="margin-left: 10vw; margin-top: 12vh">
    <Header />
    <div class="class_header">
      <div class="header_up">
        <h1 class="course_name">计算机导论</h1>
        <h2 class="course_class">软件工程</h2>
        <div class="course_msg">
          <span> 加课码LDJWX7&nbsp;&nbsp; </span>
          <span> 已有2人加入&nbsp;&nbsp; </span>
          <span> 10 学时数&nbsp;&nbsp; </span>
        </div>
      </div>
      <div class="header_down">
        <a-menu
            v-model:selectedKeys="current"
            mode="horizontal"
            :items="items"
            :mode="state.mode"
            :theme="state.theme"
            style="font-size: 20px;"
            @click="handleMenuClick"
        />
      </div>
    </div>
    <div>
      <CourseTeaching v-if="active === 1" />
      <StudentAnalysis v-if="active === 2" />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import Header from "../components/Header.vue";
import CourseTeaching from './course_teaching/index.vue'
import StudentAnalysis from './study_analysis/index.vue'
import axios from "../utils/request.js";
import {onMounted} from "vue";

onMounted(() => {
  getInfo()
})

const active = ref(1)

const state = reactive({
  mode: 'inline',
  theme: 'light',
});
const current = ref(['1']);
const items = ref([
  {
    key: '1',
    label: '课程教学',
    title: '课程教学',
  },
  {
    key: '2',
    label: '学情分析',
    title: '学情分析',
  },
]);
// 处理菜单项点击事件
const handleMenuClick = (item) => {
  // 根据点击的菜单项的 key 来切换 active 的值
  active.value = parseInt(item.key);
};

// 得到数据
const courseInfo = ref(null)
const getInfo = () => {
  axios.get("/classroom/course/1").then((res) => {
    if(res.code === 200){
      courseInfo.value = res.data
      console.log(courseInfo.value)
    }
  })
}

</script>
<style>
.class_header{
  width: 80vw;
  height: 35vh;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.header_up{
  height: 25vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-image: url("../assets/image/13.png");
  background-size: cover; /* 背景图片随着盒子的变大而变大并保持比例 */
  background-repeat: no-repeat; /* 阻止背景图片重复 */
  background-position: center center; /* 水平和垂直居中对齐 */
}
.header_down{
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.course_name{
  color: white;
  position: absolute;
  top: 15vh;
  left: 13vw;
}
.course_class{
  color: white;
  position: absolute;
  top: 23vh;
  left: 13vw;
}
.course_msg{
  color: white;
  position: absolute;
  top: 31vh;
  left: 13vw;
}
</style>
