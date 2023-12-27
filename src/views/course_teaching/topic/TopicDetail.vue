<template>
  <div class="bigbox">
    <a-card class="topCard" style="width: 150vh; height: 35vh">
      <div class="topImage"><p class="topword">话题</p></div>
      <div class="detailtitle">{{ object ? object.title : "" }}</div>
      <div class="info1">
        <span>
          <img v-if="user.avatar == ''" src="/src/assets/image/Topics.png" />
          <img v-else src="user.avatar" />
          &nbsp; {{ user.userName }}</span
        >
        <span class="publishDate"
          >创建于{{ object ? object.publishDate : "" }}</span
        >
      </div>
      <div class="reply">
        <span
          >{{ object ? object.totalScore : "" }}分&nbsp;&nbsp;回复{{
            object ? object.leastReplyNumber : ""
          }}次</span
        >
      </div>
      <div class="content">
        <span>&nbsp;&nbsp;{{ object ? object.content : "" }}</span>
      </div>
      <div class="card-bottom">
        <span class="join"
          >已参与{{ object ? object.joinNumber : "" }}&nbsp;&nbsp;未参与{{
            noJoinNumber
          }}</span
        >
        <span class="like">
          <like-outlined :style="{ color: 'blue' }" @click="clickCount" />{{
            object ? object.likeCount : ""
          }}</span
        >
      </div>
    </a-card>

    <div class="middle">
      <div>
        <a-textarea
          style="width: 150vh"
          v-model:value="comment"
          placeholder="说点什么吧"
          :rows="4"
        />
      </div>

      <div class="middle-bottom">
        <a-switch v-model:checked="checked" />&nbsp;实名发表&nbsp;
        <a-button type="primary" @click="postComments">发表评论</a-button>
      </div>
    </div>
    <div class="middle1">
      全部评论<span>共{{ count }}条</span>
    </div>
    <a-card :key="key" class="bottomCard" style="width: 150vh">
      <span v-if="comments.length === 0">
        <a-empty :image="simpleImage" />
      </span>
      <Comment
        v-else
        v-for="item in comments"
        :key="item.commentId"
        :item="item"
        :topicId="topicId"
        :isPost="isPost"
      ></Comment>
    </a-card>
  </div>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Empty } from "ant-design-vue";
import { userCourseId } from "../../../store/index.js";
import Comment from "/src/components/Topics/comments.vue";
import {
  getDetail,
  getUserInfo,
  postComment,
  likeCount,
  getAllTopicComments,
  findUserByTopicId,
  findCommentCounts,
} from "../../../api/topic.js";
import { useRoute } from "vue-router";

export default {
  components: {
    LikeOutlined,
    DeleteOutlined,
    Comment,
    getUserInfo,
  },
  setup() {
    const toCourseId = userCourseId();
    const show = ref(false);
    const visible = ref(false);
    const object = ref();
    const router = useRoute();
    const topicId = router.params.topicId;
    const noJoinNumber = router.params.noJoinNumber;
    const isPost = router.query.isPost;
    const comment = ref(null);
    const userId = ref();
    const checked = ref(true);
    const comments = ref([]);
    const user = ref([]);
    const count = ref(0);
    const commentId1 = ref();
    const like = ref();
    const key = ref(0);
    const courseId = ref();
    const userRole = ref("");
    const reload = inject("reload");
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      topicDetail1(topicId);
      getInfo();
      getAllTopicComment(topicId);
      findUser(topicId);
      findCommentCount();
    });

    const findCommentCount = () => {
      findCommentCounts(topicId).then((res) => {
        count.value = res;
      });
    };
    const clickCount = () => {
      likeCount(userId.value, topicId).then((res) => {
        reload();
      });
    };
    const topicDetail1 = (topicId) => {
      getDetail(topicId)
        .then((res) => {
          object.value = res;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getInfo = () => {
      getUserInfo().then((res) => {
        userId.value = res.user.userId;
        userRole.value = res.roles;
      });
    };
    const postComments = () => {
      if (isPost == "true") {
        if (comment.value == "" || comment.value == null) {
          alert("内容不能为空");
        } else {
          postComment(courseId.value, userId.value, topicId, comment.value);
          alert("评论发表成功");
          comment.value = "";
          reload();
        }
      } else {
        alert("老师已禁止学生话题讨论");
        return;
      }
    };
    const getAllTopicComment = (topicId) => {
      getAllTopicComments(topicId).then((res) => {
        comments.value = res;
      });
    };
    /**
     * 查找发布该话题用户信息
     */
    const findUser = (topicId) => {
      findUserByTopicId(topicId).then((res) => {
        user.value = res;
      });
    };

    return {
      object,
      topicId,
      userId,
      noJoinNumber,
      comment,
      postComments,
      clickCount,
      checked,
      comments,
      user,
      visible,
      count,
      show,
      commentId1,
      like,
      key,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      isPost,
      userRole,
    };
  },
};
</script>

<style scoped>
.bigbox {
  margin: auto;
}
.topCard {
  margin-top: 7vh;
  margin-left: 28vh;

  box-shadow: 2px 2px 0.5px rgba(184, 171, 171, 0.5);
}
.bottomCard {
  margin: auto;
}
.comment {
  width: 150vh;
}
.topImage {
  width: 5vh;
  height: 4vh;
  font-size: small;
  color: #fff;
  background-color: rgb(255, 187, 0);
  margin-top: -3vh;
  margin-left: -3vh;
}
.detailtitle {
  margin-top: 2vh;
  margin-left: -120vh;
  font-size: 2.5vh;
  font-weight: bolder;
}

.publishDate {
  font-size: x-small;
  margin-left: 2vh;
  font-weight: normal;
}
.reply {
  font-size: x-small;
  margin-top: 2vh;
  margin-left: -130vh;
}
.content {
  font-size: large;
  margin-left: -130vh;
  margin-top: 1vh;
}
.join {
  position: relative;
  top: 20vh;
  left: -60vh;
  font-size: smaller;
  color: blue;
}
.like {
  position: relative;
  top: 20vh;
  left: -20vh;
}
.middle1 {
  font-size: 2vh;
  margin-top: 3vh;
  margin-left: -130vh;
}
.middle {
  margin-top: 2vh;
}
.topword {
  padding-top: 0.5vh;
}
.info1 {
  margin-top: 2vh;
  margin-left: -110vh;
  font-weight: bold;
  font-size: 2.5vh;
}
.card-bottom {
  margin-top: -19vh;
  margin-left: -3vh;
}
.middle-bottom {
  margin-top: 2vh;
}
.btn {
  margin-top: 1vh;
}
</style>
