<template>
  <div>
    <a-modal v-model:open="openAdd" title="创建课程" @ok="handleOk" @cancel="handleCancel" width="55vw" cancelText="取消" okText="确定">
      <hr />
      <div style="width: 100%; margin-bottom: 3vh">
        <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
          <a-form-item label="课程名称" name="name">
            <a-input size="large" v-model:value="formState.name" placeholder="请输入课程名称" show-count :maxlength="50" />
          </a-form-item>
          <a-form-item label="教学班级" name="teachClass">
            <a-input size="large" v-model:value="formState.teachClass" placeholder="请输入教学班级" show-count :maxlength="30" />
          </a-form-item>
          <a-form-item label="选择学年 - 学期" name="schoolYear">
            <a-row>
              <a-col :span="10">
                <a-select size="large" v-model:value="formState.schoolYear" placeholder="请选择学年" >
                  <a-select-option :value="item.dictValue" v-for="item in schoolYearList" :key="item.dictCode">
                    {{item.dictValue}}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :span="2"></a-col>
              <a-col :span="10">
                <a-select size="large" v-model:value="formState.term" placeholder="请选择学期">
                  <a-select-option :value="item.dictValue" v-for="item in termList" :key="item.dictCode">
                    {{item.dictValue}}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-form-item>

          <div style="color: #4096FF" @click="showMore">
            更多信息
            <DownOutlined />
          </div>

          <div v-if="show" class="more-info">
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="12">
                <a-form-item label="授课模式">
                  <a-radio-group v-model:value="formState.teachMode">
                    <a-radio value="1">线上</a-radio>
                    <a-radio value="2">线下</a-radio>
                    <a-radio value="3">混合</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="1"></a-col>
              <a-col :span="10" style="margin-left: -7vw">
                <a-form-item label="学时数">
                  <a-input size="large" v-model:value="formState.creditHours" placeholder="请输入学时数" />
                </a-form-item>
              </a-col>
            </a-row>

            <div style="margin-left: 4vw">课程介绍</div>
            <a-form-item :wrapper-col="{ span: 21, offset: 2 }">
              <TMyEditor ref="wangEditorRef" :modelValue="content" @updateValue="updateValueI" />
            </a-form-item>
            <a-form-item label="授课地点">
              <a-input size="large" v-model:value="formState.place" placeholder="请输入授课地点" />
            </a-form-item>
          </div>

        </a-form>
      </div>
      <hr />
    </a-modal>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted} from 'vue';
import {DownOutlined} from "@ant-design/icons-vue";
import {getDicts} from "@/api/dict.js";
import {addCourse} from "../../api/course.js";
import {ElMessage} from "element-plus";
import TMyEditor from "@/components/TMyEditor.vue";

const props = defineProps({
  openCreate: {
    type: [Boolean]
  }
})

const emit = defineEmits(["updateOpenAdd"]);

// 是否显示
const openAdd = ref(false);

openAdd.value = props.openCreate

onMounted(() => {
  getDicts(classSchoolYear).then(res => {
    schoolYearList.value = res
  })
  getDicts(classTerm).then(res => {
    termList.value = res
  })
})

const classSchoolYear = 'class_school_year'
const classTerm = 'class_term'

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
const showModal = () => {
  openAdd.value = true;

};

// 创建课程
const handleOk = e => {
  formRef.value
      .validate()
      .then(() => {
        openAdd.value = false;
        show.value = false;
        addCourse(formState).then((res) => {
          ElMessage.success(res)
          location.reload();
          emit("updateOpenAdd", openAdd.value)
        })
      })
      .catch(error => {
        console.log('error', error);
      });
};

const formState = reactive({
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
  span: 4,
};
const wrapperCol = {
  span: 19,
};

// 展示更多信息
const show = ref(false)
const showMore = () => {
  if(show.value === false){
    show.value = true
  }else if (show.value === true){
    show.value = false
  }
}

// 富文本
const content = ref("")
const updateValueI = (val) => {
  content.value = val
  formState.introduce = content.value
}

// 点击叉叉
const handleCancel = () => {
  openAdd.value = false
  emit("updateOpenAdd", openAdd.value)
}
</script>
