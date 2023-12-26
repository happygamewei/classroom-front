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
    <a-form ref="formRef" style="width: 170vh; margin: auto; margin-top: 4vh">
      <a-form-item
        label="话题标题"
        :rules="[{ required: true, message: '请输入话题标题!' }]"
      >
        <a-input
          v-model:value="topic.title"
          style="
            display: inline-block;
            margin-right: 7vh;
            width: 80vh;
            height: 5vh;
          "
          placeholder="请输入内容，最多50字"
        />
      </a-form-item>
      <a-form-item style="width: 92vh">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 20vh; overflow-y: hidden"
            v-model="topic.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
          />
        </div>
      </a-form-item>
    </a-form>
    <!-- <a-input
      v-model:value="topic.title"
      label="话题标题"
      style="width: 90%"
      placeholder="请输入话题标题"
      :rules="[{ required: true, message: '请输入测试标题!' }]"
    /> -->

    <span class="label">活动类型标签</span>
    <a-input
      class="typeContent"
      v-model:value="topic.typeLabel"
      placeholder="话题"
      style="width: 30%"
    />
    <span class="share">
      <span> 知识共享协议&nbsp;&nbsp;</span>
      <el-select
        style="width: 30vh"
        v-model="topic.shareProtocol"
        class="m-2"
        placeholder="Select"
      >
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
    <el-select v-model="topic.process" placeholder="Select" style="width: 30vh">
      <el-option
        v-for="item1 in options2"
        :key="item1.dictCode"
        :label="item1.dictLabel"
        :value="item1.dictValue"
      />
    </el-select>

    <span class="chapter">所属章节&nbsp;&nbsp;</span>
    <el-tree-select
      style="width: 30vh"
      v-model="topic.chapterName"
      :props="treeProps"
      :data="treeData"
      check-strictly
      :render-after-expand="false"
      node-key="chapterId"
      @node-click="handleNodeClick"
    />
    <br />
    <span class="btn1">
      <a-switch v-if="topic.publishDate == null" v-model:checked="checked1" />
      <a-switch
        v-else-if="topic.publishDate != null"
        v-model:checked="checked3"
      />
      <span class="btnContext1">是否立即发布</span>
    </span>

    <div class="hidden" v-if="checked1 == true || topic.publishDate != null">
      <a-space direction="vertical" :size="12">
        <span class="publishDate2">发布时间</span>
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
          v-model:value="topic.totalScore"
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
import { onMounted, ref, shallowRef, onBeforeUnmount } from "vue";

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {
  addTopic,
  getAllChapterById,
  getUserInfo,
  getDictionaryByType,
  updateTopic,
} from "../../api/topic.js";
import { userCourseId } from "../../store/index.js";
import mitter from "../../main.js";
import dayjs from "dayjs";
import moment from "moment";
export default {
  components: {
    "a-modal": Modal,
    "a-button": Button,
    Toolbar,
    Editor,
  },
  setup() {
    const options1 = ref([]);
    const options2 = ref([]);
    const toCourseId = userCourseId();
    const checked1 = ref(false);
    const checked2 = ref(false);
    const checked3 = ref(true);
    const showMode = ref(false);
    const courseId = ref();
    const treeData = ref([]);
    const userId = ref();
    const type1 = ref("class_share_protoco");
    const type2 = ref("class_process");
    const update = ref(false);
    const content = "";
    const mode = "default";
    const formRef = ref(null);
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
      chapterName: "",
    });

    //接受弹窗开关的传值
    mitter.on("showMode", (data) => {
      showMode.value = data;
    });
    mitter.on("topic", (data) => {
      topic.value = data;
      if (topic.value.publishDate != null) {
        topic.value.publishDate = dayjs(topic.value.publishDate);
      }
      if (topic.value.deadline != null) {
        topic.value.deadline = dayjs(topic.value.deadline);
      }
    });
    mitter.on("update", (data) => {
      update.value = data;
    });

    onMounted(() => {
      courseId.value = toCourseId.getCourseId();
      getAllChapters();
      getUserInfo1();
      getDict1();
      getDict2();
      setTimeout(() => {
        valueHtml.value = "<p> </p>";
      }, 1500);
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
      topic.value.chapterName = "";
      checked1.value = false;
      checked2.value = false;
    };

    const handleNodeClick = (data) => {
      topic.value.chapterId = data.chapterId;
    };

    const handleOk = () => {
      if (topic.value.title == "" || topic.value.title == null) {
        alert("标题不能为空");
        return;
      }
      if (topic.value.chapterName == null || topic.value.chapterName == "") {
        alert("请选择章节");
        return;
      }
      if (update.value == false) {
        addTopic(courseId.value, topic.value, userId.value);
        alert("添加成功");
      } else {
        topic.value.deadline = dayjs(topic.value.deadline);
        updateTopic(topic.value);
        alert("修改成功");
        update.value = false;
      }
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
      topic.value.chapterName = "";
      checked1.value = false;
      checked2.value = false;
      //添加或修改成功后，需要刷新页面
      mitter.emit("refresh", update.value);
    };
    const treeProps = {
      label: "name",
    };
    const editorChange = (html) => {
      this.content = html;
    };
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };

    // 组件销毁时，也及时销毁编辑器
    const onBeforeUnmount = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    };

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    return {
      topic,
      handleClose,
      showMode,
      handleOk,
      checked1,
      checked2,
      treeData,
      options1,
      options2,
      treeProps,
      handleNodeClick,
      editorChange,
      content,
      handleCreated,
      editorConfig,
      toolbarConfig,
      valueHtml,
      onBeforeUnmount,
      editorRef,
      mode,
      formRef,
      checked3,
      moment,
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
.label::before {
  content: "*";
  color: red;
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;
}
.chapter::before {
  content: "*";
  color: red;
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;
}
.publishDate2::before {
  content: "*";
  color: red;
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;
}
</style>
