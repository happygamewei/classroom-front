<template>
  <div>
    <Header />
    <div class="class_setting">
      <a-tabs v-model:activeKey="activeKey" size="large">
        <a-tab-pane key="1" tab="基本信息（必填）">
          <EditCourse class="left-align-content" :theCourseId="courseId" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="报名设置">

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import Header from "@/components/Header.vue";
import EditCourse from "@/components/course/EditCourse.vue";

const route = useRoute()

const courseId = route.query.courseId

const activeKey = ref('1');
</script>
<style>
.class_setting{
  position: absolute;
  top: 12vh;
  left: 10vw;
}
.left-align-content .ant-form-item {
  text-align: left;
}
</style>
