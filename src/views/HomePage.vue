<template>
  <div>
    <Header />
    <div class="all_card">
      <div style="height: 8vh;">
        <div class="top_class">置顶课程</div>
        <div class="create_class">
          <a-button type="primary" size="large" style="border-radius: 5px">+ 创建/加入课程</a-button>
        </div>
      </div>
      <div class="card" v-for="item in courseList" :key="item.courseId">
        <div class="card_up" @click="toClassDetail(item.courseId)">
          <span class="year_class">{{item.schoolYear}}</span>
          <span style="font-size: 13px;">{{ " " + item.term}}</span>
          <div class="card_name">{{item.name}}</div>
          <div class="card_classes">{{item.teachClass}}</div>

          <div style="margin-left: 2vw; margin-top: 2vh">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                加课码: {{item.code}}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="card_down">
          <div style="margin-left: 1vw; margin-top: 6vh; font-size: 14px">
            <div class="mode_class">教&nbsp;</div>
            <div style="display: inline-block">&nbsp;成员 {{item.joinNumber}} 人</div>
            <div style="display: inline-block; margin-left: 5vw">取消置顶</div>
          </div>
        </div>
      </div>
      <div class="card">
        <router-link to="/classDetail">课程</router-link>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import Header from "../components/Header.vue";
import { useRouter } from 'vue-router';
import {onMounted} from "vue";
import {getAllCourse} from "../api/course.js";

const courseList = ref()

onMounted(() => {
  getAllCourse().then((res) => {
    courseList.value = res
  })

})

const router = useRouter();

//跳转到课程详细页面
const toClassDetail = (courseId) => {
  router.push({
    name: 'ClassDetail',
    query: {courseId}
  });
}
</script>
<style>
.all_card{
  position: absolute;
  top: 12vh;
  left: 10vw;
  width: 80vw;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
}
.card{
  width: 18vw;
  height: 33vh;
  margin-top: 5vh;
  margin-left: 2vw;
  margin-bottom: 5vh;
  float: left;
  border-radius: 10px;
  text-align: left;
  vertical-align: top;
  border: 1px solid #ddd;
}
.card_up{
  height: 68%;
  background-image: url("../assets/image/13.png");
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  cursor: pointer; /* 将鼠标光标设为小手 */
}
.card_down{
  height: 32%;
}
.year_class{
  display:inline-block;
  margin-top: 2vh;
  margin-left: 2vw;
  font-size: 10px;
}
.card_name{
  margin-top: 1vh;
  margin-left: 2vw;
  font-size: 20px;
}
.card_classes{
  margin-left: 2vw;
  margin-top: 1vh;
  font-size: 15px;
}
.ant-dropdown-link{
  color: white;
}
.mode_class{
  display: inline-block;
  background-color: #4285F4;
  color: white;
  border-radius: 2px;
  text-align: center;
}
.top_class{
  float: left;
  margin-left: 2vw;
  margin-top: 2vh;
  font-size: 1.6rem;
}
.create_class{
  float: right;
  margin-top: 2vh;
  margin-right: 3vw;
}
</style>
