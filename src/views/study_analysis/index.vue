<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="整体分析">
        <Whole />
      </a-tab-pane>
      <a-tab-pane key="2" tab="学生分析">
        <Students />
      </a-tab-pane>
      <a-tab-pane key="3" tab="章节分析">
        <Chapters />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Whole from "./whole/Whole.vue";
import Students from "./students/Students.vue";
import Chapters from "./chapters/Chapters.vue";

const activeKey = ref('1');
</script>
<style>

</style>
