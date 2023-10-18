<template>
  <div>
    <Header />
    <div class="all_content">
      <div class="all_card">
        <div style="height: 8vh;">
          <div class="top_class">置顶课程</div>
          <div class="create_class">
            <a-dropdown :trigger="['click']">
              <a-button type="primary" size="large" style="border-radius: 5px" @click.prevent v-if="!isStudent"><PlusOutlined />&nbsp; 创建/加入课程</a-button>
              <a-button type="primary" size="large" style="border-radius: 5px" @click.prevent="showJoinCourse" v-else><PlusOutlined />&nbsp; 加入课程</a-button>
              <template #overlay v-if="!isStudent">
                <a-menu style="width: 7vw; margin-left: 2vw">
                  <a-menu-item key="0">
                    <a @click="showModal">创建课程</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a @click="showJoinCourse">加入课程</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>

        <!--课程卡片-->
        <CourseCard v-if="courseList" :courses="courseList" :student="isStudent" />

      </div>

      <!--下面的我教的、我协助的、我学的-->
      <div class="course_type">
        <div style="height: 10vh">
          <div style="float: left">
            <a-menu
                v-model:selectedKeys="current"
                mode="horizontal"
                :items="items"
                :mode="state.mode"
                :theme="state.theme"
                style="font-size: 1rem;"
                @click="handleMenuClick"
            />
          </div>
<!--          <div style="float: right; margin-top: 1vh">-->
<!--            <a-space direction="vertical">-->
<!--              <a-input-search-->
<!--                  size="large"-->
<!--                  v-model:value="value"-->
<!--                  placeholder="搜索我要找的课程"-->
<!--                  style="width: 20vw"-->
<!--                  @search="onSearch"-->
<!--              />-->
<!--            </a-space>-->
<!--          </div>-->
        </div>
        <div>
          <TeachCourse :activeType="active" />
        </div>
      </div>
    </div>

    <!--创建课程-->
    <CreateCourse v-if="openAdd" :openCreate="openAdd" @updateOpenAdd="updateOpen" />

    <div>
      <a-modal v-model:open="openJoin" title="加入课程" @ok="handleOkJoin" @cancel="handleCancel" width="55vw" cancelText="取消" okText="确定">
        <a-input style="margin-top: 2vh; margin-bottom: 2vh" v-model:value="courseCode" size="large" placeholder="请输入课程加课码" />
      </a-modal>
    </div>

  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import Header from "../components/Header.vue";
import { useRouter } from 'vue-router';
import {onMounted} from "vue";
import {getAllCourse, joinCourse} from "../api/course.js";
import TeachCourse from "@/components/course/TeachCourse.vue";
import CourseCard from "@/components/course/CourseCard.vue";
import CreateCourse from "@/components/course/CreateCourse.vue";
import {ElMessage} from "element-plus";
import {getRoles, getUserId} from "@/utils/user-utils.js";
import {ADMIN, COMMON} from "@/config/setting.js";
import auth from '@/plugins/auth.js'

const courseList = ref()

const isStudent = ref(true)

onMounted(() => {
  console.log(auth.hasPermi("classroom:course:add"))
  const roles = getRoles()
  if(roles?.includes(ADMIN)){
    isStudent.value = false
  }else if (roles?.includes(COMMON)){
    isStudent.value = true
  }
  getCourseList()
})

const getCourseList = () => {
  const userId = getUserId()

  getAllCourse(userId).then((res) => {
    courseList.value = res
    console.log(courseList.value)
  })
}

const router = useRouter();

// 创建课程
const openAdd = ref(false);
const showModal = () => {
  openAdd.value = true;
};

// 下面的我教的，我协助的，我学的
const active = ref('1')
const state = reactive({
  mode: 'inline',
  theme: 'light',
});
const current = ref(['1']);
const items = ref([
  {
    key: '1',
    label: '我教的',
    title: '我教的',
  },
  {
    key: '2',
    label: '我协助的',
    title: '我协助的',
  },
  {
    key: '3',
    label: '我学的',
    title: '我学的',
  },
]);
// 处理菜单项点击事件
const handleMenuClick = (item) => {
  // 根据点击的菜单项的 key 来切换 active 的值
  active.value = item.key
};

// 搜索框
const value = ref('');
const onSearch = searchValue => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};

// 更新子组件创建课程openAdd
const updateOpen = (value) => {
  openAdd.value = value
}

// 展示加入课程
const courseCode = ref('')
const openJoin = ref(false)
const showJoinCourse = () => {
  openJoin.value = true
}
const handleOkJoin = () => {
  if(courseCode.value === ''){
    ElMessage.error("加课码没有填写")
  }else {
    joinCourse(courseCode.value).then(res => {
      if(res?.code === 200){
        ElMessage.success(res?.msg)
        openJoin.value = false
      }
      if(res?.code === 500){
        ElMessage.error(res?.msg)
      }

    })
  }
}

// 取消
const handleCancel = () => {
  courseCode.value = ''
}
</script>
<style>
.all_content{
  position: absolute;
  top: 12vh;
  left: 10vw;
}
.all_card{
  width: 80vw;
  height: auto;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  display: inline-block;
}
.card{
  width: 18vw;
  height: 33vh;
  margin-top: 5vh;
  margin-left: 1.5vw;
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
  border-radius: 3px;
  text-align: center;
  width: 1.8vw;
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
.other_info{
  display: inline-block;
  margin-left: 1vw;
  vertical-align: middle;
  cursor: pointer;
}

.more-info{
  margin-top: 2vh;
  padding-top: 2vh;
  margin-bottom: 2vh;
  padding-bottom: 2vh;
  background-color: #F8F9FA;
}
.course_type{

}
</style>
