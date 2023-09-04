<template>
  <div>
    <div class="class_header">
      <div class="header_up">

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
import CourseTeaching from './course_teaching/index.vue'
import StudentAnalysis from './study_analysis/index.vue'

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

</script>
<style>
.class_header{
  width: 80vw;
  height: 35vh;
  border: 1px solid red;
  border-radius: 10px;
}
.header_up{
  height: 23vh;
}
.header_down{
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
