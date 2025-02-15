
<template>
  <div class="notice_all">
    <div class="notice_up">
      <div class="notice_num">共{{noticeNum}}个活动</div>
      <div style="float: right">

        <el-button type="success" round v-if="user.admin" @click="dialogFormVisible=true" >添加公告</el-button>
      </div>
    </div>
<!--    <NoticeDialog :msg="message"></NoticeDialog>-->

    <div class="dialog" style="width: 60vw;" onsubmit="return false" >

      <el-dialog v-model="dialogFormVisible" title="添加公告" width="60vw" class = "notice_dialog">
        <hr class="hr1">
        <el-form :model="form" class="form">

          <el-form-item label="公告标题" :hide-required-asterisk="false" required class="form_1">
            <el-input
                v-model="form.title"
                class = "w-30 m-5"
                maxlength="75"
                placeholder="Please input"
                show-word-limit
                type="text"
            />
          </el-form-item>
          <!--2. 富文本编辑-->
          <div style="border: 1px solid #ccc">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 100px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
          </div>
          <!--     3.   -->
          <div>
            <div style="margin-top: 10px">
              <el-row :gutter="5">
                <span>活动类型标签</span>
                <el-input
                    style="width:15vw;margin-left: 20px"
                    class="w-30 m-5"
                    v-model="form.typeLabel"
                    maxlength="10"
                    show-word-limit
                    type="text"
                />
                <div style="margin-left: 40px">
                  <span>知识共享协议</span>
                  <el-select v-model="form.shareProtocol" class="m-2" placeholder="Select" style="width:15px;margin-left: 20px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </div>
              </el-row>
            </div>
            <div style="margin-top: 10px">
              <el-row :gutter="5">
                <span>应用环节</span>
                <el-select v-model="form.process" class="m-2" placeholder="请选择" style="margin-left: 20px">
                  <el-option
                      v-for="item in processOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"

                  />
                </el-select>
                <div style="margin-left: 40px">
                  <span>所属章节</span>
<!--                  <el-select v-model="form.chapterId" class="m-2" placeholder="请选择" style="width:15px;margin-left: 20px">-->
<!--                    <el-option-->
<!--                        v-for="item in "-->
<!--                        :key="item.value"-->
<!--                        :label="item.label"-->
<!--                        :value="item.value"-->
<!--                    />-->
<!--                  </el-select>-->
                </div>
              </el-row>
            </div>
            <div>
              <el-switch v-model="isPublish"/>
              是否立即发布
            </div>
              <div class="block" v-if="isPublish ? false : true ">
                <el-date-picker
                    v-model="publishTime"
                    type="datetime"
                    placeholder="选择时间"
                />
              </div>

          </div>


        </el-form>

        <template #footer>
      <span class="dialog-footer">
        <hr style="width: 60vw;margin-left: -20px;">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm()">
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>
    </div>
    <div class="announce-box">
      <a-card>
      <!--全部公告-->
      <a-list id="viewer-container-lists" style="list-style: none;display:inline">
<!--        <li v-for="(item,index) in noticeList" v-bind:key="item.id">-->
        <template style="list-style: none;display:inline" v-for="(item,index) in noticeList" :key="item?.noticeId">
          <div class="announce-cont-box" style="padding-top: 1vh">

            <div class="ant-dropdown-link" @click.prevent  style="float: right;margin-top: 1.25vh;cursor: pointer;" v-if="user.admin" >

              <a-dropdown>
                <a style="color: black;">
                  <div class="change" style="font-size: 3vh;">
                    <EllipsisOutlined />
                  </div>
                  更多</a>

                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a @click="Edit(item.noticeId)">编辑</a>
                    </a-menu-item>
                    <a-menu-item>

                      <div>
                        <a type="primary" @click="showModal">删除</a>
                        <a-modal v-model:open="open" title="提示" @ok="confirmEvent(item.noticeId)">
                          <p>确认删除本条公告吗？</p>
                        </a-modal>
                      </div>
<!--                      <el-popconfirm title="确定删除?"-->
<!--                                     @confirm="confirmEvent(item.noticeId)"-->
<!--                                     @cancel="cancelEvent">-->
<!--                        <template #reference>-->
<!--                          <a>删除</a>-->
<!--&lt;!&ndash;                          <el-button  class="delbutton" v-if="user.admin"></el-button>&ndash;&gt;-->
<!--                        </template>-->

<!--                      </el-popconfirm>-->

                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div style="margin-left: -60%">
            <div class="notice_pic" style="height: 14vh;width: 4vw;display: inline-block">
              <img src="https://www.ketangpai.com/images/ic_bulletin.svg" style="width: 3vw;height: 3vw">
              公告
            </div>

            <div class="notice_content" style="text-align: left;margin-left: 7vh;display: inline-block;margin-top: -10vh">
              <div class="title clearfix">

              </div>
              <h2><a @click="JumpToNoticeDetail(item.noticeId)">{{item.title}} </a></h2>
              <div class="notice_msg" style="font-size: 1.7vh">
                <span>发布时间：{{item.createTime}}</span>
                <a>
                  <span>&nbsp;评论<b>{{ totalCommentListNum[index] }}</b></span>
                </a>
              </div>
            </div>
            </div>
          </div>

          <hr style="margin-left: 6vh;margin-right: 3vh;margin-top:-2vh; border:0.1px solid #ececec  ">
        </template>
      </a-list>
      </a-card>
    </div>

  </div>

</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {EllipsisOutlined } from '@ant-design/icons-vue';
import {reactive, onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {useRouter} from "vue-router";
import {userCourseId} from "../../../store";

import {addNotice, deleteNotice, getAllNotice, getOneNotice, update} from "../../../api/notice.js"
import {getCommentListTotal} from "../../../api/comment.js"
import {ElMessage} from "element-plus";
// import NoticeDialog from "./NoticeDialog.vue";
import {

  Delete,

} from '@element-plus/icons-vue'
import {getInfo} from "../../../api/login.js";

const toCourseId = userCourseId()
const dialogFormVisible = ref(false);

const noticeList = ref(null)
const id = ref()
const user = ref({
  admin:''
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const publishTime = ref();
// 内容 HTML
const valueHtml = ref()
onMounted(() => {
  getInfo().then(res => {
    user.value = res.user
    console.log("user",user.value)
  })
  id.value = toCourseId.getCourseId()
  console.log(id.value)
  getNoticeAll()

})
const noticeNum = ref()
const totalCommentListNum= ref([])
const getNoticeAll=()=>{
  getAllNotice().then((res)=>{
    noticeList.value=res
    noticeNum.value = noticeList.value.length
    console.log("res:",res)
    console.log("how many:",noticeList.value)
    console.log("noticelist:",noticeList.value.length)

    for (let i = 0; i < noticeList.value.length; i++) {
      let promises = [];
      for (let i = 0; i < noticeList.value.length; i++) {
        let promise = getCommentListCount(noticeList.value[i].noticeId).then(count => {
          console.log("评论数量：", count);
          return count;
        }).catch(error => {
          console.error("获取评论数量失败：", error);
          return 0;
        });
        promises.push(promise);
      }
      Promise.all(promises).then(results => {
        console.log("所有评论数量：", results);
        totalCommentListNum.value = results;
        console.log("adsdsds",totalCommentListNum.value)
      }).catch(error => {
        console.error("获取所有评论数量失败：", error);
      });
    }

  })
}

const commentNum = ref()

function getCommentListCount(id){
  return new Promise((resolve, reject) => {
    getCommentListTotal(id).then(res => {
      console.log("commentcount:", res);
      commentNum.value = res;
      resolve(commentNum.value);
    }).catch(error => {
      reject(error);
    });
  });
}
//删除逻辑
const deleteNoticeClick = (e) =>{
  deleteNotice(e).then(res =>{
    console.log(res)
      getNoticeAll()
    ElMessage({
      message:'删除成功！',
      type:'success'
    })

  })

}
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};

const confirmEvent = (e) => {
  open.value = false;
  deleteNoticeClick(e)
}

//跳转到公共详情页面
const router = useRouter();
const JumpToNoticeDetail = (e) => {
  console.log(";lkigfyxzdsdxfyuioipo")
  console.log("e：",e)
  router.push({
    name: 'NoticeDetail',
   query:{
      noticeid:e
   }
  })
}
let form = reactive({
  noticeId:'',
  title: '',
  content: '',
  typeLabel: '',
  shareProtocol: '',
  process: '',
  chapterId: '',
  publishDate:'',
})
const clearForm=()=>{
form.noticeId='';
form.title='';
// form.shareProtocol='';
form.process='';
form.typeLabel='';
form.content='';
form.chapterId='';
form.publishDate='';

}

const submitForm=(e)=>{
  if(form.noticeId==''){
    addSubmint();
  }else {
    editSubmit();
  }

}
//新建确认按钮
const addSubmint = ()=>{
  form.publishDate = publishTime.value;
  dialogFormVisible.value=false;
  form.content=valueHtml.value;

  addNotice(form).then((res)=>{
    ElMessage.success("发布成功！")
    getNoticeAll()
    // getInfo()
  })
}
const Edit =(e)=>{
  getOneNotice(e).then((res)=>{
    console.log("edit:",res)
    form.noticeId = res.noticeId
    form.title = res.title
    form.content = res.content
    form.publishDate = res.publishDate
    form.shareProtocol= res.shareProtocol
    form.process = res.process
    form.typeLabel = res.typeLabel
    form.chapterId = res.chapterId
    dialogFormVisible.value =true;

  })
}
const editSubmit=()=>{
  dialogFormVisible.value=false;
  form.content=valueHtml.value;
  console.log("aaaa",form)
   update(form).then((res)=>{
    ElMessage.success("修改成功")
    getNoticeAll()
  })
}

const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
//下拉框
const value = ref('')
const options = [
  {
    value: '不使用',
    label: '不使用',
  },
  {
    value: '使用',
    label: '使用',
  }
]

const processOptions = [
  {
    value:'课前',
    label:'课前'
  },
  {
    value:'课中',
    label:'课中'
  },
  {
    value:'课后',
    label:'课后'
  }
  ,{
    value:'期中',
    label:'期中'
  }
  ,{
    value:'期末',
    label:'期末'
  }

]
const isPublish = ref(true)






</script>
<style>

.notice_all {
  width: 80vw;
}

.notice_up {
  height: 8vh;
}

.notice_num {
  float: left;
  margin-top: 1vh;
}

/*.announce-box {*/
/*  !*padding-bottom: 40px;*!*/
/*  !*height: 30vh;*!*/
/*}*/

/*.announce-box #viewer-container-lists {*/
/*  width: 100%;*/
/*  !*height: 15vh;*!*/
/*  border: 1px solid #dadce0;*/
/*  border-radius: 5px;*/
/*  position: relative;*/
/*}*/
/*.delbutton{*/
/*  position: absolute;*/
/*  right: 32px;*/
/*  !*top:30px*!*/
/*}*/


.m-2 {
  width: 20vw;
}

.w-30 m-5 {
  width: 20vw;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.hr1 {
  position: absolute;
  left: 0px;
  top: 44px;
  width: 60vw;
}

.notice_dialog {
  border-radius: 10px;
  text-align: left
}

</style>
