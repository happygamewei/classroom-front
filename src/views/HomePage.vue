<template>
  <div>
    <Header />
    <div class="all_card">
      <div style="height: 8vh;">
        <div class="top_class">置顶课程</div>
        <div class="create_class">
          <a-dropdown :trigger="['click']">
            <a-button type="primary" size="large" style="border-radius: 5px" @click.prevent><PlusOutlined />&nbsp; 创建/加入课程</a-button>
            <template #overlay>
              <a-menu style="width: 7vw; margin-left: 2vw">
                <a-menu-item key="0">
                  <a @click="showModal">创建课程</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a href="">加入课程</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
            <a-tag class="mode_class" color="#108ee9">教</a-tag>
            <div style="display: inline-block">&nbsp;成员 {{item.joinNumber}} 人</div>
            <div style="display: inline-block; margin-left: 4vw">取消置顶</div>
            <div class="other_info">
              <a-dropdown :trigger="['click']">
                <EllipsisOutlined style="font-size: 1.3rem" />
                <template #overlay>
                  <a-menu style="width: 7vw; margin-left: -3vw">
                    <a-menu-item key="0">
                      <a>结课</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">删除</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="">编辑</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--创建课程-->
    <div>
      <a-modal v-model:open="openAdd" title="创建课程" @ok="handleOk" width="60vw">
        <div style="border: 1px solid #aaa; width: 100%;">
          <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="课程名称">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="教学班级">
              <a-input v-model:checked="formState.delivery" />
            </a-form-item>
            <a-form-item label="选择学年 - 学期">
              <a-row>
                <a-col :span="10">
                  <a-select v-model:value="formState.region" placeholder="请选择学年">
                    <a-select-option value="shanghai">Zone one</a-select-option>
                    <a-select-option value="beijing">Zone two</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="10">
                  <a-select v-model:value="formState.region" placeholder="请选择学期">
                    <a-select-option value="shanghai">Zone one</a-select-option>
                    <a-select-option value="beijing">Zone two</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-item>
            <a-row>
              <a-col :span="12">
                <a-form-item label="授课模式">
                  <a-radio-group v-model:value="formState.resource">
                    <a-radio value="1">线上</a-radio>
                    <a-radio value="2">线下</a-radio>
                    <a-radio value="3">混合</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="8" style="margin-left: -7vw">
                <a-form-item label="学时数">
                  <a-input v-model:checked="formState.delivery" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="课程介绍">
              <a-textarea v-model:value="formState.desc" />
            </a-form-item>
            <a-form-item label="授课模式">
              <a-input v-model:checked="formState.delivery" />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>

  </div>
</template>
<script setup>
import { ref, reactive, toRaw } from 'vue';
import {DownOutlined, EllipsisOutlined, PlusOutlined} from '@ant-design/icons-vue';
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

// 创建课程
const openAdd = ref(false);
const showModal = () => {
  openAdd.value = true;
};
const handleOk = e => {
  console.log(e);
  openAdd.value = false;
};

const formState = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};
const labelCol = {
  style: {
    width: '150px',
  },
};
const wrapperCol = {
  span: 14,
};
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
</style>
