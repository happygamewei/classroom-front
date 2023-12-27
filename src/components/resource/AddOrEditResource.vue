<template>
  <!-- 选择资料文件  -->
  <div>
    <a-modal v-model:open="openSelect1" title="选择资料文件" @ok="handleSelect" @cancel="cancelSelect" cancelText="取消" okText="确定" zIndex="1100">
      <p>请选择要上传的文件或外链素材</p>
      <a-space>
        <a-upload :action="uploadUrl" :before-upload="beforeUpload" :on-success="onSuccess">
          <a-button style="color: #1677FF"><upload-outlined></upload-outlined>本地上传文件</a-button>
        </a-upload>
        <a-button style="color: #1677FF" @click="showLink()"><LinkOutlined />添加外链素材</a-button>
        <a-modal v-model:open="openLink" title="添加外链素材" zIndex="1200">
          <a-input v-model:value="inputUrl" @input="handleInput"></a-input>
          <p v-if="showError" style="color: red;">请输入正确的网址链接,如：https://www.cqnu.edu.cn/</p>
          <template #footer>
            <a-button @click="closeinputUrlModal">取消</a-button>
            <a-button type="primary" :disabled="showError" @click="addResource">确定</a-button>
          </template>
        </a-modal>
      </a-space>
    </a-modal>
  </div>
  <a-modal v-model:open="openAdd" :title="modalTitle" @ok="handleAddResource" @cancel="cancelAddResource" width="50vw" cancelText="取消" okText="确定" zIndex="1000">
    <div style="margin-top: 3vh">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="资料标题" :rules="[{ required: true, message: '请输入资料标题' }]">
          <a-input size="large" style="width: 100%" placeholder="请输入资料标题" v-model:value="formState.title"  @blur="handleTitleInput" />
          <p v-if="showTitleError" style="color: red; height: 1vw">title is required</p>
        </a-form-item>
        <a-row>
          <div class="upload-container" style="border: 1px solid #ddd; width: 100%; height: 5%; margin-bottom: 2vh" v-if="formState.typeLabel=='外链'&&formState.path!='' ">
            <div class="left" style="margin: 0.8vh; display: inline-block;"><img src="src/assets/image/icon-resource-link.jpg"></div>
            <div class="right" style="display: inline-block; ">
              <h3 style="margin: 1vh">{{formState.path}}</h3>
            </div>
            <span style="margin-left: 52%" @click="changeData">更换资料</span>
          </div>

        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="活动类型标签">
              <a-input  placeholder="请输入名称" v-model:value="formState.typeLabel" style="width: 15vw"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="知识共享协议">
              <a-select placeholder="请选择" v-model:value="formState.shareProtocol" style="width: 15vw">
                <a-select-option :value="item.dictLabel" v-for="item in classShareProtocoList" :key="item.dictCode">
                  {{item.dictLabel}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="应用环节">
              <a-select placeholder="请选择" v-model:value="processList" style="width: 15vw" mode="multiple">
                <a-select-option :value="item.dictLabel" v-for="item in classProcessList" :key="item.dictCode">
                  {{item.dictLabel}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所属章节">
              <el-tree-select
                  v-model="formState.chapterId"
                  :props="treeProps"
                  :data="chapterList"
                  check-strictly
                  :render-after-expand="false"
                  node-key="chapterId"
                  @node-click="handleNodeClick"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="类型">
          <a-select placeholder="请选择" v-model:value="typeList" style="width: 15vw" mode="multiple">
            <a-select-option :value="item.dictCode" v-for="item in classTypeList" :key="item.dictCode">
              {{item.dictLabel}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item  label="是否立即发布">
          <a-switch v-model:checked="checked" />
        </a-form-item>
      </a-form>
      <a-form-item  label="发布时间" :rules="[{ required: true, message: '请选择日期' }]" v-if="checked == true">
        <a-date-picker
            v-model:value="formState.publishDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item  label="截止时间" :rules="[{ message: '请选择日期' }]" v-if="checked == true">
        <a-date-picker
            v-model:value="formState.deadline"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <div v-if="checked == true">
        总分:
        <a-input-number id="inputNumber" v-model:value="formState.totalScore" :min="0" :max="100"  />
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {
  LinkOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import {ref, reactive, onMounted} from 'vue';
import {getDicts} from "@/api/dict.js";
import {getChapterByCourse} from "@/api/chapter.js";
import {addResourceInfo} from "@/api/resource.js";
import {ElMessage} from "element-plus";
import { message } from 'ant-design-vue';
import {userCourseId} from "@/store/index.js";
import {getInfo} from "@/api/login.js";
const props = defineProps({
  openCreate: {
    type: [Boolean]
  }
})

const emit = defineEmits(["updateOpenAdd"]);
const toCourseId = userCourseId()
const id = ref()
const createBy = ref();
const userId = ref(0)
// 是否显示
const openSelect1 = ref(false);
const openAdd = ref(false);

openSelect1.value = props.openCreate

const classShareProtoco = 'class_share_protoco'
const classProcess = 'class_process'
const classType = 'class_type'

const classShareProtocoList = ref(null);
const classProcessList = ref(null);
const classTypeList = ref(null);
const chapterList = ref(null);
const modalTitle = ref('添加资料')
// const selectedOption = ref(null);
const resourceList = ref(null);

//应用环节的数组
const processList = ref([]);
const typeList = ref([]);

const formState = reactive({
  courseId:'',
  title: '',
  path:'',
  typeLabel:'',
  shareProtocol: '',
  process: '',
  chapterId:'',
  type: '',
  publishDate:'',
  deadline:'',
  totalScore:0,
  createBy: '',
  userId:0,
});

const clearFrom = () => {
  formState.title = '';
  formState.path = '';
  formState.typeLabel = '';
  formState.shareProtocol='';
  formState.process = '';
  formState.chapterId = '';
  formState.type = '';
  formState.publishDate = '';
  formState.deadline = '';
  formState.totalScore = 0;
  // selectedFile.value = null;
  showTitleError.value = false;
  typeList.value = [];
  processList.value = [];
}

//显示title是否填写
const showTitleError = ref(false)

// 是否发布
const checked = ref(false);
onMounted(()=>{
  id.value =  toCourseId.getCourseId();
  formState.courseId = id.value
  getDicts(classShareProtoco).then(res =>{
    classShareProtocoList.value = res;
  })
  getDicts(classProcess).then(res =>{
    classProcessList.value = res;
  })
  getDicts(classType).then(res =>{
    classTypeList.value = res;
  })
  getInfo().then(res =>{
    createBy.value = res.user.createBy
    userId.value = res.user.userId
  })
})

const handleSelect = () =>{
  message.error('请选择资料文件')
  openSelect1.value = false
  emit("updateOpenAdd", openSelect1.value)
}
const cancelSelect = () => {
  openSelect1.value = false
  emit("updateOpenAdd", openSelect1.value)
}

// 添加外链素材
const openLink = ref(false);
const showError = ref(false);
const inputUrl = ref('');

const showLink = () => {
  openLink.value = true;
};
// const selectFileOrLink = () =>{
//   openSelect1.value = true
// }

const closeinputUrlModal = () =>{
  inputUrl.value = '';
  openLink.value = false;
  showError.value = false;
}

//判断link是否满足条件
const handleInput = () =>{
  if (/^(http|https):\/\/[^\s]+$/.test(inputUrl.value)) {
    showError.value = false;
  } else {
    showError.value = true;
  }
  console.log(showError.value)
}

//章节获取
const getChapterByCourseInfo = (courseId) => {
  getChapterByCourse(courseId).then((res) => {
    chapterList.value = res
    console.log("章节信息")
    console.log(chapterList.value)
  })
}
// 选择章节
const handleNodeClick = (data) => {
  formState.chapterId = data.chapterId;
};
const treeProps = {
  label: "name",
};

const addResource = () => {
  if (inputUrl.value==''){
    showError.value = true;
  }else{
    clearFrom()
    modalTitle.value = '添加资料'
    //获取章节信息
    getChapterByCourseInfo(id.value);
    formState.createBy = createBy.value;
    formState.path = inputUrl.value;
    formState.typeLabel = "外链"
    openLink.value = false;
    showError.value = false;
    inputUrl.value = '';
    openSelect1.value = false;
    openAdd.value = true;
  }
}
// 更换资料
const changeData = () => {
  openSelect1.value = true;
}
// 判断title是否填写
const handleTitleInput = () => {
  if (formState.title == ''){
    showTitleError.value = true
  }else showTitleError.value = false
}

//确认添加资料
const handleAddResource = () =>{
  formState.type = typeList.value.join('');
  formState.process = processList.value.join(',');
  openAdd.value = false;
  addResourceInfo(formState).then((res) =>{
    ElMessage.success(res)
    location.reload();
    emit("updateOpenAdd", openSelect1.value)
  })
}
//取消添加资料
const cancelAddResource = () => {
  clearFrom()
  openSelect1.value = false
  emit("updateOpenAdd", openSelect1.value)
}
</script>

<style scoped>

</style>