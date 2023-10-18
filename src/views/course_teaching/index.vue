<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" size="large">
      <a-tab-pane key="1" tab="目录">
        <Chapter />
      </a-tab-pane>
      <a-tab-pane key="2" tab="作业">
        <Homework />
      </a-tab-pane>
      <a-tab-pane key="3" tab="测试">
        <Test />
      </a-tab-pane>
      <a-tab-pane key="4" tab="资料">
        <Resource />
      </a-tab-pane>
      <a-tab-pane key="5" tab="公告">
        <Notice />
      </a-tab-pane>
      <a-tab-pane key="6" tab="话题">
        <Topic />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Chapter from "./chapter/Chapter.vue";
import Homework from "./homework/Homework.vue";
import Test from "./test/Test.vue";
import Resource from "./resource/Resource.vue";
import Notice from "./notice/Notice.vue";
import Topic from "./topic/Topic.vue";

defineProps(['theCourseId'])

const activeKey = ref('1');
</script>
<style>

</style>
