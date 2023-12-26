<template>
  <a-comment :commentId1="getCommentId(item)">
    <template #actions>
      <span
        ><like-outlined style="color: blue" @click="commentClick()" />{{
          item.likesNumber
        }}&nbsp;&nbsp;<span key="comment-nested-reply-to" @click="show = true"
          >回复</span
        >&nbsp;&nbsp;</span
      >
      <el-popover :visible="visible" placement="top" :width="160">
        <p>确定要删除这条评论吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible = false">取消</el-button>
          <el-button size="small" type="primary" @click="deleteReview()"
            >确定</el-button
          >
        </div>
        <template #reference>
          <delete-outlined @click="visible = true" />&nbsp;删除
        </template>
      </el-popover>
      <span @click="toggleFold" v-if="item.child != null">
        {{ isFolded ? "展开评论" : "折叠评论" }}
      </span>
    </template>
    <template #author>
      <a>{{ user.userName }}</a>
    </template>
    <template #avatar>
      <a-avatar v-if="user.avatar == ''" src="/src/assets/image/Topics.png" />
      <a-avatar v-if="user.avatar != ''" src="user.avatar" />
    </template>
    <template #content>
      <p>{{ item.content }}</p>
    </template>
    <div v-if="show == true">
      <a-textarea v-model:value="comment" placeholder="输入评论" :rows="4" />
      <div class="btn">
        <a-button @click="show = false">取消</a-button>&nbsp;
        <a-button type="primary" @click="reply()">发表评论</a-button>
      </div>
    </div>
    <el-divider />
    <!-- 显示子评论 -->
    <div v-if="!isFolded">
      <ChildComponent
        :childComments="item.child"
        :topicId="topicId"
        :isPost="isPost"
        v-if="item.child != null"
      >
      </ChildComponent>
    </div>
  </a-comment>
</template>
<script>
import ChildComponent from "/src/components/Topics/childComponent.vue";
import {
  getUserInfo,
  findUserByTopicId,
  deleteComment,
  replyComment,
  commentLikes,
} from "../../api/topic";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { ref, computed, inject, onMounted } from "vue";
import { userCourseId } from "../../store/index";
import { useRoute } from "vue-router";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    topicId: {
      type: Number,
      required: true,
    },
    isPost: {
      type: String,
      required: true,
    },
  },
  components: {
    ChildComponent,
    LikeOutlined,
    DeleteOutlined,
  },
  setup(props) {
    const comment = ref("");
    const toCourseId = userCourseId();
    const show = ref(false);
    const visible = ref(false);
    const router = useRoute();
    const topicId = router.params.topicId;
    const isPost = router.query.isPost;
    const userId = ref();
    const user = ref([]);
    const courseId = ref();
    const reload = inject("reload");
    const isFolded = ref(true);
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getInfo();
      findUser(props.topicId);
    });
    const getInfo = () => {
      getUserInfo().then((res) => {
        userId.value = res.userId;
      });
    };
    //添加有父评论的评论
    const reply = () => {
      if (isPost == "true") {
        replyComment(
          courseId.value,
          userId.value,
          props.topicId,
          comment.value,
          props.item.commentId
        );
        comment.value = "";
        show.value = false;
        alert("添加评论成功");
        reload();
      } else {
        alert("老师已禁止学生话题讨论");
        return;
      }
    };
    //删除评论
    const deleteReview = () => {
      deleteComment(props.item);
      visible.value = false;
      reload();
    };
    //评论点赞功能
    const commentClick = () => {
      commentLikes(userId.value, props.item.commentId);
      reload();
    };
    const getCommentId = computed(() => {
      return () => {
        return props.item.commentId;
      };
    });
    /**
     * 查找发布该话题用户信息
     */
    const findUser = (topicId) => {
      findUserByTopicId(topicId).then((res) => {
        user.value = res;
      });
    };
    // 评论折叠板
    const toggleFold = () => {
      isFolded.value = !isFolded.value;
    };
    return {
      show,
      comment,
      commentClick,
      reply,
      getCommentId,
      deleteReview,
      user,
      isFolded,
      toggleFold,
    };
  },
};
</script>
