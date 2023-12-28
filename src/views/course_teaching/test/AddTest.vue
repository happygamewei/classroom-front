<template>
      <a-page-header
    style="border: 1px solid rgb(235, 237, 240); "
    title=" "
    sub-title=""
    @back="() => $router.go(-1)"
  >
    <template #extra>
        <div style="width: 100vh;margin-right: 15vh;">
          <b><a-steps :current="current" :items="items"></a-steps></b>
        </div>
        <div style="width: 40vh;">
          <el-button v-if="current > 0" type="primary" style="height: 5vh; width: 10vh;margin-left: 8px;" @click="prev">上一步</el-button>
          <el-button v-if="current < 2"  @click="next" type="primary" style="height: 5vh; width: 10vh;float: right;">下一步</el-button>
          <el-button v-if="current > 1"  @click="finish" style="height: 5vh; width: 10vh;float: right;">发布</el-button>
          <el-button v-if="current > 1" @click="success" type="primary" style="height: 5vh; width: 10vh;float: right;">保存</el-button>
          <a-modal v-model:open="open"  width="150vh" title="发布测试" @ok="handleOk">
            <hr style="border: 1px solid #ccc">
            <a-form ref="formRef" :model="testForm" style="width: 170vh;margin: auto; margin-top: 4vh;">
              <a-form-item
                label="测试标题"
                name="title"
                :rules="[{ required: true, message: '请输入测试标题!' }]"
              >
                <a-input style="display: inline-block; margin-right: 7vh; width: 131vh;
                height: 5vh;" v-model:value="testForm.title" placeholder="请输入内容，最多50字"  />
              </a-form-item>
              <a-form-item style="width: 142vh;">
                <div style="border: 1px solid #ccc">
                  <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                  />
                  <Editor
                    style="height: 20vh; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                  />
                </div>
              </a-form-item>
              <div>
                <b>
                  <a-form-item
                style="margin: 2vh 0vh 0vh 3vh;"
                  label="测试标签"
                  name="testLabel"
                  :rules="[{ required: true }]"
                >
                <a-radio-group  v-model:value="testForm.testLabel" style="display: inline-block; float: left; margin-left: 3vh;">
                  <a-radio :value="1">普通测试</a-radio>
                  <a-radio :value="2">考试</a-radio>
                </a-radio-group>
              </a-form-item>
                </b>
              </div>

              <div style="float: left; position: absolute; margin-left: 3vh;">
                <a-form-item
                  label="活动类型标签"
                  name="typeLabel">
                  <a-input style="width: 33vh;" v-model:value="testForm.typeLabel" show-count :maxlength="10" />
                  <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                <QuestionOutlined />
                </a-form-item>
              </div>
              <div style="margin: 0vh 0vh 0vh 70vh;float: right; position: absolute;">
                <a-form-item
                  label="知识共享协议"
                  name="shareProtocol"
                >
                  <a-tree-select
                    v-model:value="testForm.shareProtocol"
                    style="width: 33vh;"
                    :tree-data="treeData1"
                    placeholder="请选择" />
                    <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                    <QuestionOutlined />
                </a-form-item>
              </div>

              <div style="position: absolute; margin: 8vh 0vh 5vh 4vh;">
              <b>
                <a-form-item label="所属章节" name="chapterId">
                  <el-tree-select
                    v-model="testForm.chapterId"
                    style="width: 35vh;"
                    placeholder="请选择"
                    :data="treeData"
                    node-key="chapterId"
                    :render-after-expand="false"
                    :props="treeProps"
                  >
                  </el-tree-select>
                </a-form-item>
              </b>
            </div>

            <div style="position: absolute; margin: 8vh 0vh 5vh 70vh;">
              <b>
              <a-form-item
                label="应用环节"
                name="process">
                <a-tree-select
                    v-model:value="testForm.process"
                    style="width: 33vh;"
                    :tree-data="Process"
                    placeholder="请选择" />
              </a-form-item>
            </b>
            </div>


              <div style="display: inline-block;">
                <b>
                  <a-form-item
                    style="margin-top: 16vh;margin-left: 3vh;"
                      label="开始时间"
                      name="publish_date"
                      :rules="[{ required: false , message:'请输入开始时间!' }]"
                    >
                    <a-space direction="vertical" :size="12">
                      <!-- <a-date-picker v-model:value="publish_date" :format="dateFormat" style="width: 33vh;" /> -->
                      <a-date-picker
                        v-model:value="testForm.publishDate"
                        style="width:100%"
                        :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
                        format="YYYY-MM-DD HH:mm:ss"
                        :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                        :disabledDate="disabledDate"
                        :disabledDateTime="disabledDateTime"
                        placeholder="请选择时间"
                        @change="onChange"
                        @ok="onOk" />
                    </a-space>
                    </a-form-item>
                </b>
              </div>

              <div style="display: inline-block;">
                <b>
                  <a-form-item
                    style="margin-left: 23vh;"
                      label="截至时间"
                      name="deadline"
                    >
                    <a-space direction="vertical" :size="12">
                      <!-- <a-date-picker style="width: 33vh;" v-model:value="deadline" /> -->
                      <a-date-picker
                        v-model:value="testForm.deadline"
                        style="width:100%"
                        :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
                        format="YYYY-MM-DD HH:mm:ss"

                        :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                        :disabledDate="disabledDate"
                        :disabledDateTime="disabledDateTime"
                        placeholder="请选择时间"
                        @change="onChange"
                        @ok="onOk" />
                    </a-space>
                    </a-form-item>
                </b>
              </div>

              <div>
                <b>
                  <a-form-item
                style="margin: 2vh 0vh 0vh 3vh;"
                  label="限时答题"
                  name="testLabel"
                  :rules="[{ required: true }]"
                >
                <a-radio-group  v-model:value="testForm.testLabel" style="display: inline-block; float: left; margin-top: 0.5vh; margin-left: 3vh;">
                  <a-radio :value="1">限时</a-radio>
                  <a-radio :value="2">不限时</a-radio>
                </a-radio-group>
                <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                <QuestionOutlined />
              </a-form-item>
                </b>
              </div>


            </a-form>
          </a-modal>
        </div>
    </template>
</a-page-header>

<div v-if="current==0">
  <div class="steps-content" style=" display: inline-block; width: 180vh; height: 75vh;">
  <div>
    <a-radio-group v-model:value="value" style="margin:3vh 140vh 2vh 0vh;">
      <a-radio :value="1"><b>创建新测试</b></a-radio>
      <a-radio :value="2"><b>导入已有测试</b></a-radio>
    </a-radio-group>
  </div>
  <a-form ref="formRef" :model="testForm" style="width: 170vh;margin: auto;">
    <a-form-item
      label="测试标题"
      name="title"
      :rules="[{ required: true, message: '请输入测试标题!' }]"
    >
      <a-input style="display: inline-block; margin-right: 7vh; width: 150vh;
       height: 5vh;" v-model:value="testForm.title" placeholder="请输入内容，最多50字"  />
    </a-form-item>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 25vh; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div style="position: absolute; margin: 5vh 0vh 5vh 4vh;">
              <b>
                <a-form-item label="所属章节" name="chapterId">
                  <el-tree-select
                    v-model="testForm.chapterId"
                    style="width: 35vh;"
                    placeholder="请选择"
                    :data="treeData"
                    node-key="chapterId"
                    :render-after-expand="false"
                    :props="treeProps"
                  >
                  </el-tree-select>
                </a-form-item>
              </b>
            </div>
    <div style="position: absolute; margin: 5vh 0vh 0vh 53vh;">
      <b>
      <a-form-item
        label="活动类型标签"
        name="typeLabel">
        <a-input style="width: 33vh;" v-model:value="testForm.typeLabel" show-count :maxlength="10" />
        <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
      <QuestionOutlined />
      </a-form-item>
    </b>
    </div>
    <div style="position: absolute; margin: 5vh 0vh 0vh 113vh;">
      <b>
      <a-form-item
        label="知识共享协议"
        name="shareProtocol"
      >
        <a-tree-select
          v-model:value="testForm.shareProtocol"
          style="width: 40vh;"
          :tree-data="treeData1"
          placeholder="请选择" />
          <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
          <QuestionOutlined />
      </a-form-item>
    </b>
    </div>
  </a-form>
</div>
</div>

<div v-if="current==1">

  <a-card
    style="width: 40vh;height: 80vh;margin: 3vh 0vh 0vh 3vh;"
    :tab-list="tabList"
    :active-tab-key="Key"
    @tabChange="key => onTabChange(key, 'Key')"
  >
    <div v-if="Key === 'ViewExamPaper'"></div>
    <div v-else="Key === 'AddQuestion'">
        <div>
          <a-button style="width: 15vh;height: 5vh; float: left; margin-bottom: 2vh;">
            <div style="color: rgb(252, 85, 85); display: inline-block;">
              <CheckOutlined />
            </div>
            <b>&nbsp 判断题</b>
          </a-button>

        <a-button style="width: 15vh;height: 5vh; float: right;margin-bottom: 2vh;">
          <div style="color: rgb(25, 186, 135); display: inline-block;">
            <CheckCircleOutlined />
          </div>
          <b>&nbsp 单选题</b>
        </a-button>

        <a-button style="width: 15vh;height: 5vh; float: left;margin-bottom: 2vh;">
          <div style="color: rgb(104, 199, 63); display: inline-block;">
            <PlusSquareOutlined />
            </div>
          <b>&nbsp 多选题</b>
        </a-button>

        <a-button style="width: 15vh;height: 5vh;float: right;margin-bottom: 2vh;">
          <div style="color: rgb(252, 85, 85); display: inline-block;">
            <MenuUnfoldOutlined />
            </div>
          <b>&nbsp 不定项题</b>
        </a-button>

        <a-button style="width: 15vh;height: 5vh;float: left;margin-bottom: 2vh;">
          <div style="color: rgb(96, 187, 214); display: inline-block;">
            <CalculatorOutlined />
            </div>
          <b>&nbsp 填空题</b>
        </a-button>

        <a-button style="width: 15vh;height: 5vh;float: right;margin-bottom: 2vh;">
          <div style="color: rgb(196, 166, 75); display: inline-block;">
            <FileSearchOutlined />
            </div>
          <b>&nbsp 文件题</b>
        </a-button>

        <a-button style="width: 15vh;height: 5vh;float: left;margin-bottom: 2vh;">
          <div style="color: rgb(156, 77, 185); display: inline-block;">
            <ControlOutlined />
            </div>
          <b>&nbsp 简答题</b>
        </a-button>


        <a-button style="width: 33vh;height: 5vh;float: left;margin-bottom: 2vh;">
          <div style="color: rgba(78, 147, 221, 0.995); display: inline-block;">
            <UnorderedListOutlined />
            </div>
          <b>&nbsp 段落说明</b>
        </a-button>
      </div>

    </div>
  </a-card>

</div>
<div v-if="current==2">
  <div class="steps-content" style=" background-color: white; display: inline-block; width: 180vh; height: 75vh;">
    <div>
      <h3 style="float: left;position: absolute; margin: 3vh 0vh 0vh 3vh;"><b>试卷标签设置</b></h3>

      <a-form ref="formRef" :model="testForm">
        <a-form-item
        style="margin: 9vh 0vh 0vh 3vh;position: absolute;"
          label="试卷标签"
          name="testLabel"
        >
        <div style="display: inline-block;float: left; margin-top: 0.5vh;">
          <QuestionOutlined />
        </div>
        <a-radio-group  v-model:value="testForm.testLabel" style="display: inline-block; float: left; margin-left: 20vh;">
          <a-radio :value="1">普通测试</a-radio>
          <a-radio :value="2">考试</a-radio>
        </a-radio-group>
      </a-form-item>
      </a-form>
  </div>
  </div>
</div>

  </template>
  <script lang="ts" setup>
  import { ref,shallowRef,onBeforeUnmount,onMounted, reactive, createVNode } from 'vue';
  import { TreeSelectProps,Modal, message } from 'ant-design-vue';
  import { QuestionOutlined,CheckOutlined,CheckCircleOutlined,PlusSquareOutlined,
          UnorderedListOutlined,FileSearchOutlined,CalculatorOutlined,ControlOutlined,
          MenuUnfoldOutlined,ExclamationCircleOutlined} from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import {userCourseId} from "../../../store/index.js";
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { AddTest,getAllChapterById } from "../../../api/test"
  import axios from 'axios';
  import { h } from 'vue';
  import moment from 'moment'
  import { getUserId } from '../../../utils/user-utils';

  const toCourseId = userCourseId()
  const id = ref()
  const current = ref<number>(0);
  const value = ref<number>(1);
  const formRef=ref(null)
  const router = useRouter();
  const open = ref<boolean>(false);
  const treeData = ref([]);
  const userId = getUserId();
  const courseId = ref();
    const testForm = ref({
    title: '',
    chapterId:'',
    userId:userId,
    typeLabel:'测试',
    shareProtocol:'',
    testLabel:1,
    process:'',
    publishDate:'',
    deadline:'',
    course_id:courseId.value,
  })
// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p> </p>'
    }, 1500)
    id.value =  toCourseId.getCourseId()
    testForm.value.course_id = id.value
    courseId.value = toCourseId.getCourseId();
    console.log(courseId.value+"555")
    getAllChapterById(courseId.value).then((res) =>{
    treeData.value = res
})
})
    const treeProps = {
      label: "name",
    };

const onChange = (value,dateString) => {
  console.log('Selected Time: ', value)
  console.log('Formatted Selected Time: ', dateString)

}

const onOk = (value) =>{
  console.log('onOk: ', value)
}

const range = (start,end) =>{
  const result : any[] = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
}
const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf('day')
    }

const disabledDateTime = () => {
  return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56]
      };
    }


  const next = () => {
    if (!testForm.value.title) {
      alert("测试标题为空");
    } else {
      current.value++;
    }
  };
  const success = () => {
    AddTest(testForm.value)
    .then((response) => {
          // 处理成功响应
          console.log(response.data);
          testForm.value = {
            title: '',
            chapterId:'',
            userId:userId,
            typeLabel:'测试',
            shareProtocol:'',
            testLabel:1,
            process:'',
            publishDate:'',
            deadline:'',
            course_id:courseId.value,
          };
        })
  Modal.success({
    title: 'Success',
    content: h('div', {}, [
      h('p', '试卷已实时保存'),
    ]),
  });
  router.go(-1);
};

  const prev = () => {
    current.value--;
  };

  const finish = () =>{
    open.value = true;
  }
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
  Modal.confirm({
    title: '请确认是否发布该测试？',
    icon: createVNode(ExclamationCircleOutlined),
    // content: '测试开始时间为：'+ moment(testForm.value.deadline).format('YYYY-MM-DD HH:mm:ss') ,
    onOk() {
      AddTest(testForm.value)
      .then((response) => {
          // 处理成功响应
          console.log(response.data);
          testForm.value = {
            title: '',
            chapterId:'',
            userId:userId,
            typeLabel:'测试',
            shareProtocol:'',
            testLabel:1,
            process:'',
            publishDate:'',
            deadline:'',
            course_id:courseId.value,
          };
        })
        router.go(-1);
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));

    },
    onCancel() {},
  });
};

  const mode = "default"

  const Process = ref<TreeSelectProps['treeData']>([
  { id: 1, pId: 0, value: '1', title: '课前' },
  { id: 2, pId: 0, value: '2', title: '课中' },
  { id: 3, pId: 0, value: '3', title: '课后' },
  { id: 4, pId: 0, value: '4', title: '期中' },
  { id: 5, pId: 0, value: '5', title: '期末' },
]);


  const treeData1 = ref<TreeSelectProps['treeData']>([
  { id: 1, pId: 0, value: '1', title: '不使用' },
  { id: 2, pId: 0, value: '2', title: '署名（CC-BY）' },
  { id: 3, pId: 0, value: '3', title: '署名-相同方式共享（CC-BY-SA）' },
  { id: 4, pId: 0, value: '4', title: '署名-非商业（CC-BY-NC）' },
  { id: 5, pId: 0, value: '5', title: '署名-禁止演绎（CC-BY-ND）' },
  { id: 6, pId: 0, value: '6', title: '署名-非商业-禁止演绎（CC-BY-NC-ND）' },
  { id: 7, pId: 0, value: '7', title: '署名-非商业-相同方式共享（CC-BY-NC-SA）' },
]);


const tabList = [
{
    key: 'AddQuestion',
    tab: '添加试题',
  },
  {
    key: 'ViewExamPaper',
    tab: '试卷概览',
  },
]
const Key = ref('');
const key = ref();
const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === 'key') {
    key.value = value;
  } else if (type === 'Key') {
    Key.value = value;
  }
};

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')


const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

  const steps = [
    {
      title: '创建测试',
      content: 'First-content',
    },
    {
      title: '编辑试卷',
      content: 'Second-content',
    },
    {
      title: '设置测试',
      content: 'Last-content',
    },
  ];
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  </script>
  <style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;

  }

  .steps-action {
    margin-top: 24px;
  }

  [data-theme='dark'] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
  }



  </style>
