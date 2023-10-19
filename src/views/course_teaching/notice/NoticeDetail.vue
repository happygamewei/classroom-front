<template>
  <div>
    <div id="view-discuss" class="notice-detail">
      <div class="notice-box">
        <!--  公告-->
        <div class="announce-box">
          <div class="announce-box-cont">
            <span class="announce-box-cont-span">公告</span>
          </div>
          <!--          编辑的三个点下拉框-->
          <!--         <div class="el-dropdown">-->
          <!--           <span class="el-dropdown-link common_pointer el-dropdown-selfdefine" aria-haspopup="list" aria-controls="dropdown=menu-4878" role="button" tabindex="0">-->
          <!--             <i class="font_family icon-more_outline">-->
          <!--               </i>-->
          <!--           </span>-->
          <!--         </div>-->
          <h1 style="margin-top: -13px">
            <span class="el-tag el-tag--small">
              置顶
            </span>
            <span class="title">
              通知
            </span>
          </h1>
          <div class="detail flex-align flex-between">
            <div class="left flex-align">
              <img
                  src="https://ts1.cn.mm.bing.net/th/id/R-C.66d7b796377883a92aad65b283ef1f84?rik=sQ%2fKoYAcr%2bOwsw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140305%2f1-140305131415.jpg&ehk=Hxl%2fQ9pbEiuuybrGWTEPJOhvrFK9C3vyCcWicooXfNE%3d&risl=&pid=ImgRaw&r=0">
              <b class="font-color font14">{{ user }}</b>
              <span class="font12">创建于{{ noticeDetail.createTime }}</span>
            </div>
            <div class="right flex-align font-color--main">
              <div class="item flex-align">
                <img src="https://www.ketangpai.com/images/zhanshiciyun.svg" alt style="margin-right: 8px;">
                <span class="font14 common_pointer">展示词云</span>
              </div>
            </div>
          </div>
          <div class="content font14 font-color">
            <div>
              <p>
                <strong v-html="noticeDetail.content"></strong>
              </p>
            </div>
          </div>
<!--          <div class="content-foot flex-align  mgt16">-->
<!--            <div class="left flex-align font12">-->
<!--              <span class="flex-align">-->
<!--                已读-->
<!--                <cite class="font-color&#45;&#45;main mgl-8">2xx</cite>-->
<!--              </span>-->
<!--              <span class="flex-align">-->
<!--                未读-->
<!--                <cite class="font-color&#45;&#45;main mgl-8">1xx</cite>-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <!--  评论-->
        <div class="comment-box">
          <section class="comment-container">
            <div class="comment-main flex-align">
              <div class="left">
                <img
                    src="https://ts1.cn.mm.bing.net/th/id/R-C.66d7b796377883a92aad65b283ef1f84?rik=sQ%2fKoYAcr%2bOwsw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140305%2f1-140305131415.jpg&ehk=Hxl%2fQ9pbEiuuybrGWTEPJOhvrFK9C3vyCcWicooXfNE%3d&risl=&pid=ImgRaw&r=0">
              </div>
              <div class="right">
                <div class="el-textarea el-input--medium">
        <textarea
            autocomplete="off"
            rows="2"
            placeholder="说点什么吧"
            class="el-textarea__inner"
            style="min-height: 31px"
            v-model="commentform.content">

        </textarea>
                </div>
              </div>
            </div>
            <div class="comment-tools flex-align font-color font14">
              <label class="el-checkbox mgt16">
      <span class="el-checkbox__input">
<span class="el-checkbox__inner">

</span>
        <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value>
      </span>
                <span class="el-checkbox__label">实名发表</span>
              </label>
              <div data-v-0001d97a class="component-upload">

              </div>
              <button type="button" class="el-button el-button--primary el-button--medium" @click="submitComment">发表评论
              </button>
            </div>
            <div class="attachments-layout"></div>
          </section>
          <section class="comment-list">
            <h1>全部评论
              <span class="font12">共{{ commentNum }}条</span></h1>
            <a-card class="bottomCard" style="width: 150vh;padding:0">
              <a-comment v-for="item in commentList" :key="item.commentId">
                <template #author >
                  <a>{{ user }}</a>
                </template>
                <template #avatar>
                  <a-avatar
                      v-if="user.avatar == ''"
                      src="/src/assets/image/avatar1.png"
                  />
<!--                  <a-avatar v-if="user.avatar != ''" src="user.avatar"/>-->
                  <a-avatar v-if="user.avatar != ''" src="/src/assets/image/avatar1.png"/>
                </template>
                <template #actions>
                 <span style="text-align: right"><like-outlined/>{{ item.likesNumber }}&nbsp;&nbsp;<span
                     key="comment-nested-reply-to"
                     @click="reply(item.commentId)">回复</span>&nbsp;&nbsp;
                 </span>
                  <el-popover :visible="visible" placement="top" :width="160" style="text-align: right">
                    <p>确定要删除这条评论吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="small" text @click="visible = false">cancel</el-button>
                      <el-button size="small" type="primary" @click="confirmDelete(item.commentId)"
                      >confirm
                      </el-button
                      >
                    </div>
                    <template #reference>
                      <el-button @click="visible = true">删除</el-button>
                    </template>
                  </el-popover>

                </template>
                <template #content  >
                  <p style="text-align: left">{{ item.content }}</p>
                </template>

                <el-divider/>
                <ChildComponent :childComments="item.child !== null ? item.child : []" v-if="item.child != null">
                </ChildComponent>
              </a-comment>
            </a-card>

          </section>
        </div>
      </div>
    </div>
    <!--    已读人数弹窗-->
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {ref, onMounted, reactive} from "vue";
import {deleteNotice, getAllComment, getOneNotice} from "../../../api/notice.js";
import {getInfo} from "../../../api/login.js";
import {addComment, deleteCommentNotice, getComment, getCommentListTotal} from "../../../api/comment.js";
import ChildComponent from "/src/components/childComponent1.vue";
import {ElMessage} from "element-plus";

const noticeDetail = ref({
  title: '',
  content: '',
  createTime: '',
  createBy: '',
  documentLocation: '',
  pictureLocation: ''
})

const noticeid = ref()
noticeid.value = useRoute().query.noticeid
const id = noticeid.value
const user = ref()
const userId = ref()
const commentNum = ref()
const parentId = ref(0)
let visible = ref()
console.log("id；", id)

const commentform = reactive({
  commentId: '',
  content: '',
  typeId: '',
  createTime: Date(),
  createBy: '',
  parentId: ''

})


const commentList = ref(null)
onMounted(() => {
  getNoticeDetail(id)
  getCommentAll(id)
  getInfo().then(res => {
    user.value = res.user.nickName
  })
  getCommentListCount(id)
  // console.log("user:",user.value)
})
// console.log("userNickName:",user.value.user)

const getNoticeDetail = (id) => {
  getOneNotice(id).then((res) => {
    console.log(res)
    noticeDetail.value.content = res.content;
    noticeDetail.value.createTime = res.createTime;
    noticeDetail.value.createBy = res.createBy;
    noticeDetail.value.content = res.content;

  })
}
const getCommentAll = (id) => {
  getAllComment(id).then((res) => {
    console.log("res =====", res)
    commentList.value = res
    // commentNum.value = commentList.value.length
    // commentList.value.commentId = res.commentId;
    // commentList.value.content = res.content;
    // commentList.value.typeId = res.typeId;
    // commentList.value.createTime = res.createTime;
    // commentList.value.createBy = res.createBy;
  })
}
const getCommentListCount = (id) => {
  getCommentListTotal(id).then(res => {
    console.log("commentcount:", res)
    commentNum.value = res
  })
}
const submitComment = () => {
  getInfo().then(res => {
    userId.value = res.user.userId
    commentform.typeId = userId.value
    console.log("userId", userId.value);
    commentform.createTime = Date.parse(new Date())
    commentform.parentId = parentId.value
    // console.log("===============",commentform.createTime)
    addComment(commentform, id).then((res) => {
      console.log()
      getCommentAll(id)
    })
  })

  // getInfo().then(res => {
  //   console.log(res.user)
  //   userId.value = res.user.userId
  //   console.log(userId.value)
  //   comment.value.commentId = userId.value
  //   console.log("comment",comment.value)
  //   addComment(comment).then(res1 =>{
  //     console.log("res:",res1)
  //   })
  // })

  // console.log("=================",use)
  // comment.value.typeId = noticeDetail.value.id

}

//添加有父评论的评论
const reply = (parentId) => {
  getInfo().then(res => {
    userId.value = res.user.userId
    commentform.typeId = userId.value
    console.log("userId", userId.value);
    commentform.createTime = Date.parse(new Date())
    commentform.parentId = parentId
    // console.log("===============",commentform.createTime)
    addComment(commentform, id).then((res) => {
      console.log()
      getCommentAll(id)
    })
  })
  // addComment(userId.value, topicId, comment.value, parentId);
};

//删除逻辑
const confirmDelete=(commId)=>{
   deleteCommentNotice(commId).then(res =>{
     console.log(res)
     getCommentAll(id)
     ElMessage({
       message:'删除成功！',
       type:'success'
     })
     visible.value = false
})
}

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  border: 0;

}

#view-discuss {
  padding: 20px;
  /*width: 1224px;*/
  width: 80vw;
  margin: auto;

}

.notice-box {
  margin: 0 auto;

}

.announce-box {
  width: 80vw;
  height: auto;
  margin: 0 auto;
  border: 1px solid #dadce0;
  padding: 40px 24px 24px;
  border-radius: 4px;
  text-align: left;
  position: relative;
}

.announce-box-cont-span {
  position: absolute;
  background: #6642f4;
  color: #fff;
  font-size: 14px;
  left: 0;
  top: 0;
  border-bottom-right-radius: 4px;
  text-align: center;
  padding: 8px;
}

.el-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
}

.common_pointer {

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

}

span {
  outline: none;
}

.el-dropdown i {
  font-size: 20px;
}

.font_family {
  font-family: font_family !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-more_outline:before {
  content: "\e6be"
}

.notice-box .announce-box h1 span {
  vertical-align: middle;
  margin-right: 5px;
}

.el-tag {
  background-color: #00ca90;
  border-color: #00ca90;
  color: #fff;
}

.el-tag--small {
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
}

.title {
  font-size: 20px;
}

.detail {
  padding: 4px 0;
  /*margin-top: 10px;*/
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-align {
  display: flex;
  align-items: center;
}

.detail .left img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.font-color {
  color: #3c4043;
}

.font14 {
  font-size: 14px;
}

.detail .left span {
  margin: 0 14px;
  color: #74787c;
}

.font12 {
  font-size: 12px;
}

.font-color--main {
  color: #4285f4;
}

.content {
  margin: 16px 0;
  line-height: 24px;
  /*flex-wrap: inherit;*/
  /*float: left;*/
}

.mgt16 {
  margin-top: 16px;
}

.mgl-8 {
  margin-left: 8px;
}

.comment-box {
  width: 80vw;
  overflow: auto;
  color: #3c4043;
  background: #fff;
  /*padding:20px ;*/
  /*padding-right: 0;*/
}

.comment-main {
  margin-top: 24px;
  padding: 12px;
  border-bottom: 2px solid #4285f4;
  background: #f8f9fa;
}

.comment-box .comment-container .comment-main .left img {
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 50%;
}

.comment-container .comment-main .right {
  flex: 1;
}

.el-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
}

.el-textarea textarea {
  background: #f8f9fa;
  border: 0;
}

.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dadce0;
  border-radius: 4px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.comment-tools {
  margin: 16px 0;
  justify-content: flex-end;
}

.comment-tools .mgt16 {
  margin-right: 16px;
}

.el-checkbox__label {
  color: #4285f4;
}

.el-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.comment-list {
  margin-top: 12px;
}

.comment-list h1 {
  font-size: 20px;
  text-align: left;
}

.bottomCard {
  margin: auto;
}

.comment {
  width: 150vh;
}

</style>
<!--<template>-->
<!--  <div>-->
<!--    <div id="viewer-discuss" class="homework-cont gWidth">-->
<!--      <div class="homework-list clearfix editor-page">-->
<!--        <div class="homework-box">-->
<!--          <div class="announce-cont-box">-->
<!--            <div class="title clearfix"><h2>{{ currentGongGao.title }}</h2></div>-->
<!--            <div class="time" data-time="1606036528">-->
<!--              <div class="lefttime fl" style="height:30px;line-height:30px;">-->
<!--                <span class="dates fl" style="margin-right: 10px;">{{ currentGongGao.createTime }}</span>-->
<!--                <div class="fl"><img src="http://www.ketangpai.com/Public/Common/img/40/20.png"-->
<!--                                     class="userava">{{ currentGongGao.username }}-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="fr" style="display:block;">-->
<!--                <div class="getWordCloud" style="    margin-left: 570px;">展示词云</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="announce-cont">-->
<!--              <div class="word detailContent">-->
<!--                <article class="nobg"><p>{{ currentGongGao.content }}</p></article>-->
<!--              </div>-->
<!--              <div class="annex">-->
<!--                <ul class="clearfix">-->

<!--                </ul>-->
<!--              </div>-->
<!--              <div class="readed" @click="dialogVisible = true">{{ currentGongGao.readNum }}人已读</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="comment-box">-->
<!--            <div class="input-click clearfix" style="display: none;">-->
<!--              <div class="img">-->
<!--                <img src="http://www.ketangpai.com/Public/Common/img/40/20.png">-->
<!--                <span></span>-->
<!--              </div>-->
<!--              <p>点击添加评论...</p>-->
<!--            </div>-->
<!--            <div class="add-comment">-->
<!--              <div class="input-comment clearfix">-->
<!--                <div class="img fl">-->
<!--                  <img src="http://www.ketangpai.com/Public/Common/img/40/20.png">-->
<!--                  <span></span>-->
<!--                </div>-->
<!--                <div class="input fr" style="display: inline-block">-->
<!--                  <textarea id="text-area" class="comment-txt" placeholder="点击添加评论..."-->
<!--                            style="resize: none; height: 30px;" @focus="huifucheck"></textarea>-->
<!--                  <p class="rr" style="display: none;"></p>-->
<!--                  <div class="annex-box"></div>-->
<!--                </div>-->
<!--              </div>-->

<!--              &lt;!&ndash;输入框&ndash;&gt;-->
<!--              <div class="opt-cont" id="huifuinput">-->
<!--                <div class="sc-box fl">-->
<!--                  <a href="javascript:;" class="sc-btn webuploader-container">-->
<!--                    <div class="webuploader-pick"></div>-->
<!--                    <input type="file" name="file" class="webuploader-element-invisible" multiple="multiple"><label-->
<!--                      style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></a>-->
<!--                </div>-->
<!--                <div class="opt-btn fr">-->
<!--                  <a @click="huifucheckNone" class="cancel">取消</a>-->
<!--                  <a @click="publishDiscuss" class="sure">确定</a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <ul class="comment-list">-->

<!--              &lt;!&ndash;这个li需要循环打印&ndash;&gt;-->
<!--              <li v-for="(item) in pingLunList" v-bind:key="item.id">-->
<!--                <div class="img fl">-->
<!--                  <img src="http://www.ketangpai.com/Public/Common/img/40/20.png">-->
<!--                  <span></span>-->
<!--                </div>-->
<!--                <div class="com-det fr">-->
<!--                  <div class="title clearfix" style="margin-top: 5px">-->
<!--                    <div class="name fl">-->
<!--                      <span>{{ item.username }}</span>-->
<!--                      <span class="time">{{ item.createTime }}</span>-->
<!--                    </div>-->

<!--                  </div>-->
<!--                  <p class="cont" style="margin-left: 50px">{{ item.content }}</p>-->
<!--                  <div style="margin-left: 510px">-->
<!--                    <a @click="huifu(item.username)" style="margin-right: 30px;font-size: 10px;color: #00BCF6">回复</a>-->
<!--                    &lt;!&ndash;只有本人和教师可以删除评论&ndash;&gt;-->
<!--                    <a @click="deletePL(item.id)" style="font-size: 10px;color: #00BCF6"-->
<!--                       v-if="roleName === 'teacher'||item.userId === userId">删除</a>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </li>-->

<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash;查看谁已经查看&ndash;&gt;-->
<!--    <el-dialog-->
<!--        title="查看已读人员"-->
<!--        :visible.sync="dialogVisible"-->
<!--        width="55%">-->
<!--      <el-table-->
<!--          :data="tableData"-->
<!--          style="width: 100%">-->
<!--        <el-table-column-->
<!--            prop="logo"-->
<!--            header-align="center"-->
<!--            align="center"-->
<!--            label="头像">-->
<!--          <template slot-scope="scope">-->
<!--            <img :src="scope.row.avatar" alt="" style="width: 100px; height: 80px">-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="account" label="学号">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="username"-->
<!--            width="180"-->
<!--            label="姓名">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="createTime"-->
<!--            width="180"-->
<!--            label="查看日期">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--// import noticle from "@/api/noticle";-->
<!--// import topic from "@/api/topic";-->

<!--export default {-->
<!--  name: "noticeDetail",-->
<!--  // data() {-->
<!--  //   return {-->
<!--  //     tableData: [],         //已读情况-->
<!--  //     dialogVisible: false,        //这是查看谁已经查看的弹框-->
<!--  //     currentGongGao: {},-->
<!--  //     gongGaoList: [],-->
<!--  //     userId: sessionStorage.getItem("userId"),-->
<!--  //     roleName: sessionStorage.getItem("roleName"),-->
<!--  //     pingLunList: [],-->
<!--  //     token: this.getToken()-->
<!--  //   }-->
<!--  // },-->
<!--  // mounted() {-->
<!--  //   this.getAllPingLun()-->
<!--  //-->
<!--  //   this.getAllGongGao()-->
<!--  //   //获取当前的公告信息已读情况-->
<!--  //   this.getAllYidu()-->
<!--  // },-->
<!--  // methods: {-->

<!--    //获取所有的已读情况-->
<!--    getAllYidu() {-->
<!--      let id = sessionStorage.getItem("gonggaoId")-->
<!--      // noticle.getReadNoticeUser(id)-->
<!--      //     .then(res => {-->
<!--      //       this.tableData = res.data.noticeUsers;  //赋值-->
<!--      //-->
<!--      //     })-->
<!--    },-->
<!--    //获取所有公告-->
<!--    getAllGongGao() {-->
<!--      let courseId = sessionStorage.getItem("courseId")-->
<!--      // noticle.getAllNoticeByCourseId(courseId).then(res => {-->
<!--      //   console.log(res.data)-->
<!--      //   this.gongGaoList = res.data.notices;  //赋值-->
<!--      //-->
<!--      //   let gonggaoId = sessionStorage.getItem("gonggaoId")-->
<!--      //   for (let i = 0; i < this.gongGaoList.length; i++) {-->
<!--      //     if (this.gongGaoList[i].id === gonggaoId) {-->
<!--      //       this.currentGongGao = this.gongGaoList[i]-->
<!--      //     }-->
<!--      //   }-->

<!--      // })-->
<!--    },-->
<!--    //删除评论-->
<!--    deletePL(id) {-->
<!--      this.$confirm('此操作将删除该评论, 是否继续?', '提示', {-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning'-->
<!--      }).then(() => {-->
<!--        // noticle.removeNoticeComment(id)-->
<!--        //     .then(res => {-->
<!--        //       this.$message({-->
<!--        //         message: '删除成功',-->
<!--        //         type: 'success'-->
<!--        //       });-->
<!--        //       this.getAllPingLun()-->
<!--        //     })-->
<!--      }).catch(() => {-->
<!--        this.$message({-->
<!--          type: 'info',-->
<!--          message: '已取消删除'-->
<!--        });-->
<!--      });-->


<!--    },-->
<!--    //提交评论-->
<!--    publishDiscuss() {-->
<!--      let noticeComment = {-->
<!--        noticeId: sessionStorage.getItem("gonggaoId"),-->
<!--        userId: sessionStorage.getItem("userId"),-->
<!--        content: document.getElementById("text-area").value-->
<!--      }-->
<!--      // noticle.addNoticeComment(noticeComment)-->
<!--      //     .then(res => {-->
<!--      //       document.getElementById("text-area").value = "";-->
<!--      //       document.getElementById("huifuinput").style.display = "none";-->
<!--      //       this.$message({-->
<!--      //         message: '评论成功',-->
<!--      //         type: 'success'-->
<!--      //       });-->
<!--      //       this.getAllPingLun()-->
<!--      //     })-->
<!--    },-->
<!--    //点击回复事件-->
<!--    huifu(name) {-->
<!--      //打开回复框-->
<!--      document.getElementById("huifuinput").style.display = "block";-->
<!--      document.getElementById("text-area").value = "@" + name;-->
<!--    },-->
<!--    //将回复的确定和取消键打开-->
<!--    huifucheck() {-->
<!--      document.getElementById("huifuinput").style.display = "block";-->
<!--    },-->
<!--    //点击取消隐藏框-->
<!--    huifucheckNone() {-->
<!--      document.getElementById("text-area").value = "";-->
<!--      document.getElementById("huifuinput").style.display = "none";-->
<!--    },-->
<!--    //获取所有评论-->
<!--    getAllPingLun() {-->
<!--      let id = sessionStorage.getItem("gonggaoId")-->
<!--      let userId = sessionStorage.getItem("userId")-->
<!--      // noticle.getCommentByNoticeId(id)-->
<!--      //     .then(res => {-->
<!--      //       console.log(res.data)-->
<!--      //       this.pingLunList = res.data.commentNotices;-->
<!--      //     })-->
<!--    },-->
<!--  // }-->
<!--}-->
<!--</script>-->
<!--&lt;!&ndash;<style scoped src="../../assets/discuss_css/announce.css"></style>&ndash;&gt;-->
<!--<style scoped>-->
<!--.homework-cont, .send-box {-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.gWidth {-->
<!--  width: 810px;-->
<!--  margin-left: auto;-->
<!--  margin-right: auto;-->
<!--}-->

<!--.homework-cont .homework-list .homework-box .announce-cont-box {-->
<!--  padding-bottom: 10px;-->
<!--  padding-right: 37px;-->
<!--}-->

<!--.announce-cont-box .title h2 {-->
<!--  padding-top: 10px;-->
<!--  float: left;-->
<!--  height: 50px;-->
<!--  line-height: 50px;-->
<!--  font-size: 18px;-->
<!--  font-weight: 400;-->
<!--  width: 100%;-->
<!--}-->

<!--.userava {-->
<!--  height: 20px;-->
<!--  width: 20px;-->
<!--  border-radius: 100%;-->
<!--  float: left;-->
<!--  margin-top: 5px;-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.edit-page img, .editor-page img {-->
<!--  max-width: 100%;-->
<!--}-->

<!--.getWordCloud {-->
<!--  display: inline-block;-->
<!--  background: #357ae8;-->
<!--  border: 1px solid #357ae8;-->
<!--  color: #fff;-->
<!--  margin: 7px 10px;-->
<!--  height: 20px;-->
<!--  line-height: 20px;-->
<!--  font-size: 12px;-->
<!--  padding-left: 5px;-->
<!--  padding-right: 5px;-->
<!--  cursor: pointer;-->
<!--  border-radius: 3px;-->
<!--}-->

<!--.readed {-->
<!--  color: #5193ff;-->
<!--  font-size: 13px;-->
<!--  cursor: pointer;-->
<!--  user-select: none;-->
<!--}-->

<!--.homework-cont .homework-list .comment-box .add-comment .input .comment-txt {-->
<!--  width: calc(100% - 55px);-->
<!--  padding: 0 20px;-->
<!--  border-bottom: 1px solid #ececec;-->
<!--  line-height: 30px;-->
<!--  height: 30px;-->
<!--  word-break: break-all;-->
<!--  display: block;-->
<!--  overflow: hidden;-->
<!--  margin-top: 6px;-->
<!--  font-size: 14px;-->
<!--}-->

<!--input, select, textarea {-->
<!--  outline: none;-->
<!--  border: none;-->
<!--  background: none;-->
<!--  cursor: text;-->
<!--}-->

<!--textarea {-->
<!--  resize: none;-->
<!--}-->

<!--.homework-cont .homework-list .comment-list > li {-->
<!--  zoom: 1;-->
<!--  padding: 10px 24px;-->
<!--  border-top: 1px solid #dcdcdc;-->
<!--}-->

<!--.huifu {-->
<!--  background: url("https://www.ketangpai.com/Public/Home/img/reply.png");-->
<!--}-->

<!--[type=file] {-->
<!--  display: none;-->
<!--}-->

<!--a {-->
<!--  text-decoration: none;-->
<!--  cursor: pointer;-->
<!--}-->

<!--li {-->
<!--  list-style-type: none;-->
<!--}-->
<!--</style>-->
