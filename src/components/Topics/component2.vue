<template>
  <span class="totalCount">共有 {{ count }} 个活动</span>
  <a-card :bordered="true" style="width: 166vh">
    <!-- <a-card v-for="homework in homeworkList" :key="homework.homeworkId">
      {{ homework.title }} - {{ homework.description }}</a-card> -->
    <a-list item-layout="horizontal">
      <template v-for="item in objects" :key="item.topicId">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <span
                class="title"
                @click="goToTopicDetail(item.topicId, item.noJoinNumber)"
              >
                {{ item.title }}
              </span>

              <br />
              <div class="content2" v-if="item.publishDate == null">
                <span>未发布</span>
              </div>
              <div v-else class="content1">
                截止时间：
                <span v-if="item.deadline != null">
                  {{ item.deadline }}
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
              <div class="issue" v-if="item.publishDate == null">
                <send-outlined @click="issue(item.topicId)" />发布
              </div>
              <div class="more">
                <el-popover
                  placement="right"
                  :width="50"
                  :height="100"
                  trigger="click"
                >
                  <template #reference> <ellipsis-outlined /><br /> </template>

                  <div>置顶</div>
                  <div>
                    <span @click="deleteTopic(item.topicId)">删除</span>
                  </div>
                  <div><span @click="issue(item.topicId)">编辑</span></div>
                  <div>移动到章节</div>
                </el-popover>
              </div>
            </template>
            <template #avatar>
              <a-avatar
                :size="size"
                src="src/assets/image/Topics.png"
              ></a-avatar>
              <p>话题</p>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
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
    const key = ref(0);
    const count = ref(0);

    mitter.on("checked", (data) => {
      isPost.value = data;
      console.log("data----:" + isPost.value);
    });
    // mitter.on("refresh", (data) => {
    //   console.log("更新前：" + key.value);
    //   key.value += +1;
    //   console.log("更新后：" + key.value);
    // });
    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getAllTopics(courseId);
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
    const getAllTopics = (courseId) => {
      getList(courseId.value).then((res) => {
        objects.value = res;
      });
    };
    const getUserInfo1 = () => {
      getUserInfo().then((res) => {
        userId.value = res.userId;
      });
    };
    const deleteTopic = (topicId) => {
      deleteTopicById(topicId);
      mitter.emit("refresh", key.value);
    };
    const issue = (topicId) => {
      const topic = getDetail(topicId);
      topic.then((data) => {
        mitter.emit("topic", data);
        console.log("添加开关！！！！----" + data + "," + topicId);
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
          isPost: isPost.value.toString(), // 将布尔值转换为字符串类型
        },
      });
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
    };
  },
};
</script>

<style>
.title {
  font-family: 楷书;
  font-size: medium;
  margin-left: -120vh;
}
.content1 {
  margin-top: 4vh;
  margin-left: -105vh;
  font-size: smaller;
}
.content2 {
  margin-top: 4vh;
  margin-left: -105vh;
  font-size: smaller;
}
.more {
  margin-right: -120vh;
  margin-top: -3vh;
}
.issue {
  margin-top: -7vh;
  margin-right: -110vh;
}
.totalCount {
  position: relative;
  left: -70vh;
  top: -8vh;
}
</style>
