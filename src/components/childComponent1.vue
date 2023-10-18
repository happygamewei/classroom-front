<template>
<!--  <h1>子评论</h1>-->
  <a-comment
    v-for="childComment in childComments"
    :key="childComment.commentId"
  >
    <template #actions>
      <span
        ><like-outlined />{{ childComment.likesNumber }}&nbsp;&nbsp;<span
          key="comment-nested-reply-to"
          @click="reply(childComment.commentId)"
          >回复</span
        >&nbsp;&nbsp;</span
      >
      <el-popover
        :visible="visible"
        placement="top"
        :width="160"
      >
        <p>确定要删除这条评论吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible = false"
            >cancel</el-button
          >
          <el-button size="small" type="primary" @click="confirmDelete(childComment.commentId)"
            >confirm</el-button
          >
        </div>
        <template #reference>
          <delete-outlined @click="visible = true" />&nbsp;删除
        </template>
      </el-popover>
    </template>
    <template #author>
      <a>{{ user }}</a>
    </template>
    <template #avatar>
<!--      <a-avatar src="/src/assets/image/Topics.png" alt="Han Solo" />-->
    </template>
    <template #content>
      <p>
        {{ childComment.content }}
      </p>
    </template>
    <el-divider />
    <!-- 嵌套递归 -->
    <Child :childComments="childComment.child" v-if="shouldRenderChild">
    </Child>
  </a-comment>
</template>
<script >
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import {getInfo} from "../api/login.js";
import {onMounted, reactive, ref} from "vue";
import {addComment, deleteCommentNotice, getCommentListTotal} from "../api/comment.js";
import {ElMessage} from "element-plus";
import {getAllComment} from "../api/notice.js";
export default {
  components: {
    LikeOutlined,
    DeleteOutlined,
  },
  name: "Child",
  setup() {
    const visible = ref(false);
    const router = useRoute();
    const userId = ref();
    const user = ref();
    const noticeid = ref()
    noticeid.value = useRoute().query.noticeid
    const id = noticeid.value
    const commentList = ref(null)
    const commentNum = ref()
    const commentform = reactive({
      commentId: '',
      content: 'ceshi',
      typeId: '',
      createTime: Date(),
      createBy: '',
      parentId: ''

    })
    // const userName = ref()
    onMounted(() => {
      getInfo().then(res => {
        // user.value = res.user.userId
        user.value = res.user.nickName
      })
      getCommentAll(id)
      getCommentListCount(id)
    });
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
          getCommentListCount(id)
        })
      })
      // addComment(userId.value, topicId, comment.value, parentId);
    };


//删除逻辑
    const confirmDelete=(commId)=>{
      deleteCommentNotice(commId).then(res =>{
        console.log(res)
        getCommentAll(id)
        getCommentListCount(id)
        ElMessage({
          message:'删除成功！',
          type:'success'
        })
        visible.value = false
      })
    }

    return {
      router,
      userId,
      visible,
      user,
      noticeid,
      commentform,
      reply,
      confirmDelete,
      getCommentListCount
    };
  },
  data() {
    return {
      shouldRenderChild: true,
    };
  },
  props: {
    childComments: {
      type: Array,
      required: true,
    },
  },
};
</script>
