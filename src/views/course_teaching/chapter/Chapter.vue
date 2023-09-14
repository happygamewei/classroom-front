<template>
  <div class="chapter_all">
    <div class="chapter_up">
      <div class="all_chapter">共4个章节</div>
      <div class="all_active">8个活动</div>
      <a-divider class="divider" type="vertical" />
      <div class="credit">已分配学时 3/10 </div>
      <a-progress class="progress" :percent="30" size="small" />
      <div style="float: right;">
        <el-button type="primary" plain size="large">编辑排序</el-button>
        <el-button type="primary" size="large">+ 添加章节</el-button>
        <el-button type="success" size="large">+ 添加内容</el-button>
      </div>
    </div>
    <div class="chapter_down">
      <div class="chapter_number">第一章</div>
      <div class="active_number">8个活动</div>
      <a-tag color="#74787C" style="margin-left: 1vw">混合</a-tag>
      <a-tag color="blue">3学时</a-tag>
    </div>
    <div>
      <a-tree
          class="tree_plan"
          :tree-data="treeData"
      >
        <template #title="{ title, key }">
          <div v-if="key === '0-0'" style="font-size: 1.5rem;" >
            {{ title }}
          </div>

          <div v-else>{{ title }}</div>
          <div style="float: left">8个活动</div>
          <!--          <template>{{ title }}</template>-->
          <!--          <span>{{title}}</span>-->
        </template>
      </a-tree>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            key: '0-0-1-0',
            title: 'sss',
          },
        ],
      },
    ],
  },
];

</script>
<style>
.chapter_all{
  width: 80vw;
}
.chapter_up{
  height: 8vh;
}
.all_chapter{
  float: left;
  margin-top: 1vh;
}
.all_active{
  float: left;
  margin-left: 1vw;
  margin-top: 1vh;
}
.divider{
  border-color: gray;
  float: left;
  margin-top: 1.7vh;
}
.credit{
  float: left;
  margin-top: 1vh;
}
.progress{
  float: left;
  width: 10vw;
  margin-left: 1vw;
  margin-top: 1vh;
}

.chapter_down{
  margin-bottom: 5vh;
  height: 8vh;
  border-radius: 7px;
  display: flex;
  align-items: center;
  background-color: #EEEEEE;
}
.chapter_number{
  float: left;
  margin-left: 2vw;
  font-size: 1.1rem;
}
.active_number{
  float: left;
  margin-left: 1vw;
}

.tree_plan{
  padding-left: 1vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  width: 80vw;
  background-color: #EEEEEE;
}
</style>
