<template>
  <a-comment
    v-for="(childComment, index) in childComments"
    :key="childComment.commentId"
  >
    <template #actions>
      <span
        ><like-outlined
          style="color: blue"
          @click="commentClick(childComment.commentId)"
        />{{ childComment.likesNumber }}&nbsp;&nbsp;<span
          key="comment-nested-reply-to"
          @click="show[index] = true"
          >回复</span
        >&nbsp;&nbsp;</span
      >
      <el-popover
        :visible="visible[index]"
        placement="top"
        :width="160"
        v-if="userId == childComment.typeId"
      >
        <p>确定要删除这条评论吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="small" text @click="visible[index] = false"
            >取消</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="deleteReview(childComment, index)"
            >确定</el-button
          >
        </div>
        <template #reference>
          <delete-outlined @click="visible[index] = true" />&nbsp;删除
        </template>
      </el-popover>
      <span @click="toggleFold" v-if="childComment.child != null">
        {{ isFolded ? "展开评论" : "折叠评论" }}
      </span>
    </template>
    <template #author>
      <a>{{ user.userName }}</a>
    </template>
    <template #avatar>
      <a-avatar
        v-if="user.avatar == ''"
        src="/src/assets/image/Topics.png"
        alt="Han Solo"
      />
      <a-avatar v-else src="user.avatar" alt="Han Solo" />
    </template>
    <template #content>
      <p>
        {{ childComment.content }}
      </p>
    </template>
    <div v-if="show[index] == true">
      <a-textarea
        v-model:value="comment[index]"
        placeholder="输入评论"
        :rows="4"
      />
      <br />
      <a-button @click="show[index] = false">取消</a-button>
      <a-button type="primary" @click="reply(childComment.commentId, index)"
        >发表评论</a-button
      >
    </div>
    <el-divider />

    <div v-if="!isFolded">
      <!-- 嵌套递归 -->
      <Child
        :childComments="childComment.child"
        :topicId="topicId"
        :isPost="isPost"
        v-if="shouldRenderChild"
      >
      </Child>
    </div>
  </a-comment>
</template>
<script>
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { userCourseId } from "../../store/index.js";
import { inject } from "vue";
import {
  getUserInfo,
  deleteComment,
  replyComment,
  commentLikes,
  findUserByTopicId,
} from "../../api/topic.js";
import { onMounted, ref } from "vue";

export default {
  components: {
    LikeOutlined,
    DeleteOutlined,
  },
  name: "Child",
  setup(props) {
    const visible = ref(
      Array(
        Array.isArray(props.childComments) ? props.childComments.length : 0
      ).fill(false)
    );

    const comment = ref(
      Array(
        Array.isArray(props.childComments) ? props.childComments.length : 0
      ).fill("")
    );
    const show = ref(
      Array(
        Array.isArray(props.childComments) ? props.childComments.length : 0
      ).fill(false)
    );
    const router = useRoute();
    const userId = ref();
    const toCourseId = userCourseId();
    const courseId = ref();
    const reload = inject("reload");
    const user = ref([]);
    const isFolded = ref(true);
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      console.log("课程id:" + courseId.value);
      getInfo();
      findUser(props.topicId);
    });
    const getInfo = () => {
      getUserInfo().then((res) => {
        userId.value = res.user.userId;
      });
    };
    //添加有父评论的评论
    const reply = (parentId, index) => {
      console.log("评论内容：" + comment.value[index]);
      console.log("00" + show.value[index]);
      if (props.isPost == "true") {
        replyComment(
          courseId.value,
          userId.value,
          props.topicId,
          comment.value[index],
          parentId
        );
        comment.value[index] = "";
        show.value[index] = false;
        reload();
      } else {
        alert("老师已禁止学生话题讨论");
        return;
      }
    };
    //删除评论
    const deleteReview = (item, index) => {
      deleteComment(item);
      visible.value[index] = false;
      reload();
    };
    //评论点赞功能
    const commentClick = (commentId) => {
      commentLikes(userId.value, commentId);
      reload();
    };
    /**
     * 查找发布该话题用户信息
     */
    const findUser = (topicId) => {
      findUserByTopicId(topicId).then((res) => {
        user.value = res;
      });
    };
    const toggleFold = () => {
      isFolded.value = !isFolded.value;
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
      reload,
      findUser,
      user,
      toggleFold,
      isFolded,
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
    isPost: {
      type: String,
      required: true,
    },
  },
};
</script>
