<template>
  <div>
    <div class="class_header"></div>
    <div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="目录">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="作业" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="测试">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane key="4" tab="资料">Content of Tab Pane 4</a-tab-pane>
        <a-tab-pane key="5" tab="公告">Content of Tab Pane 5</a-tab-pane>
        <a-tab-pane key="6" tab="话题">Content of Tab Pane 6</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
</script>
<style>
.class_header{
  width: 80vw;
  height: 30vh;
  border: 1px solid red;
  border-radius: 10px;
}
</style>
