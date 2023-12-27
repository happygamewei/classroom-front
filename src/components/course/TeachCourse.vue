<template>
  <div class="year_row" v-for="(value, key) in courseList" :key="key" >
    <div style="height: 8vh">
      <div class="year_term">{{ key }}</div>
      <div class="expand" @click="expandInfo(key)"><CaretDownOutlined /> 展开</div>
    </div>

    <div style="text-align: left" v-if="key === courseKey">
      <CourseCard v-if="value" :courses="value" style="display: inline-block; vertical-align: top;" />
    </div>
  </div>
  <div v-if="isEmptyCourseList">
    <img src="../../assets/image/img_empty.png" />
    <div style="margin-bottom: 5vh">暂无课程</div>
  </div>
</template>
<script setup>
import {onMounted, ref, watchEffect} from "vue";
import {getUserTCourse} from "@/api/course.js";
import {CaretDownOutlined} from '@ant-design/icons-vue';
import {getUserId} from "@/utils/user-utils.js";
import CourseCard from "@/components/course/CourseCard.vue";

const props = defineProps({
  activeType: {
    type: String
  }
})

const userId = ref('')

onMounted(() => {
  // const user = userInfoT.getUserInfo()
  userId.value = getUserId()
  getUserTeachCourse(userId.value)
})

const courseList = ref({});
const isEmptyCourseList = ref(false);

watchEffect(() => {
  if (Object.keys(courseList.value).length === 0) {
    isEmptyCourseList.value = true;
  } else {
    isEmptyCourseList.value = false;
  }
});

watchEffect(() => {
  getUserTCourse(userId.value, props.activeType).then((res) => {
    courseList.value = res;
  });
});

// 得到课程信息
const getUserTeachCourse = (userId) => {
  getUserTCourse(userId, props.activeType).then((res) => {
    courseList.value = res

  })
}

// 展开课程信息
const courseKey = ref(null)
const expandInfo = (value) => {
  if(courseKey.value === null){
    courseKey.value = value
  }else {
    courseKey.value = null
  }
}

</script>
<style>
.year_term{
  float: left;
  margin-left: 2vw;
  line-height: 8vh;
}
.expand{
  float: right;
  margin-right: 2vw;
  line-height: 8vh;
  color: #1677FF;
}
.year_row{
  width: 80vw;
  height: auto;
  background-color: #F8F9FA;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 3vh;
}
</style>
