<template>
  <div style="width: 80vw;height: 70vh; background-color: #F8F9FA">
    <div style="height: 10vh">
      <h2 style="float: left; margin-top: 3vh; margin-left: 3vw">基本信息</h2>
      <a-button style="float: right; margin-right: 3vw; margin-top: 3vh" type="primary" @click="handleEdit" v-if="isEdit">编辑</a-button>
      <a-button style="float: right; margin-right: 3vw; margin-top: 3vh" type="primary" v-if="!isEdit" @click="handleOk">保存</a-button>
      <a-button style="float: right; margin-right: 2vw; margin-top: 3vh" v-if="!isEdit" @click="handleCancel">取消</a-button>
    </div>

    <div>
      <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" :disabled="isEdit">
        <a-form-item label="课程名称" name="name">
          <a-input size="large" v-model:value="formState.name" placeholder="请输入课程名称" :bordered="!isEdit" />
        </a-form-item>
        <a-form-item label="教学班级" name="teachClass">
          <a-input size="large" v-model:value="formState.teachClass" placeholder="请输入教学班级" :bordered="!isEdit" />
        </a-form-item>
        <a-form-item label="学年 - 学期" name="schoolYear">
          <a-row>
            <a-col :span="5">
              <a-select size="large" v-model:value="formState.schoolYear" placeholder="请选择学年" :bordered="!isEdit" >
                <a-select-option :value="item.dictValue" v-for="item in schoolYearList" :key="item.dictCode">
                  {{item.dictValue}}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="5">
              <a-select size="large" v-model:value="formState.term" placeholder="请选择学期" :bordered="!isEdit">
                <a-select-option :value="item.dictValue" v-for="item in termList" :key="item.dictCode">
                  {{item.dictValue}}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item label="授课模式" :wrapper-col="{span: 4}">
          <a-select size="large" v-model:value="formState.teachMode" placeholder="请选择授课模式" :bordered="!isEdit">
            <a-select-option :value="item.dictValue" v-for="item in teachModeList" :key="item.dictCode">
              {{item.dictLabel}}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="学时数">
          <a-input size="large" v-model:value="formState.creditHours" placeholder="请输入学时数" :bordered="!isEdit" />
        </a-form-item>

<!--        <a-form-item :wrapper-col="{ span: 18 }" label="课程介绍">-->
<!--          <TMyEditor ref="wangEditorRef" :modelValue="content" @updateValue="updateValueI" />-->
<!--          <a-input size="large" v-model:value="formState.introduce" placeholder="请输入学时数" :bordered="false" />-->
<!--        </a-form-item>-->
        <a-form-item label="授课地点">
          <a-input size="large" v-model:value="formState.place" placeholder="请输入授课地点" :bordered="!isEdit" />
        </a-form-item>

      </a-form>
    </div>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted} from 'vue';
import {getDicts} from "@/api/dict.js";
import { editCourse, getOneCourse} from "../../api/course.js";
import {ElMessage} from "element-plus";
import TMyEditor from "@/components/TMyEditor.vue";

const props = defineProps({
  theCourseId: {
    type: String
  }
})

onMounted(() => {
  getDicts(classSchoolYear).then(res => {
    schoolYearList.value = res
  })
  getDicts(classTerm).then(res => {
    termList.value = res
  })
  getDicts(classTeachMode).then(res => {
    teachModeList.value = res
  })

  getOneCourse(props.theCourseId).then(res => {
    formState.courseId = res.courseId
    formState.name = res.name
    formState.teachClass = res.teachClass
    formState.schoolYear = res.schoolYear
    formState.term = res.term
    formState.teachMode = res.teachMode
    formState.creditHours = res.creditHours
    formState.introduce = res.introduce
    formState.place = res.place
  })
})

const classSchoolYear = 'class_school_year'
const classTerm = 'class_term'
const classTeachMode = 'class_teach_mode'

// 校验
const formRef = ref();
const rules = {
  name: [
    {
      required: true,
      message: '必填项',
      trigger: 'change',
    },
  ],
  teachClass: [
    {
      required: true,
      message: '必填项',
      trigger: 'change',
    },
  ],
  schoolYear: [
    {
      required: true,
      message: '必填项',
      trigger: 'change',
    },
  ],
};

// 学年和学期
const schoolYearList = ref([])
const termList = ref([])
const teachModeList = ref([])

// 编辑课程
const handleOk = e => {
  formRef.value
      .validate()
      .then(() => {
        isEdit.value = false;
        editCourse(formState).then((res) => {
          ElMessage.success(res)
          location.reload();
        })
      })
      .catch(error => {
        console.log('error', error);
      });
};

const formState = reactive({
  courseId: '',
  name: '',
  teachClass: '',
  schoolYear: '',
  term: '',
  teachMode: '',
  creditHours: '',
  introduce: '',
  place: ''
});
const labelCol = {
  span: 3,
};
const wrapperCol = {
  span: 19,
};

// 富文本
const content = ref("")
const updateValueI = (val) => {
  content.value = val
  formState.introduce = content.value
}

const isEdit = ref(true)

// 点击编辑按钮
const handleEdit = () => {
  isEdit.value = false
}
// 点击取消
const handleCancel = () => {
  isEdit.value = true
}
</script>
<style></style>
