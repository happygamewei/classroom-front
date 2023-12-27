<template>
  <div class="Resource_all">
    <div class="Resource_top" style="width: 100%; height: 3vw">
      <div class="Resource_top-left">
          共{{num}}个活动
      </div>
      <div class="Resource_top-right">
<!--        <el-button type="success" size="large" @click="selectTest()">选择文件或者链接</el-button>-->
        <el-button type="success" @click="CreateResource()">创建资料</el-button>
        <el-button type="success"  size="large" @click="selectFileOrLink()" round style="width: 17vh; height: 5vh;"><PlusOutlined />&nbsp; 添加资料</el-button>
<!--        <el-button @click="addtest" style="width: 17vh; height: 5vh;" class="a" type="success" round><PlusOutlined />添加测试</el-button>-->
      </div>
    </div>

    <div class="link-top"></div>
    <div class="Resource_bottom" style="width: 100%" >
      <div class="Resource_bottom-top" style="height: 3vw">
        <div class="Resource_bottom-top-left" style="float: left">
          <span style="font-size: large">全部学习资料</span>
        </div>
        <div class="Resource_bottom-top-right" style="float: right;margin-right: 9vw">
<!--          <el-button type="success" size="large">排序</el-button>-->
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent style=" color: rgb(83, 133, 250); margin-top: 1vh;">
              <OrderedListOutlined />
              &nbsp 排序
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">按添加时间升序</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">按添加时间降序</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">按名称升序</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">按名称降序</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <el-button type="primary" plain size="large" style="width: 17vh; height: 5vh;"><CheckOutlined />批量操作</el-button>
        </div>
      </div>
    </div>
  </div>

  <!-- 选择资料文件  -->
  <div>
    <a-modal v-model:open="openSelect" title="选择资料文件" @ok="handleSelect" cancelText="取消" okText="确定" zIndex="1100">
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

  <!--添加资料-->
  <div>
    <a-modal v-model:open="openAdd" :title="modalTitle" @ok="handleAddResource" width="50vw" cancelText="取消" okText="确定" zIndex="1000">
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
<!--                <a-select placeholder="请选择" v-model:value="formState.chapterId" style="width: 15vw" @change="handleSelectChange(formState.chapterId)">-->
<!--                  <a-select-option :value="item.chapterId" v-for="item in chapterList" :key="item.chapterId">-->
<!--                    {{item.name}}-->
<!--                  </a-select-option>-->
<!--                </a-select>-->
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

    <!--  资料显示List  -->
    <div class="Resource_bottom" style="margin-top: 6vh; width: 100%;">
      <a-card :bordered="true" style="width: 80vw;text-align: left;">
        <a-list item-layout="horizontal">
          <template v-for="item in resourceList" :key="item.resourceId">
            <a-list-item>
              <a-list-item-meta
                  description=" " >
                <template #title>
                  <div  style="height: 12vh;width: 28vh;cursor: pointer;">
                    <a  style=" font-size: large;width: 10vh; margin: 2vh 0vh 0vh 0vh; float: left;color: black; font-family: 黑体">{{ item.title }}</a>
                    <div style="float: left; position: absolute; margin-top: 2vh" v-if="item.publishDate==null">
                      <p style="display: inline-block;">未发布</p>
                      <p style="display: inline-block" v-if="item.typeLabel=='外链' ">&nbsp|&nbsp 外链资源</p>
                      <p style="display: inline-block">&nbsp|&nbsp {{item.process}}</p>
                      <p style="display: inline-block; margin: 7vh 2vh 0vh 3vh;"></p>
                    </div>
                    <div style="float: left; position: absolute;" v-else>
                      <p style="display: inline-block;" v-if="isCurrentTimeAfterBackendTime(item.deadline)">已结束 &nbsp|&nbsp</p>
                      <p style="display: inline-block; margin: 7vh 2vh 0vh 0vh;">截至时间:
                      <p style="display: inline-block;" v-if="item.deadline==null"> &nbsp不限&nbsp</p>
                      <p style="display: inline-block;">{{ item.deadline }}</p>&nbsp|</p>
                      <p style="display: inline-block;">{{ item.process }}</p>
                    </div>
                  </div>
                  <div  style="margin-left: 75vh; margin-top: -15vh; width: 75vh; height: 15vh; display: inline-block; position: absolute;">
                    <div class="ant-dropdown-link" @click.prevent  style="float: right;margin-top: 1.25vh;cursor: pointer;">

                      <a-dropdown>
                        <a style="color: black;">
                          <div class="change" style="font-size: 3vh;">
                            <EllipsisOutlined />
                          </div>
                          更多</a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>
                              <a @click="editResource(item.resourceId)">编辑</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">移动到章节</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">保存试卷到备课区</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a href="javascript:;">分享</a>
                            </a-menu-item>
                            <a-menu-item>
                              <a @click="deleteResource(item.resourceId,'bottom')">删除</a>
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>

                    <div style="float: right; margin: 2vh 0vh 0vh 6vh;">
                      <a-divider type="vertical" style="height: 60px; background-color: rgb(215, 215, 215)" />
                      <a-divider type="vertical" style="height: 60px; border-color: rgb(215, 215, 215)" dashed />
                    </div>

                    <div style="float: right; margin: 3vh 0vh 0vh 6vh;cursor: pointer;" v-if="item.publishDate==null">
                      <div class="control-item">
                        <button type="button">
                          <span>
                            <i class="item-icon">
                              <SendOutlined />
                            </i>
                            <i class="item-text">
                              发布
                            </i>
                          </span>
                        </button>
                      </div>
<!--                      <div class="change" style="font-size: 3vh;">-->
<!--                        <SendOutlined />-->
<!--                      </div>-->
<!--                      <p>发布</p>-->
                    </div>
                  </div>
                </template>
                <template #avatar>
                  <a-avatar style="width: 8vh; height: 8vh ;" src="src/assets/image/icon-resource.png"></a-avatar>
                  <p style="margin-left: 2.5vh;font-size: 16px;">外链</p>
<!--                  <p style="margin-top: 1vh; width: 7vh;margin-left: 0.5vh; ">测试</p>-->
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </div>
<!--    <AddOrEditResource v-if="openSelect1" :openCreate="openSelect1" @updateOpenAdd="updateOpen"/>-->
  </div>

</template>
<script lang="ts" setup>
// import ResourceList from "/src/components/resource/resourceList.vue";
import {
  LinkOutlined,
  CheckOutlined,
  PlusOutlined,
  EllipsisOutlined,
  SendOutlined,
  UploadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import {userCourseId} from "../../../store/index.js";
import {onMounted, reactive, ref, createVNode} from "vue";
import {getDicts} from "../../../api/dict.js";
import {getChapterByCourse} from "../../../api/chapter.js";
import {addResourceInfo,getResourceList,deleteResourceById} from "../../../api/resource.js";
import {getInfo} from "../../../api/login.js"
import {ElMessage} from "element-plus";
import {Modal, notification, NotificationPlacement, CascaderProps} from "ant-design-vue";
import AddOrEditResource from "@/components/resource/AddOrEditResource.vue";

const toCourseId = userCourseId()
const id = ref()
const createBy = ref();
const currentDate = new Date();
const formattedTime = currentDate.toLocaleString(); //获取当前时间
const num = ref(0) //获取资料的数量
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
  })
  getResourceByCourseInfo(id.value)
  // console.log("当前时间"+formattedTime)
})



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

const selectedChapter = ref([]);

// const options: CascaderProps['chapterList'];


const treeProps = {
  label: "name",
};
// 添加资料
const checked = ref<boolean>(false);

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
  selectedFile.value = null;
  showTitleError.value = false;
  typeList.value = [];
  processList.value = [];
}
const handleTitleInput = () => {
  if (formState.title == ''){
    showTitleError.value = true
  }else showTitleError.value = false
}

const openAdd = ref(false);

const openSelect = ref(false);
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
    openSelect.value = false;
    openAdd.value = true;
  }
}
// 更换资料
const changeData = () => {
  openSelect.value = true;
}

//获取全部资料
const getResourceByCourseInfo = (courseId) => {
  getResourceList(courseId).then((res) => {
    resourceList.value = res
    console.log(res)
    num.value = res.length
  })
}
// 获取章节信息
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
const handleSelectChange = (chapterId) =>{
  console.log(chapterId)
  Object.keys(chapterList.value).forEach((item) => {
    if (chapterList.value[item].chapterId==chapterId)
      selectedChapter.value = chapterList.value[item]
  })
  console.log("点击的章节详情")
  console.log(selectedChapter.value)
  console.log(selectedChapter.value.children)
}

// 文件上传
const selectedFile = ref(null);
const fileContent = ref('');
const showTitleError = ref(false)

// const handleBeforeUpload = (file) =>{
//   selectedFile.value = file;
//   formState.title = selectedFile.value.name;
//   formState.typeLabel = "资料";
//   // 取消默认行为以避免自动上传
//   return false;
// };

// 添加外链素材
const openLink = ref<boolean>(false);
const showError = ref(false);
const inputUrl = ref('');

const showLink = () => {
  openLink.value = true;
};
const selectFileOrLink = () =>{
  openSelect.value = true
}

const closeinputUrlModal = () =>{
  inputUrl.value = '';
  openLink.value = false;
  showError.value = false;
}


const handleInput = () =>{
  if (/^(http|https):\/\/[^\s]+$/.test(inputUrl.value)) {
    showError.value = false;
  } else {
    showError.value = true;
  }
  console.log(showError.value)
}

const handleAddResource = () =>{
  formState.type = typeList.value.join('');
  formState.process = processList.value.join(',');
  openAdd.value = false;
  addResourceInfo(formState).then((res) =>{
    ElMessage.success(res)
    getResourceByCourseInfo(formState.courseId)
  })
}

//删除资料
const deleteResource = (id,placement: NotificationPlacement) =>{
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定删除此资料吗？',
    onOk() {
      deleteResourceById(id)
          .then((response) => {
            // 处理成功响应
            console.log("删除成功")
            console.log(response.data);
            getResourceByCourseInfo(formState.courseId)
          })
      notification.open({
        message: `Notification ${placement}`,
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement,
      });
      // location.reload();
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));

    },
    onCancel() {},
  });
}
// 编辑资料
const editResource = (reSourceId) =>{

}

//工具函数
  //判断时间
const isCurrentTimeAfterBackendTime = (deadline) =>{
  const date = new Date(formattedTime)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
// 拼接并格式化日期时间字符串
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  if (deadline!=null){
    const str1 = new Date(deadline).getTime();
    const str2 = new Date(formattedDateTime).getTime();
   if (str1-str2<0)
     return true
   else return false
  }
  else
    return false
}

//测试
const openSelect1 = ref(false);
// 更新子组件创建课程openAdd
const updateOpen = (value) => {
  openSelect1.value = value
}
const CreateResource = () => {
  openSelect1.value = true;
  console.log("openSelect1="+openSelect1.value)
};
</script>
<style>
.Resource_top .Resource_top-left{
  float: left;
}
.Resource_top .Resource_top-right{
  float: right;
  margin-right: 10%;
}
.link-top {
  width: 90%;
  height: 1vw;
  border-top: solid #ACC0D8 1px;
  margin-bottom: 1vw;
}
</style>
