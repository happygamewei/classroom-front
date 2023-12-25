<template>
  <div class="bigbox">
    <a-card class="topCard" style="width: 150vh; height: 35vh">
      <span class="topImage">话题</span>
      <span class="title">{{ object ? object.title : "" }}</span>
      <span class="username">
        <img v-if="user.avatar == ''" src="/src/assets/image/Topics.png" />
        <img v-else src="user.avatar" />
        {{ user.userName }}</span
      >
      <br />
      <span class="publishDate"
        >创建于{{ object ? object.publishDate : "" }}</span
      >
      <span class="reply"
        >{{ object ? object.totalScore : "" }}分&nbsp;&nbsp;回复{{
          object ? object.leastReplyNumber : ""
        }}次</span
      >

      <span class="content"
        >&nbsp;&nbsp;{{ object ? object.content : "" }}</span
      >
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
    </a-card>
    <br />
    <a-textarea
      style="width: 150vh"
      v-model:value="comment"
      placeholder="说点什么吧"
      :rows="4"
    />
    <br />
    <span class="middle"
      ><a-switch v-model:checked="checked" />实名发表
      <a-button type="primary" @click="postComments">发表评论</a-button></span
    >
    <div class="middle1">
      全部评论<span>共{{ count }}条</span>
    </div>
    <a-card :key="key" class="bottomCard" style="width: 150vh">
      <span v-if="comments.length === 0">
        <a-empty :image="simpleImage" />
      </span>
      <a-comment
        v-else
        v-for="item in comments"
        :key="item.commentId"
        :commentId1="getCommentId(item)"
      >
        <template #actions>
          <span
            ><like-outlined
              style="color: blue"
              @click="commentClick(item.commentId)"
            />{{ item.likesNumber }}&nbsp;&nbsp;<span
              key="comment-nested-reply-to"
              @click="show = true"
              >回复</span
            >&nbsp;&nbsp;</span
          >
          <el-popover
            :visible="visible"
            placement="top"
            :width="160"
            v-if="userId == item.typeId"
          >
            <p>确定要删除这条评论吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="visible = false"
                >取消</el-button
              >
              <el-button size="small" type="primary" @click="deleteReview(item)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <delete-outlined @click="visible = true" />&nbsp;删除
            </template>
          </el-popover>
        </template>
        <template #author>
          <a>{{ user.userName }}</a>
        </template>
        <template #avatar>
          <a-avatar
            v-if="user.avatar == ''"
            src="/src/assets/image/Topics.png"
          />
          <a-avatar v-if="user.avatar != ''" src="user.avatar" />
        </template>
        <template #content>
          <p>{{ item.content }}</p>
        </template>
        <div v-if="show == true">
          <a-textarea
            v-model:value="comment"
            placeholder="输入评论"
            :rows="4"
          />
          <br />
          <a-button @click="show = false">取消</a-button>
          <a-button type="primary" @click="reply(item.commentId)"
            >发表评论</a-button
          >
        </div>
        <el-divider />
        <ChildComponent
          :childComments="item.child"
          :topicId="topicId"
          v-if="item.child != null"
        >
        </ChildComponent>
      </a-comment>
    </a-card>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Empty } from "ant-design-vue";
import ChildComponent from "/src/components/Topics/childComponent.vue";
import { userCourseId } from "../../../store/index.js";
import mitter from "../../../main.js";
import {
  getDetail,
  getUserInfo,
  postComment,
  likeCount,
  getAllTopicComments,
  findUserByTopicId,
  findCommentCounts,
  deleteComment,
  replyComment,
  commentLikes,
  LikeState,
} from "../../../api/topic.js";
import { useRoute } from "vue-router";

export default {
  components: {
    LikeOutlined,
    ChildComponent,
    DeleteOutlined,
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
    const refreshPage = ref(false);
    const commentId1 = ref();
    const like = ref();
    const key = ref(0);
    const courseId = ref();

    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      topicDetail1(topicId);
      getInfo();
      getAllTopicComment(topicId);
      findUser(topicId);
      findCommentCount();
      refreshPage.value = false;

      // commentLike();
    });

    const findCommentCount = () => {
      findCommentCounts(topicId).then((res) => {
        count.value = res;
      });
    };
    const clickCount = () => {
      likeCount(userId.value, topicId).then((res) => {
        console.log(res);
        location.reload();
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
        userId.value = res.userId;
      });
    };
    const postComments = () => {
      console.log("评论：" + comment.value);
      console.log("评论：" + courseId.value);
      if (isPost == "true") {
        if (comment.value == "" || comment.value == null) {
          alert("内容不能为空");
        } else {
          postComment(courseId.value, userId.value, topicId, comment.value);
          alert("评论发表成功");
          comment.value = "";
          location.reload();
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
    //添加有父评论的评论
    const reply = (parentId) => {
      replyComment(
        courseId.value,
        userId.value,
        topicId,
        comment.value,
        parentId
      );
      comment.value = "";
      show.value = false;
      alert("添加评论成功");
      location.reload();
    };
    //删除评论
    const deleteReview = (item) => {
      deleteComment(item);
      visible.value = false;
      refreshPage.value = true;
      location.reload();
    };
    //评论点赞功能
    const commentClick = (commentId) => {
      commentLikes(userId.value, commentId);
      location.reload();
    };
    const getCommentId = computed(() => {
      return (item) => {
        return item.commentId;
      };
    });
    // //判断评论点赞状态
    // const commentLike = () => {
    //   console.log("评论的id：" + userId.value);
    //   LikeState(userId.value, commentId1.value).then((res) => {
    //     console.log("结果为：" + res);
    //     like.value = res;
    //   });
    // };
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
      reply,
      visible,
      count,
      deleteReview,
      show,
      commentClick,
      commentId1,
      getCommentId,
      like,
      key,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    };
  },
};
</script>

<style>
.bigbox {
  margin: auto;
}
.topCard {
  margin-top: 7vh;
  margin-left: 26vh;

  box-shadow: 2px 2px 0.5px rgba(184, 171, 171, 0.5);
}
.bottomCard {
  margin: auto;
}
.comment {
  width: 150vh;
}
.topImage {
  border: #dda720;
  width: 5vh;
  height: 5vh;
  font-size: small;
  color: #fff;
  background-color: #dda720;
  margin-top: -20vh;
  margin-left: -105vh;
}
.title {
  position: relative;
  top: 3vh;
  left: 55vh;
  font-weight: bolder;
}
.username {
  position: relative;
  top: 8vh;
  left: 40vh;
  font-weight: bold;
  font-size: small;
}
.publishDate {
  position: relative;
  top: 5vh;
  right: 30vh;
  font-size: x-small;
}
.reply {
  position: relative;
  top: 9vh;
  right: 57vh;
  font-size: x-small;
}
.content {
  position: relative;
  top: 14vh;
  left: -65vh;
  font-size: large;
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
</style>
