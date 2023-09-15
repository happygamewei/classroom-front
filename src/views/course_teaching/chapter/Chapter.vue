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
        <el-button type="primary" size="large" @click="showModal">+ 添加章节</el-button>
        <el-button type="success" size="large">+ 添加内容</el-button>
      </div>
    </div>
    <div>
      <a-tree
          class="tree_plan"
          :tree-data="treeData"
      >
        <template #title="{ name, parentId, teachMode, creditHours }">
          <div class="tree_class">
            <div class="expand_tree">
              <div v-if="parentId === 0" style="font-size: 1.2rem;" >
                {{ name }}
              </div>
              <div v-else>{{ name }}</div>

              <div style="margin-left: 1vw">8个活动</div>
              <a-tag color="#74787C" style="margin-left: 1vw" v-if="teachMode === '3'">混合</a-tag>
              <a-tag color="#74787C" style="margin-left: 1vw" v-if="teachMode === '2'">线下</a-tag>
              <a-tag color="#74787C" style="margin-left: 1vw" v-if="teachMode === '1'">线上</a-tag>
              <a-tag color="blue">{{creditHours}}学时</a-tag>
            </div>

            <div style="margin-left: 50vw; display: flex; align-items: center;">
              <div v-if="parentId === 0">
                <div>
                  <PlusOutlined />
                </div>
                <div style="margin-top: -0.5vh">
                  添加小节
                </div>
              </div>
              <div style="margin-left: 2.5vw;" >
                <div>
                  <EllipsisOutlined style="font-size: 1.3rem" />
                </div>
                <div style="margin-top: -1vh">
                  更多
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-tree>
    </div>

    <!--添加章节-->
    <div>
      <a-modal v-model:open="openAdd" title="创建课程" @ok="handleOk" width="50vw" cancelText="取消" okText="确定">
        <div style="margin-top: 3vh">
          <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="章节名称" :rules="[{ required: true, message: '请输入章节名称' }]">
              <a-input size="large" style="width: 30vw" placeholder="请输入章节名称" v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="授课模式">
              <a-radio-group v-model:value="formState.resource">
                <a-radio value="1">线上</a-radio>
                <a-radio value="2">线下</a-radio>
                <a-radio value="3">混合</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="学时数">
              <a-input size="large" style="width: 30vw" placeholder="请输入学时，不填写默认为不设置" v-model:checked="formState.delivery" />
            </a-form-item>
            <div class="illustration">
              说明：新建章节将出现在已建章节的下方，按建立顺序排序
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref, toRaw, watch} from 'vue';
import {getChapterByCourse} from "../../../api/chapter.js";
import {userCourseId} from "../../../store/index.js";
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons-vue';

const toCourseId = userCourseId()

const chapterList = ref(null)

const treeData = ref([])

onMounted(() => {
  const id =  toCourseId.getCourseId()
  getChapterByCourseInfo(id)
})

// 获取章节信息
const getChapterByCourseInfo = (courseId) => {
  getChapterByCourse(courseId).then((res) => {
    chapterList.value = res
    treeData.value = res
    console.log(chapterList.value)
  })
}

// 创建章节
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

.tree_plan{
  padding-left: 1vw;
  width: 80vw;
  background-color: #EEEEEE;
}

.tree_plan .ant-tree-treenode-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: 0;
}

.tree_plan .ant-tree-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: auto;
  height: auto;
  margin: 0;
}
.tree_class{
  display: flex;
  align-items: center;
  height: 7vh;
}
.tree_class:hover,
.tree_class.active {
  background-color: #EEEEEE !important; /* 修改鼠标悬停和点击时的背景颜色 */
}
.expand_tree{
  display: flex;
  align-items: center;
  margin-left: 0.5vw;
}


.illustration{
  margin-left: 5.5vw;
  margin-bottom: 3vh;
  color: #888888;
}
</style>
