<template>
  <span class="totalCount">共有 {{ count }} 个活动</span>
  <a-card :bordered="true" style="width: 166vh">
    <a-list item-layout="horizontal">
      <template v-for="item in objects" :key="item.topicId">
        <a-list-item class="topic-list">
          <a-list-item-meta>
            <template #title>
              <div>
                <span
                  class="title1"
                  @click="goToTopicDetail(item.topicId, item.noJoinNumber)"
                >
                  {{ item.title }}
                </span>

                <br />
                <div
                  class="content2"
                  v-if="
                    item.publishDate == null && item.topic_user_role == 'admin'
                  "
                >
                  <span>未发布</span>
                </div>
                <div
                  v-if="item.publishDate != null && userRole == 'admin'"
                  class="content1"
                >
                  截止时间：
                  <span v-if="item.deadline != null">
                    {{ formatDeadline(item.deadline) }}
                  </span>
                  <span v-else> 不限 </span>| 已参加
                  <span>{{ item.joinNumber }}</span>
                  | 未参加
                  <span>
                    {{ item.noJoinNumber }}
                  </span>
                  |评论
                  <span>
                    {{ item.commentCount }}
                  </span>
                </div>
                <div
                  class="issue"
                  v-if="item.publishDate == null && userRole == 'admin'"
                >
                  <div class="issue1">
                    <send-outlined @click="issue(item.topicId)" />发布
                  </div>
                </div>
                <div class="more" v-if="userRole == 'admin'">
                  <p style="font-size: 2vh" class="more1">更多</p>
                  <el-popover
                    placement="right"
                    :width="50"
                    :height="100"
                    trigger="click"
                  >
                    <template #reference>
                      <ellipsis-outlined size="15" /><br />
                    </template>

                    <div>置顶</div>
                    <div>
                      <span @click="deleteTopic(item.topicId)">删除</span>
                    </div>
                    <div><span @click="issue(item.topicId)">编辑</span></div>
                    <div>移动到章节</div>
                  </el-popover>
                </div>
              </div>
            </template>
            <template #avatar>
              <a-avatar
                :size="40"
                src="src/assets/image/Topics.png"
                class="avatar"
              ></a-avatar>
              <p style="font-size: large">话题</p>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>
<script lang="ts">
import { ref, onMounted, inject } from "vue";
import {
  getList,
  getUserInfo,
  isJoinTopic,
  deleteTopicById,
  getDetail,
  topicCount,
} from "../../api/topic.js";
import { userCourseId } from "../../store/index.js";
import { useRouter } from "vue-router";
import { EllipsisOutlined, SendOutlined } from "@ant-design/icons-vue";
import mitter from "../../main.js";
export default {
  components: {
    EllipsisOutlined,
    SendOutlined,
  },
  setup() {
    const toCourseId = userCourseId();
    const router = useRouter();
    const objects = ref([]);
    const courseId = ref();
    const userId = ref();
    const isPost = ref();
    const showMode = ref(true);
    const key = ref(false);
    const count = ref(0);
    const option = ref();
    const userRole = ref("");
    const reload = inject("reload");
    mitter.on("checked", (data) => {
      isPost.value = data;
    });
    mitter.on("option-selected", (data) => {
      option.value = data;
      getAllTopics(courseId, option.value);
    });
    // mitter.on("refresh", (data) => {
    //   console.log("更新前：" + key.value);
    //   key.value += +1;
    //   console.log("更新后：" + key.value);
    // });
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getAllTopics(courseId, option.value);
      getUserInfo1();
      getTopicCount(courseId);
    });
    const getTopicCount = (courseId) => {
      topicCount(courseId.value)
        .then((res) => {
          count.value = res;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    /**
     *
     * @param courseId
     * 获取参加这个课程的所有话题
     */
    const getAllTopics = (courseId, option) => {
      getList(courseId.value).then((res) => {
        switch (option) {
          case 1:
            res.sort(
              (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
            );

            break;

          case 2:
            res.sort(
              (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
            );

            break;
          case 3:
            res.sort((a, b) => a.title.localeCompare(b.title));

            break;
          case 4:
            res.sort((a, b) => b.title.localeCompare(a.title));

            break;
          default:
            break;
        }
        objects.value = res;
      });
    };
    const getUserInfo1 = () => {
      getUserInfo().then((res) => {
        userId.value = res.user.userId;
        userRole.value = res.roles;
      });
    };
    const deleteTopic = (topicId) => {
      deleteTopicById(topicId).then((res) => {
        mitter.emit("refresh", key.value);
      });
    };
    const issue = (topicId) => {
      const topic = getDetail(topicId);
      topic.then((data) => {
        mitter.emit("topic", data);
      });
      mitter.emit("showMode", showMode.value);
      mitter.emit("update", true);
    };
    const goToTopicDetail = (topicId, noJoinNumber) => {
      isJoinTopic(userId.value, topicId);

      router.push({
        name: "TopicDetail",
        params: {
          topicId: topicId,
          noJoinNumber: noJoinNumber,
        },
        query: {
          isPost: isPost.value?.toString(), // 将布尔值转换为字符串类型
        },
      });
    };
    const formatDeadline = (deadline) => {
      const dateTime = new Date(deadline);
      const formattedDateTime = dateTime.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return formattedDateTime;
    };
    return {
      objects,
      userId,
      courseId,
      goToTopicDetail,
      deleteTopic,
      issue,
      key,
      count,
      formatDeadline,
      userRole,
    };
  },
};
</script>

<style scoped>
.title1 {
  font-family: 楷书;
  font-weight: bolder;
  font-size: 22px;
  margin-left: -110vh;
}
.content1 {
  font-size: 13px;
  padding-top: 5vh;
  margin-left: -90vh;
}
.content2 {
  margin-top: 4vh;
  margin-left: -110vh;
  font-size: smaller;
}
.more {
  margin-right: -130vh;
}
.issue {
  position: relative;
}
.issue1 {
  position: absolute;
  right: 10vh;
}
.totalCount {
  position: relative;
  left: -140vh;
  top: -1vh;
}
.topic-list {
  padding-bottom: 2vh;
}
</style>
