<template>
  <a-comment
    v-for="childComment in childComments"
    :key="childComment.commentId"
  >
    <template #actions>
      <span
        ><like-outlined
          style="color: blue"
          @click="commentClick(childComment.commentId)"
        />{{ childComment.likesNumber }}&nbsp;&nbsp;<span
          key="comment-nested-reply-to"
          @click="show = true"
          >回复</span
        >&nbsp;&nbsp;</span
      >
      <el-popover
        :visible="visible"
        placement="top"
        :width="160"
        v-if="userId == childComment.typeId"
      >
        <p>确定要删除这条评论吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible = false">取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="deleteReview(childComment)"
            >确定</el-button
          >
        </div>
        <template #reference>
          <delete-outlined @click="visible = true" />&nbsp;删除
        </template>
      </el-popover>
    </template>
    <template #author>
      <a>Han Solo</a>
    </template>
    <template #avatar>
      <a-avatar src="/src/assets/image/Topics.png" alt="Han Solo" />
    </template>
    <template #content>
      <p>
        {{ childComment.content }}
      </p>
    </template>
    <div v-if="show == true">
      <a-textarea v-model:value="comment" placeholder="输入评论" :rows="4" />
      <br />
      <a-button @click="show = false">取消</a-button>
      <a-button type="primary" @click="reply(childComment.commentId)"
        >发表评论</a-button
      >
    </div>
    <el-divider />
    <!-- 嵌套递归 -->
    <Child
      :childComments="childComment.child"
      :topicId="topicId"
      v-if="shouldRenderChild"
    >
    </Child>
  </a-comment>
</template>
<script>
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { userCourseId } from "../../store/index.js";
import {
  getUserInfo,
  deleteComment,
  replyComment,
  commentLikes,
} from "../../api/topic";
import { onMounted, ref } from "vue";
export default {
  components: {
    LikeOutlined,
    DeleteOutlined,
  },
  name: "Child",
  setup(props) {
    const visible = ref(false);
    const show = ref(false);
    const router = useRoute();
    const userId = ref();
    const comment = ref();
    const toCourseId = userCourseId();
    const courseId = ref();
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getInfo();
    });
    const getInfo = () => {
      getUserInfo().then((res) => {
        userId.value = res.userId;
      });
    };
    //添加有父评论的评论
    const reply = (parentId) => {
      console.log("comment:" + comment.value);
      replyComment(
        courseId.value,
        userId.value,
        props.topicId,
        comment.value,
        parentId
      );
      comment.value = "";
      show.value = false;
      location.reload();
    };
    //删除评论
    const deleteReview = (item) => {
      deleteComment(item);
      visible.value = false;
      location.reload();
    };
    //评论点赞功能
    const commentClick = (commentId) => {
      commentLikes(userId.value, commentId);
      location.reload();
    };
    return {
      router,
      userId,
      visible,
      deleteReview,
      reply,
      show,
      comment,
      commentClick,
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
    topicId: {
      type: Number,
      required: true,
    },
  },
};
</script>
