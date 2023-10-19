<template>
  <div class="issue"><send-outlined @click="handleAdd" />发布</div>
  <a-modal
    style="width: 100vh; height: 150vh overflow: auto;"
    v-model:open="showMode"
    title="添加话题"
    @cancel="handleClose"
    @ok="handleOk"
    ok-text="提交"
    cancel-text="取消"
  >
    <span> 话题标题 </span
    ><a-input
      v-model:value="title"
      style="width: 90%"
      placeholder="请输入话题标题"
    />

    <a-textarea
      class="context"
      v-model:value="content"
      placeholder="话题内容"
      :rows="6"
    />

    <span class="label">活动类型标签</span>
    <a-input
      class="typeContent"
      v-model:value="label"
      placeholder="话题"
      style="width: 30%"
    />
    <span class="share">
      <span> 知识共享协议&nbsp;&nbsp;</span>
      <el-select v-model="shareProtocol" class="m-2" placeholder="Select">
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
    <el-select v-model="process" placeholder="Select">
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
          v-model:value="publishDate"
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
            v-model:value="deadline"
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
          v-model:value="total"
          :min="0"
          :max="100"
        />
        <span>&nbsp;&nbsp;&nbsp;满分条件 至少回复&nbsp;&nbsp;&nbsp;</span>
        <a-input-number
          id="inputNumber"
          name="reply"
          v-model:value="reply"
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
} from "../../api/topic.js";
import { userCourseId } from "../../store/index.js";
export default {
  components: {
    "a-modal": Modal,
    "a-button": Button,
  },
  setup() {
    const options1 = ref([]);
    const options2 = ref([]);
    const title = ref();
    const content = ref();
    const label = ref("话题");
    const shareProtocol = ref();
    const process = ref();
    const publishDate = ref();
    const deadline = ref();
    const total = ref(0);
    const reply = ref(0);
    const chapterId = ref();
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
    const topic = ref({
      title: title,
      content: content,
      typeLabel: label,
      shareProtocol: shareProtocol,
      process: process,
      chapterId: chapterId,
      publishDate: publishDate,
      deadline: deadline,
      totalScore: total,
      leastReplyNumber: reply,
    });
    watch(name, () => {
      console.log(name.value);
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
    const handleAdd = () => {
      showMode.value = true;
    };
    const handleClose = () => {
      showMode.value = false;
    };

    const handleNodeClick = (data) => {
      chapterId.value = data.chapterId;
    };

    const handleOk = () => {
      if (title.value == "" || title.value == null) {
        alert("标题不能为空");
        return;
      }
      if (chapterName.value == null || chapterName.va == "") {
        alert("请选择章节");
        return;
      } else {
        addTopic(topic.value, userId.value);
        showMode.value = false;
        title.value = "";
        content.value = "";
        label.value = "话题";
        shareProtocol.value = "";
        process.value = "";
        publishDate.value = "";
        deadline.value = "";
        total.value = 0;
        reply.value = 0;
        chapterId.value = "";
        alert("添加成功");
      }
    };
    const treeProps = {
      label: "name",
    };
    return {
      title,
      content,
      label,
      shareProtocol,
      process,
      publishDate,
      deadline,
      total,
      reply,
      chapterName,
      topic,
      handleClose,
      handleAdd,
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
