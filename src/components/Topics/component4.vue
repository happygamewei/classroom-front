<template>
  <a-modal
    style="width: 100vh; height: 150vh overflow: auto;"
    v-model:open="showMode"
    title="添加话题"
    @cancel="handleClose"
    @ok="handleOk"
    ok-text="提交"
    cancel-text="取消"
    v-model="topic"
  >
    <span> 话题标题 </span
    ><a-input
      v-model:value="topic.title"
      style="width: 90%"
      placeholder="请输入话题标题"
    />

    <a-textarea
      class="context"
      v-model:value="topic.content"
      placeholder="话题内容"
      :rows="6"
    />

    <span class="label">活动类型标签</span>
    <a-input
      class="typeContent"
      v-model:value="topic.typeLabel"
      placeholder="话题"
      style="width: 30%"
    />
    <span class="share">
      <span> 知识共享协议&nbsp;&nbsp;</span>
      <el-select v-model="topic.shareProtocol" class="m-2" placeholder="Select">
        <el-option
          v-for="item in options1"
          :key="item.dictCode"
          :label="item.dictLabel"
          :value="item.dictValue"
        />
      </el-select>
    </span>

    <br />
    <span class="apply">应用环节</span>
    <el-select v-model="topic.process" placeholder="Select">
      <el-option
        v-for="item1 in options2"
        :key="item1.dictCode"
        :label="item1.dictLabel"
        :value="item1.dictValue"
      />
    </el-select>

    <span class="chapter">所属章节&nbsp;&nbsp;</span>
    <el-tree-select
      v-model="chapterName"
      :props="treeProps"
      :data="treeData"
      check-strictly
      :render-after-expand="false"
      node-key="chapterId"
      @node-click="handleNodeClick"
    />
    <br />
    <span class="btn1">
      <a-switch v-model:checked="checked1" /><span class="btnContext1"
        >是否立即发布</span
      >
    </span>

    <div class="hidden" v-if="checked1 == true">
      <a-space direction="vertical" :size="12">
        <span>发布时间</span>
        <a-date-picker
          class="publishDate1"
          v-model:value="topic.publishDate"
          show-time
          placeholder="发布时间"
          @change="onChange"
          @ok="onOk"
        />
        <span class="deadline">
          截止时间&nbsp;&nbsp;
          <a-switch v-model:checked="checked2" />
          &nbsp;&nbsp;
          <a-date-picker
            v-model:value="topic.deadline"
            show-time
            placeholder="截止时间"
            @change="onChange"
            @ok="onOk"
            v-if="checked2 == true"
          />
        </span>
      </a-space>
      <br />
      <div class="bottom">
        <span> 总分&nbsp;&nbsp;</span>
        <a-input-number
          :style="(width = '50%')"
          id="inputNumber"
          name="total"
          v-model:value="topic.score"
          :min="0"
          :max="100"
        />
        <span>&nbsp;&nbsp;&nbsp;满分条件 至少回复&nbsp;&nbsp;&nbsp;</span>
        <a-input-number
          id="inputNumber"
          name="reply"
          v-model:value="topic.leastReplyNumber"
          :min="0"
        />
        次
      </div>
    </div>
  </a-modal>
</template>

<script>
import { Modal, Button } from "ant-design-vue";

import { onMounted, ref, watch } from "vue";
import {
  addTopic,
  getAllChapterById,
  getUserInfo,
  getDictionaryByType,
  updateTopic,
} from "../../api/topic.js";
import { userCourseId } from "../../store/index.js";
import mitter from "../../main.js";
export default {
  components: {
    "a-modal": Modal,
    "a-button": Button,
  },
  setup() {
    const options1 = ref([]);
    const options2 = ref([]);
    const chapterName = ref();
    const apply = ref();
    const toCourseId = userCourseId();
    const checked1 = ref(false);
    const checked2 = ref(false);
    const showMode = ref(false);
    const courseId = ref();
    const name = ref();
    const treeData = ref([]);
    const userId = ref();
    const type1 = ref("class_share_protoco");
    const type2 = ref("class_process");
    const update = ref(false);
    const topic = ref({
      topicId: null,
      title: "",
      content: "",
      typeLabel: "话题",
      shareProtocol: null,
      process: null,
      chapterId: null,
      publishDate: null,
      deadline: null,
      totalScore: 0,
      leastReplyNumber: 0,
    });
    //接受弹窗开关的传值
    mitter.on("showMode", (data) => {
      showMode.value = data;
      console.log("开关44444444：" + data);
    });
    mitter.on("topic", (data) => {
      topic.value = data;
      console.log("话题内容---：" + data + "," + data.value);
    });
    mitter.on("update", (data) => {
      update.value = data;
      console.log("传过来更新的值---：" + data + "," + update.value);
    });

    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getAllChapters();
      getUserInfo1();
      getDict1();
      getDict2();
    });

    const getDict1 = () => {
      getDictionaryByType(type1.value).then((res) => {
        options1.value = res;
      });
    };
    const getDict2 = () => {
      getDictionaryByType(type2.value).then((res) => {
        options2.value = res;
      });
    };
    const getAllChapters = () => {
      getAllChapterById(courseId.value).then((res) => {
        treeData.value = res;
      });
    };
    const getUserInfo1 = () => {
      getUserInfo().then((res) => {
        userId.value = res.userId;
      });
    };

    const handleClose = () => {
      showMode.value = false;
    };

    const handleNodeClick = (data) => {
      topic.value.chapterId = data.chapterId;
    };

    const handleOk = () => {
      console.log("更新的值：" + update.value);
      if (topic.value.title == "" || topic.value.title == null) {
        alert("标题不能为空");
        return;
      }
      if (chapterName.value == null || chapterName.value == "") {
        alert("请选择章节");
        return;
      }
      if (update.value == false) {
        console.log("话题：" + topic);
        addTopic(topic.value, userId.value);
        console.log("共享协议：" + topic.value.shareProtocol);
        showMode.value = false;
        topic.value.title = "";
        topic.value.content = "";
        topic.value.label = "话题";
        topic.value.shareProtocol = null;
        topic.value.process = null;
        topic.value.publishDate = null;
        topic.value.deadline = null;
        topic.value.total = 0;
        topic.value.reply = 0;
        topic.value.chapterId = null;
        chapterName.value = "";
        alert("添加成功");
      } else {
        console.log("修改之后的话题：" + topic.value.title);
        updateTopic(topic.value);
        showMode.value = false;
        topic.value.title = "";
        topic.value.content = "";
        topic.value.label = "话题";
        topic.value.shareProtocol = null;
        topic.value.process = null;
        topic.value.publishDate = null;
        topic.value.deadline = null;
        topic.value.total = 0;
        topic.value.reply = 0;
        topic.value.chapterId = null;
        chapterName.value = "";
        alert("修改成功");
      }
    };
    const treeProps = {
      label: "name",
    };
    return {
      chapterName,
      topic,
      handleClose,
      showMode,
      handleOk,
      checked1,
      checked2,
      topic,
      name,
      treeData,
      apply,
      options1,
      options2,
      treeProps,
      handleNodeClick,
    };
  },
};
</script>
<style scoped>
.btn3 {
  margin-left: 105vh;
  bottom: 4vh;
}
.context {
  margin-top: 2vh;
}
.label {
  margin-right: 1vh;
  margin-bottom: 1vh;
}
.typeContent {
  margin-top: 2vh;
  margin-right: 5vh;
  margin-bottom: 2vh;
}
.share {
  position: relative;
  left: 2vh;
  margin-right: 1vh;
  margin-top: 1vh;
  margin-bottom: 2vh;
}
.chapter {
  margin-left: 12vh;
}
.apply {
  margin-right: 3vh;
  margin-bottom: 15vh;
}
.btn1 {
  position: relative;
  bottom: -2vh;
  left: -1vh;
}
.hidden {
  position: relative;
  bottom: -4vh;
}
.publishDate1 {
  position: relative;
  left: 9vh;
  bottom: 5vh;
}
.deadline {
  position: relative;
  right: -45vh;
  bottom: 11vh;
}
.bottom {
  position: relative;
  bottom: 6vh;
}
</style>
