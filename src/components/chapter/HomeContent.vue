<template>
  <div>
    <a-card :bordered="true" class="content_card">
      <a-list item-layout="horizontal">
        <template v-for="item in homeworkList" :key="item?.homeworkId">
          <a-list-item>
            <a-list-item-meta
                description="作业列表我来瞅瞅，是伟大的神祇写的欸" >
              <template #title>
                <a href="#" style="font-size: 16px;">{{item ? item.title : ''}}</a>
              </template>
              <template #avatar>
                <a-avatar size="middle" src="src/assets/image/icon-homework.svg"></a-avatar>
                <p style="margin-left: 0.3vw;font-size: 0.5rem;">作业</p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>
<script setup>

const homeworkList = defineProps(['contentInfo'])

</script>
<style>
.content_card{
  width: 74vw;
  text-align: left;
  margin-left: -1.5vw;
}
</style>
